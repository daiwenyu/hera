import React, { useState } from 'react';
import { Card, Table, Form, Input, Space, Button, Modal, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

function CustomerManagement() {
  const [visible, setVisible] = useState(false);

  const columns = [{
    title: '公司编号',
    dataIndex: '',
  }, {
    title: '企业名称',
    dataIndex: '',
  }, {
    title: '法人代表',
    dataIndex: '',
  }, {
    title: '注册地址',
    dataIndex: '',
  }, {
    title: '成立时间',
    dataIndex: '',
  }, {
    title: '操作',
    dataIndex: '',
    render: value => (
      <Button type="link">详情</Button>
    )
  }];


  return (
    <Card
      title="客户管理123123"
    // extra={
    //   <Space>
    //     <Button
    //       type="primary"
    //       onClick={() => setVisible(true)}
    //     >
    //       新增
    //     </Button>
    //     <Button
    //       // type="primary"
    //       onClick={() => setVisible(true)}
    //     >
    //       导入
    //     </Button>
    //   </ Space>
    // }
    >
      <Form>
        <FormItem
          label="公司名称"
        >
          <Input />
        </FormItem>
        <FormItem
          label="公司编号"
        >
          <Input />
        </FormItem>
        <FormItem>
          <Space>
            <Button>查询</Button>
            <Button>重置</Button>
          </Space>
        </FormItem>
      </Form>
      <Table
        columns={columns}
      />
      <Modal
        title="新增用户"
        visible={visible}
        okText="保存"
        onCancel={() => setVisible(false)}
      >
        <Form>
          <FormItem label="姓名">
            <Input />
          </FormItem>
          <FormItem label="手机号">
            <Input />
          </FormItem>
          <FormItem label="账号">
            <Input />
          </FormItem>
          <FormItem label="密码">
            <Input />
          </FormItem>
          <FormItem label="所属部门">
            <Select>
              <Option value={1}>市场部</Option>
              <Option value={2}>管理部</Option>
            </Select>
          </FormItem>
          <FormItem label="角色">
            <Select>
              <Option value={1}>管理员</Option>
              <Option value={2}>普通用户</Option>
              <Option value={3}>超级管理员</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
    </Card>
  )
}

export default CustomerManagement;
