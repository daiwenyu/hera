import {PageContainer} from "@ant-design/pro-layout";
import React, {useEffect, useState} from "react";
import {Card, Row, Col, Menu, Button, Modal, Form, Input, TreeSelect, Divider, List} from "antd";
import {connect} from "umi";
import {SystemModelState} from "@/models/connect";
import {Dispatch} from "@@/plugin-dva/connect";

const {SubMenu} = Menu;

export interface SystemAdminProps {
  dispatch: Dispatch;
}

function makeMenu(data) {
  return data.map(v => {
    if (Array.isArray(v.children) && v.children.length) {
      return (
        <SubMenu title={v.menuName} key={v.menuId}>
          {makeMenu(v.children)}
        </SubMenu>
      )
    }
    return (
      <Menu.Item key={v.menuId}>
        {v.menuName}
      </Menu.Item>
    )

  });
}

function SystemAdmin(props: SystemAdminProps) {
  const {dispatch} = props;
  const [form] = Form.useForm();
  const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
  };

  const [menuData, setMenuData] = useState([]);
  const [menu, setMenu] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(undefined);
  const [activeData, setActiveData] = useState(undefined);

  const getMenusData = async () => {
    const data = await dispatch({
      type: 'system/getMenus'
    }) || [];
    setMenuData([...data]);

    const treeData = [];
    const recursiveData = (arr, item) => {
      for (let i = 0; i < arr.length; i++) {
        const v = arr[i];
        if (v.menuId === item.parentId) {
          if (!Array.isArray(v.children)) {
            v.children = [];
          }
          v.children.push(item);
          return true;
        }
        if (Array.isArray(v.children)) {
          const result = recursiveData(v.children, item);
          if (result === true) {
            return true;
          }
        }
      }
    }

    let count = 0;
    while (data.length && count < 20) {
      // console.log(count, [].concat(data), [].concat(treeData))
      for (let i = 0; i < data.length; i++) {
        data[i] = {
          ...data[i],
          title: data[i].menuName,
          value: data[i].menuId,
        };
        if (data[i].parentId) {
          const result = recursiveData(treeData, data[i]);
          if (result) {

            data.splice(i, 1);

            break;
          }
        } else {
          treeData.push(data[i]);

          data.splice(i, 1);
          break;
        }
      }

      count++;
    }

    // console.log(data, treeData);
    setMenu(treeData);
  }

  const addMenu = () => {
    form
      .validateFields()
      .then(async values => {
        if (activeData) {
          // 修改
          console.log(values);
          await dispatch({
            type: 'system/updateMenu',
            payload: {
              id: activeData.menuId,
              ...values
            }
          });
        } else {
          // 新增
          await dispatch({
            type: 'system/addMenu',
            payload: {
              ...values
            }
          });
        }

        setVisible(false);
        form.resetFields();
        getMenusData();

      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

  const handlerSelectMenu = (sKey) => {
    setSelectedKeys(sKey);
    setActiveData(menuData.find(v => v.menuId === parseInt(sKey)));
  }

  useEffect(() => {
    getMenusData();
  }, []);

  // useEffect(() => {
  //   console.log(activeData);
  // }, [activeData]);

  return (
    <PageContainer>
      <Card
        title="菜单设置"
        extra={
          <>
            <Button
              disabled={selectedKeys === undefined}
              type="primary"
              onClick={() => {
                setVisible(true);
                if (activeData) {
                  form.setFieldsValue({
                    parentId: activeData.parentId,
                    menuName: activeData.menuName,
                    menuIcon: activeData.menuIcon,
                    menuPath: activeData.menuPath
                  });
                }
              }}
            >
              编辑
            </Button>
            <Divider type="vertical"/>
            <Button
              type="primary"
              onClick={() => {
                setActiveData(undefined);
                setSelectedKeys(undefined);
                setVisible(true);
              }}
            >
              添加
            </Button>
          </>
        }
      >
        <Row>
          <Col span={4}>
            <Menu
              mode="inline"
              theme="dark"
              selectedKeys={selectedKeys}
              onSelect={({selectedKeys: sKey}) => handlerSelectMenu(sKey)}
            >
              {makeMenu(menu)}
            </Menu>
          </Col>
          <Col span={20}>
            <Menu
              mode="horizontal"
              selectedKeys={selectedKeys}
              onSelect={({selectedKeys: sKey}) => handlerSelectMenu(sKey)}
            >
              {makeMenu(menu)}
            </Menu>
            {
              activeData ? (
                <List
                  style={{
                    margin: 16
                  }}
                >
                  <List.Item.Meta
                    title="菜单Id"
                    description={activeData.menuId}
                  />
                  <List.Item.Meta
                    title="菜单名称"
                    description={activeData.menuName}
                  />
                  <List.Item.Meta
                    title="菜单路径"
                    description={activeData.menuPath}
                  />
                  <List.Item.Meta
                    title="父级Id"
                    description={activeData.parentId || '无'}
                  />
                  <List.Item.Meta
                    title="菜单图标"
                    description={activeData.menuIcon}
                  />
                </List>
              ) : null
            }
          </Col>
        </Row>

      </Card>

      <Modal
        title={selectedKeys ? "编辑菜单" : "添加菜单"}
        visible={visible}
        onOk={addMenu}
        destroyOnClose
        onCancel={() => {
          form.resetFields();
          setVisible(false);
        }}
      >
        <Form
          form={form}
          {...layout}
        >

          <Form.Item
            label="上级菜单"
            name="parentId"
          >
            <TreeSelect
              allowClear
              showSearch
              treeData={menu}
            />
          </Form.Item>

          <Form.Item
            label="菜单名称"
            name="menuName"
            rules={[{required: true, message: 'Please input menuName!'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="菜单图标"
            name="menuIcon"
            rules={[{required: true, message: 'Please input menuIcon!'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="菜单路径"
            name="menuPath"
            rules={[{required: true, message: 'Please input menuPath!'}]}
          >
            <Input/>
          </Form.Item>

        </Form>
      </Modal>

    </PageContainer>
  );
}

export default connect(({system}: SystemModelState) => ({system}))(SystemAdmin);
