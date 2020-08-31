import React, { useState } from 'react';
import { Card, Table, Form, Input, Space, Button, Modal, Select, Row, Col } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

function UserManagement() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [{
    title: '用户编号',
    dataIndex: '',
  }, {
    title: '账号',
    dataIndex: '',
  }, {
    title: '密码',
    dataIndex: '',
  }, {
    title: '审核状态',
    dataIndex: '',
  }, {
    title: '手机号',
    dataIndex: '',
  }, {
    title: '操作',
    dataIndex: '',
    render: value => (
      <Button type="link">编辑</Button>
    )
  }];

  return (
    <Card
      title="用户管理"
      extra={
        <Button
          type="primary"
          onClick={() => setVisible(true)}
        >
          新增
        </Button>
      }
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={6}>
            <FormItem
              label="姓名"
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="手机号"
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="账号"
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label=" ">
              <Space>
                <Button>查询</Button>
                <Button>重置</Button>
              </Space>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Table
        columns={columns}
      />
      <Modal
        title="新增用户"
        visible={visible}
        okText="保存"
        onCancel={() => setVisible(false)}
        onOk={() => {
          form.validateFields()
            .then(value => {
              console.log(value);
            })
        }}
      >
        <Form
          form={form}
          labelCol={{
            span: 4
          }}
          wrapperCol={{
            span: 18
          }}
        >
          <FormItem
            label="姓名"
            name="userName"
            required
          >
            <Input />
          </FormItem>
          <FormItem
            label="手机号"
            name="mobile"
            required
          >
            <Input />
          </FormItem>
          <FormItem
            label="账号"
            name="account"
            required
          >
            <Input />
          </FormItem>
          <FormItem
            label="密码"
            name="password"
            required
          >
            <Input />
          </FormItem>
          <FormItem
            label="所属部门"
            name="depId"
            initialValue={1}
            required
          >
            <Select>
              <Option value={1}>市场部</Option>
              <Option value={2}>管理部</Option>
            </Select>
          </FormItem>
          {/* <FormItem label="角色">
            <Select>
              <Option value={1}>管理员</Option>
              <Option value={2}>普通用户</Option>
              <Option value={3}>超级管理员</Option>
            </Select>
          </FormItem> */}
        </Form>
      </Modal>
    </Card>
  );
}

export default UserManagement;
