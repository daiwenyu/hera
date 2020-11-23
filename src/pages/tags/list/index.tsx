import React, { useState } from 'react';
import { Button, Modal, Input, Card, Col, Row, Table, Space, Menu, Form, Tabs, Dropdown } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { history } from 'umi';

const { TabPane } = Tabs;
const { TextArea } = Input;
const FormItem = Form.Item;

function List() {
  const [activeTab, setActiveTab] = useState('1');
  const [visible, setVisible] = useState(false);
  const [userListVisible, setUserListVisible] = useState(false);

  const autoColumns = [
    {
      title: '标签ID',
      dataIndex: 'id',
      search: false
    },
    {
      title: '标签名称',
      dataIndex: 'money',
    },
    {
      title: '标签描述',
      dataIndex: 'money1',
      search: false
    },
    {
      title: '创建时间',
      dataIndex: 'money2',
      search: false
    },
    {
      title: '创建人',
      dataIndex: 'money3',
      search: false
    },
    {
      title: '更新时间',
      dataIndex: 'money4',
      search: false
    },
    {
      title: '更新人',
      dataIndex: 'money5',
      search: false
    },
    {
      title: '状态',
      dataIndex: 'money6',
      // width: 500,
    },

  ];
  const manualColumns = [
    {
      title: '标签ID',
      dataIndex: 'id',
      search: false
    },
    {
      title: '标签名称',
      dataIndex: 'money',
    },
    {
      title: '标签描述',
      dataIndex: 'money1',
      search: false
    },
    {
      title: '用户数',
      dataIndex: 'money1',
      search: false
    },
    {
      title: '创建时间',
      dataIndex: 'money2',
      search: false
    },
    {
      title: '创建人',
      dataIndex: 'money3',
      search: false
    },
    {
      title: '更新时间',
      dataIndex: 'money4',
      search: false
    },
    {
      title: '更新人',
      dataIndex: 'money5',
      search: false
    },
    {
      title: '状态',
      dataIndex: 'money6',
    },
  ];

  const actionOpt = [{
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    align: 'center',
    fixed: 'right',
    render: (text, row, _, action) => {
      const menu = (
        <Menu
          onClick={({ key }) => {
            console.log(key)

            if (key === "3") {
              history.push('/tags/list/configuration');
            }

          }}
        >
          <Menu.Item key="1">
            <Button size="small" type="link">
              复制
            </Button>
          </Menu.Item>
          <Menu.Item key="2">
            <Button size="small" type="link">
              编辑
            </Button>
          </Menu.Item>
          <Menu.Item key="3">
            <Button size="small" type="link">
              设置
            </Button>
          </Menu.Item>
          <Menu.Item key="4">
            <Button size="small" type="link">
              删除
            </Button>
          </Menu.Item>
        </Menu>
      );
      return [
        <a>停用/启用</a>,
        <a onClick={() => { setUserListVisible(true) }}>用户列表</a>,
        <Dropdown overlay={menu}>
          <Button size="small" type="link">
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]
    }
  }]

  return (
    <>
      <ProTable
        options={false}
        rowKey="id"
        scroll={{
          x: 'max-content'
        }}
        headerTitle={
          <Tabs activeKey={activeTab} onChange={key => setActiveTab(key)}>
            <TabPane tab="自动标签" key="1" />
            <TabPane tab="手工标签" key="2" />
          </Tabs>
        }
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            新建
          </Button>
        ]}
        columns={[...(activeTab === '1' ? autoColumns : manualColumns), ...actionOpt]}
        request={() => {
          return Promise.resolve({
            total: 200,
            data: [{
              id: '001'
            }],
            success: true,
          });
        }}
      />
      <Modal
        visible={visible}
        title="创建标签"
        onCancel={() => { setVisible(false) }}
        onOk={() => { history.push('/tags/list/create') }}
      >
        <Form>
          <FormItem label="标签名称">
            <Input />
          </FormItem>
          <FormItem label="标签描述">
            <TextArea />
          </FormItem>
        </Form>
      </Modal>

      <Modal
        visible={userListVisible}
        title="用户列表"
        width={1000}
        onCancel={() => setUserListVisible(false)}
      >
        <ProTable
          options={{
            search: true,
            fullScreen: false,
            reload: false,
            setting: false,
            density: false
          }}
          search={false}
          rowSelection={{}}
          rowKey="id"
          toolBarRender={() => [
            <Button type="primary">移除用户</Button>,
            <Button type="primary">导出用户</Button>,
          ]}
          columns={[{
            title: '会员卡号',
            dataIndex: 'id'
          }, {
            title: '会员手机号',
            dataIndex: 'phone'
          }, {
            title: '会员姓名',
            dataIndex: 'name'
          }, {
            title: '打标时间',
            dataIndex: 'time'
          }, {
            title: '操作人',
            dataIndex: 'user'
          }]}
          request={() => {
            return Promise.resolve({
              total: 200,
              data: [{
                card: '001'
              }],
              success: true,
            });
          }}
        />
      </Modal>
    </>
  )
}

export default List;
