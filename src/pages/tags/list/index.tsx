import React, { useState } from 'react';
import { Button, Modal, Input, Card, Col, Row, Table, Form, Tabs } from 'antd';
import ProTable from '@ant-design/pro-table';
import { history } from 'umi';

const { TabPane } = Tabs;
const { TextArea } = Input;
const FormItem = Form.Item;

function List() {
  const [activeTab, setActiveTab] = useState('1');
  const [visible, setVisible] = useState(false);
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
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
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
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
    },
  ];
  return (
    <>
      <ProTable
        options={false}
        rowKey="id"
        headerTitle={
          <Tabs activeKey={activeTab} onChange={key => setActiveTab(key)}>
            <TabPane tab="自动标签" key="1" />
            <TabPane tab="手工标签" key="2" />
          </Tabs>
        }
        toolBarRender={() => [
          <Button type="primary" onClick={() => { setVisible(true) }}>新建</Button>
        ]}
        columns={activeTab === '1' ? autoColumns : manualColumns}
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
    </>
  )
}

export default List;
