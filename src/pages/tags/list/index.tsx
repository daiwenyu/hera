import React, { useState } from 'react';
import {
  Button, Modal, Menu, Tabs, Dropdown, message
} from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { history } from 'umi';

const { TabPane } = Tabs;

function List() {
  const [activeTab, setActiveTab] = useState('1');
  const [userListVisible, setUserListVisible] = useState(false);
  const [activeData, setActiveData] = useState(undefined);

  const renderTagInfo = (trigger) => {
    return (
      <ModalForm
        key="info"
        title={activeData ? '编辑标签' : "创建标签"}
        width={480}
        trigger={trigger}
        onFinish={async (values) => {
          console.log(values);
          // message.success('提交成功！');
          // history.push('/tags/list/create')
          // return true;
        }}
        onVisibleChange={(visible) => {
          if (!visible) {
            setActiveData(undefined);
          }
        }}
      >
        <ProFormText
          label="标签名称"
          name="tagName"
          rules={[{
            required: true,
          }, {
            max: 10
          }]}
        />
        <ProFormTextArea
          label="标签描述"
          name="tagDesc"
          rules={[{
            max: 50
          }]}
        />
      </ModalForm>
    );
  }
  const spliceColumns = (customizeColumns = []) => [
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
    ...customizeColumns,
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
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 200,
      render: (text, row, _, action) => {
        const menu = (
          <Menu
            onClick={({ key }) => {
              console.log(key)
              const handler = {
                2: () => { setActiveData(row) },
                3: () => { history.push('/tags/list/configuration') }
              }
              handler[key]();
            }}
          >
            <Menu.Item key="1">
              <Button size="small" type="link">
                复制
              </Button>
            </Menu.Item>
            <Menu.Item key="2">
              {renderTagInfo(
                <Button size="small" type="link">
                  编辑
                  </Button>
              )}
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
          <a key="status">停用/启用</a>,
          <a key="list" onClick={() => { setUserListVisible(true) }}>用户列表</a>,
          <Dropdown key="other" overlay={menu}>
            <Button size="small" type="link">
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]
      }
    }
  ];

  const autoColumns = spliceColumns();
  const manualColumns = spliceColumns([{
    title: '用户数',
    dataIndex: 'money12',
    search: false
  }]);

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
          renderTagInfo(
            <Button type="primary">
              <PlusOutlined />
              新建
            </Button>
          )
        ]}
        columns={activeTab === '1' ? autoColumns : manualColumns}
        request={() => {
          return Promise.resolve({
            total: 200,
            data: [{
              id: '001',
              key: '1',
            }],
            success: true,
          });
        }}
      />

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
                card: '001',
                key: '1',
                id: '1'
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
