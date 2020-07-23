import {PageContainer} from "@ant-design/pro-layout";
import React, {useEffect, useState} from "react";
import {Card, Row, Col, Menu, Button, Modal, Form, Input, TreeSelect, Divider, Tree, Select} from "antd";
import {connect} from "umi";
import {SystemModelState} from "@/models/connect";
import {Dispatch} from "@@/plugin-dva/connect";
import {createFromIconfontCN, ExclamationCircleOutlined} from '@ant-design/icons';

const {SubMenu} = Menu;
const {confirm} = Modal;
const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1958855_2w455u5pd5j.js',
});
const IconType = ["icon-earth", "icon-message", "icon-dashboard", "icon-piechart", "icon-setting", "icon-eye", "icon-location", "icon-edit-square", "icon-save", "icon-appstore", "icon-layout", "icon-play-square", "icon-control", "icon-codelibrary", "icon-detail", "icon-project", "icon-wallet", "icon-calculator", "icon-interation", "icon-user", "icon-team", "icon-areachart", "icon-linechart", "icon-barchart", "icon-pointmap", "icon-alert", "icon-bulb", "icon-experiment", "icon-bell", "icon-home", "icon-shop", "icon-fund", "icon-desktop", "icon-Partition", "icon-index", "icon-Console-SQL"];

//Array.from(document.querySelectorAll('.icon-code.icon-code-show')).map(v=>v.innerText)

export interface MenuAdminProps {
  dispatch: Dispatch;
}

function makeMenu(data) {
  return data.map(v => {
    if (Array.isArray(v.children) && v.children.length) {
      return (
        <SubMenu
          title={v.menuName}
          key={v.menuId}
          icon={<Icon type={v.menuIcon}/>}
        >
          {makeMenu(v.children)}
        </SubMenu>
      )
    }
    return (
      <Menu.Item
        key={v.menuId}
        icon={<Icon type={v.menuIcon}/>}
      >
        {v.menuName}
      </Menu.Item>
    )

  });
}

function MenuAdmin(props: MenuAdminProps) {
  const {dispatch} = props;
  const [form] = Form.useForm();

  // 菜单数据库原始数据
  const [menuData, setMenuData] = useState([]);

  // 菜单数据
  const [menu, setMenu] = useState([]);

  // 排序结构
  const [treeMenu, setTreeMenu] = useState([]);

  // 排序modal显示控制
  const [treeVisible, setTreeVisible] = useState(false);

  // 菜单预览
  const [preVisible, setPreVisible] = useState(false);

  // 当前选中菜单
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
      for (let i = 0; i < data.length; i++) {
        data[i] = {
          ...data[i],
          title: data[i].menuName,
          value: data[i].menuId,
          key: data[i].menuId,
          icon: (<Icon type={data[i].menuIcon}/>)
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
    // console.log(treeData);
    // treeData排序
    const sortData = (arr) => {
      arr.sort((a, b) => {
        if (a.sort < b.sort) {
          return -1;
        }
        if (a.sort > b.sort) {
          return 1;
        }
        return 0;
      });
      arr.forEach(v => {
        if (Array.isArray(v.children) && v.children.length) {
          sortData(v.children);
        }
      });
    }
    sortData(treeData)
    setMenu(treeData);
  }

  const addMenu = () => {
    const getSortValue = (parentId) => {
      if (parentId === undefined) {
        return menu.length.toString()
      }
      const parentSort = menuData.find(v => v.menuId === parentId).sort;
      const itemData = menuData.filter(v => v.sort.includes(parentSort + '-', 0));
      // console.log(itemData);
      return `${parentSort}-${itemData.length}`;
    }

    form
      .validateFields()
      .then(async values => {
        if (activeData) {
          // 修改
          await dispatch({
            type: 'system/updateMenu',
            payload: {
              id: activeData.menuId,
              sort: getSortValue(values.parentId),
              ...values
            }
          });
        } else {
          // 新增
          await dispatch({
            type: 'system/addMenu',
            payload: {
              sort: getSortValue(values.parentId),
              ...values
            }
          });
        }
        form.resetFields();
        setActiveData(undefined);
        getMenusData();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

  const onDrop = info => {
    // console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...treeMenu];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setTreeMenu(data);
  };

  const onSelectTree = (selectedKeys, e) => {
    if (selectedKeys.length === 1) {
      const currentData = menuData.find(v => selectedKeys[0] === v.menuId);
      setActiveData(currentData);
      form.setFieldsValue({
        parentId: currentData.parentId,
        menuName: currentData.menuName,
        menuIcon: currentData.menuIcon,
        menuPath: currentData.menuPath
      });
    } else {
      form.resetFields();
      setActiveData(undefined);
    }
  }

  const onDelete = () => {
    const currentId = activeData.menuId;
    let deleteData = [];

    const findDeleteData = (arr, flag) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].menuId === currentId || flag === true) {
          deleteData.push(arr[i].menuId);
        }
        if (Array.isArray(arr[i].children) && arr[i].children.length) {
          findDeleteData(arr[i].children, arr[i].menuId === currentId);
        }
      }
    }
    findDeleteData(menu);
    confirm({
      title: '确认删除该菜单？',
      icon: <ExclamationCircleOutlined/>,
      content: deleteData.length > 1 ? '该菜单下存在子菜单，删除该菜单，其子菜单会同时删除' : null,
      async onOk() {
        await dispatch({
          type: 'system/deleteMenus',
          payload: {
            ids: deleteData
          }
        });
        await getMenusData();
        form.resetFields();
        setActiveData(undefined);
      },
      onCancel() {

      },
    });
  }

  const onSaveSort = async () => {
    // console.log(treeMenu);
    const diffArr = [];
    let level = 0;
    const checkSort = (arr, inds, parentId) => {
      let indexArr = [].concat(inds)
      for (let i = 0; i < arr.length; i++) {
        indexArr[level] = i;
        // 数据对比
        const sort = indexArr.join('-');
        const oldData = menuData.find(v => v.menuId === arr[i].menuId);
        // console.log(parentId, oldData.parentId)
        if (sort !== oldData.sort || !parentId !== !oldData.parentId) {
          diffArr.push({
            menuId: arr[i].menuId,
            sort,
            parentId
          })
        }
        // console.log(level);
        if (Array.isArray(arr[i].children) && arr[i].children.length) {
          level++;
          checkSort(arr[i].children, indexArr, arr[i].menuId);
        }
      }
      if (level > 0) {
        level--;
      }
    }
    checkSort(treeMenu);
    // console.log(diffArr);

    await dispatch({
      type: 'system/updateMenuSort',
      payload: {
        diffArr: diffArr
      }
    })

    await getMenusData();

    setTreeVisible(false);
    setTreeMenu([]);
  }

  useEffect(() => {
    getMenusData();
  }, []);

  return (
    <PageContainer>
      <Card
        title="菜单设置"
        extra={
          <>
            <Button
              ghost
              type="primary"
              onClick={() => {
                setTreeMenu(JSON.parse(JSON.stringify(menu)));
                setTreeVisible(true);
              }}
            >
              排序
            </Button>
            <Divider type="vertical"/>
            <Button
              ghost
              type="primary"
              onClick={() => setPreVisible(true)}
            >
              预览
            </Button>
          </>
        }
      >
        <Row gutter={16}>
          <Col span={6}>
            {
              menu.length ? (
                <Tree
                  showIcon
                  //draggable
                  blockNode
                  defaultExpandAll
                  treeData={menu}
                  //onDrop={onDrop}
                  onSelect={onSelectTree}
                />
              ) : null
            }
          </Col>
          <Col span={10}>
            <Form
              form={form}
              layout="vertical"
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
                <Select allowClear>
                  {
                    IconType.map(v => (
                      <Select.Option key={v} value={v}>
                        <Icon type={v}/>
                      </Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>

              <Form.Item
                label="菜单路径"
                name="menuPath"
                rules={[{required: true, message: 'Please input menuPath!'}]}
              >
                <Input/>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  onClick={addMenu}
                >
                  {
                    activeData ? '更新' : '添加'
                  }
                </Button>
                <Divider type="vertical"/>
                {
                  activeData ? (
                    <Button
                      type="primary"
                      danger
                      onClick={onDelete}
                    >
                      删除
                    </Button>
                  ) : (
                    <Button
                      onClick={() => form.resetFields()}
                    >
                      重置
                    </Button>
                  )
                }
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>

      <Modal
        title="预览"
        visible={preVisible}
        width={1000}
        onCancel={() => setPreVisible(false)}
        footer={null}
      >
        <Row>
          <Col span={5}>
            <Menu
              mode="inline"
              theme="dark"
              style={{minHeight: 500}}
            >
              {makeMenu(menu)}
            </Menu>
          </Col>
          <Col span={19}>
            <Menu mode="horizontal">
              {makeMenu(menu)}
            </Menu>
          </Col>
        </Row>
      </Modal>

      <Modal
        title="菜单排序"
        destroyOnClose
        visible={treeVisible}
        onCancel={() => {
          setTreeVisible(false);
          setTreeMenu([]);
        }}
        onOk={onSaveSort}
      >
        <Tree
          draggable
          blockNode
          defaultExpandAll
          treeData={treeMenu}
          onDrop={onDrop}
        />
      </Modal>

    </PageContainer>
  );
}

export default connect(({system}: SystemModelState) => ({system}))(MenuAdmin);
