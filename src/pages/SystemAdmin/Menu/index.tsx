import { PageContainer } from "@ant-design/pro-layout";
import React, { useEffect, useState } from "react";
import {
  Card, Row, Col, Menu, Button, Modal, Form,
  Input, TreeSelect, Divider, Tree, Select,
  Radio,
  Space
} from "antd";
import { connect } from "umi";
import { SystemModelState } from "@/models/connect";
import { Dispatch } from "@@/plugin-dva/connect";
import { createFromIconfontCN, ExclamationCircleOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { confirm } = Modal;
const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1958855_2w455u5pd5j.js',
});
const IconType = [
  "icon-earth", "icon-message", "icon-dashboard", "icon-piechart", "icon-setting",
  "icon-eye", "icon-location", "icon-edit-square", "icon-save", "icon-appstore",
  "icon-layout", "icon-play-square", "icon-control", "icon-codelibrary", "icon-detail",
  "icon-project", "icon-wallet", "icon-calculator", "icon-interation", "icon-user",
  "icon-team", "icon-areachart", "icon-linechart", "icon-barchart", "icon-pointmap",
  "icon-alert", "icon-bulb", "icon-experiment", "icon-bell", "icon-home",
  "icon-shop", "icon-fund", "icon-desktop", "icon-Partition", "icon-index",
  "icon-Console-SQL"
];
// Array.from(document.querySelectorAll('.icon-code.icon-code-show')).map(v=>v.innerText)


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
          icon={<Icon type={v.menuIcon} />}
        >
          {makeMenu(v.children)}
        </SubMenu>
      )
    }
    return (
      <Menu.Item
        key={v.menuId}
        icon={<Icon type={v.menuIcon} />}
      >
        {v.menuName}
      </Menu.Item>
    )

  });
}

function MenuAdmin(props: MenuAdminProps) {
  const { dispatch } = props;
  const [form] = Form.useForm();

  // 国际化
  const [lang, setLang] = useState(localStorage.getItem('YY-local') || 'zh-CN');

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

  function getLocalStr(data) {
    try {
      return JSON.parse(data)[lang];
    } catch (e) {
      console.log(data, lang)
      return '-';
    }
  }

  const getMenusData = async () => {
    const data = await dispatch({
      type: 'system/getMenus'
    }) || [];

    // 存储原始数据
    setMenuData([...data]);

    // 数据组装
    const treeArr = [];
    data.forEach(v => {
      const sortArr = v.sort.split('-');
      const pushData = (indexArr, dataArr) => {
        const index = indexArr.shift();
        if (indexArr.length === 0) {
          const rawData = {
            ...v,
            title: getLocalStr(v.menuName),
            value: v.menuId,
            key: v.menuId,
            menuName: getLocalStr(v.menuName),
            icon: (<Icon type={v.menuIcon} />),
            children: []
          }
          if (dataArr[index] && dataArr[index].children) {
            dataArr[index] = {
              ...rawData,
              ...dataArr[index],
            }
          } else {
            dataArr[index] = {
              ...rawData
            };
          }
          return;
        }
        if (dataArr[index] === undefined) {
          dataArr[index] = {
            children: []
          };
        }

        pushData(indexArr, dataArr[index].children);
      }
      pushData(sortArr, treeArr);
    });
    setMenu(treeArr);
  }

  const addMenu = () => {
    const getSortValue = (parentId) => {
      // FIXME 存在原始数据时返回数据不正确

      if (typeof parentId !== 'number') {
        // 一级菜单
        if (activeData) {
          // 修改
          return activeData.sort;
        }
        // 新增
        return menu.length.toString();

      }

      const parentSort = menuData.find(v => v.menuId === parentId).sort;
      const itemData = menuData.filter(v => v.sort.includes(`${parentSort}-`, 0));
      // console.log(itemData);
      return `${parentSort}-${itemData.length}`;
    }

    form
      .validateFields()
      .then(async values => {
        console.log(values);
        // return;
        if (activeData) {
          // 修改
          await dispatch({
            type: 'system/updateMenu',
            payload: {
              ...values,
              id: activeData.menuId,
              sort: getSortValue(values.parentId),
              menuName: JSON.stringify(values.menuName)
            }
          });
        } else {
          // 新增
          await dispatch({
            type: 'system/addMenu',
            payload: {
              ...values,
              sort: getSortValue(values.parentId),
              menuName: JSON.stringify(values.menuName)
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
    form.resetFields();
    if (selectedKeys.length === 1) {
      const currentData = menuData.find(v => selectedKeys[0] === v.menuId);
      const menuName = (() => {
        try {
          return JSON.parse(currentData.menuName);
        } catch (e) {
          return {};
        }
      })();
      console.log(menuName)
      setActiveData(currentData);

      form.setFieldsValue({
        parentId: currentData.parentId,
        menuName,
        menuIcon: currentData.menuIcon,
        menuPath: currentData.menuPath
      });
    } else {
      setActiveData(undefined);
    }
  }

  const onDelete = () => {
    const currentId = activeData.menuId;
    const deleteData = [];

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
      icon: <ExclamationCircleOutlined />,
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
      const indexArr = [].concat(inds)
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
        diffArr
      }
    })

    await getMenusData();

    setTreeVisible(false);
    setTreeMenu([]);
  }

  useEffect(() => {
    getMenusData();
  }, []);

  useEffect(() => {
    getMenusData();
  }, [lang]);

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
            <Divider type="vertical" />
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
            <Space direction="vertical">
              <Radio.Group
                buttonStyle="solid"
                value={lang}
                onChange={e => setLang(e.target.value)}
              >
                <Radio.Button value="zh-CN">中文简体</Radio.Button>
                <Radio.Button value="zh-TW">中文繁體</Radio.Button>
                <Radio.Button value="en-US">English</Radio.Button>
              </Radio.Group>

              {
                menu.length ? (
                  <Tree
                    showIcon
                    blockNode
                    defaultExpandAll
                    treeData={menu}
                    onSelect={onSelectTree}
                  />
                ) : null
              }
            </Space>
          </Col>
          <Col span={8}>
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

              <Form.Item label="菜单名称" required>
                <Form.Item
                  name={['menuName', 'zh-CN']}
                >
                  <Input
                    placeholder="请输入简体菜单名称"
                  />
                </Form.Item>
                <Form.Item
                  name={['menuName', 'zh-TW']}
                >
                  <Input
                    placeholder="請輸入繁體菜單名稱"
                  />
                </Form.Item>
                <Form.Item
                  name={['menuName', 'en-US']}
                >
                  <Input
                    placeholder="Please enter the English name of the menu"
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item
                label="菜单图标"
                name="menuIcon"
                rules={[{ required: true, message: 'Please input menuIcon!' }]}
              >
                <Select allowClear>
                  {
                    IconType.map(v => (
                      <Select.Option key={v} value={v}>
                        <Icon type={v} />
                      </Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>

              <Form.Item
                label="菜单路径"
                name="menuPath"
                rules={[{ required: true, message: 'Please input menuPath!' }]}
              >
                <Input />
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
                <Divider type="vertical" />
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
              style={{ minHeight: 500 }}
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

export default connect(({ system }: SystemModelState) => ({ system }))(MenuAdmin);
