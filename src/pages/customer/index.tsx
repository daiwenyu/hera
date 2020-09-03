import React, { useState, useEffect } from 'react';
import { Card, Table, Form, Input, Space, Button, Modal, Select, DatePicker, Tag, Row, Col } from 'antd';
import { Link, connect } from 'umi';

const FormItem = Form.Item;
// const { Option } = Select;
const { TextArea } = Input;

function CustomerManagement({
  dispatch,
  customer
}) {
  const [visible, setVisible] = useState(false);
  const [customerList, setCustomerList] = useState([]);

  const columns = [{
    title: '公司编号',
    dataIndex: 'id',
  }, {
    title: '企业名称',
    dataIndex: 'name',
  }, {
    title: '法人代表',
    dataIndex: 'user',
  }, {
    title: '注册地址',
    dataIndex: 'adress',
  }, {
    title: '状态',
    dataIndex: 'status',
    render: value => (
      <Tag>正常</Tag>
    )
  }, {
    title: '成立时间',
    dataIndex: 'date',
  }, {
    title: '操作',
    dataIndex: '',
    render: value => (
      <Link to="/customerManagement/detail">详情</Link>
    )
  }];
  const getCustomerData = async () => {
    const list = await dispatch({
      type: 'customer/getCompanyList',
      payload: {}
    });
    setCustomerList(list);
  }

  useEffect(() => {
    getCustomerData();
  }, []);

  return (
    <Card
      title="用户管理"
      extra={
        <Space>
          <Button
            type="primary"
            onClick={() => setVisible(true)}
          >
            新增
          </Button>
          <Button
            // type="primary"
            onClick={() => setVisible(true)}
          >
            导入
          </Button>
        </ Space>
      }
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={6}>
            <FormItem
              label="公司名称"
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="公司编号"
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
        dataSource={customerList}
      />
      <Modal
        title="新增企业"
        visible={visible}
        okText="保存"
        onCancel={() => setVisible(false)}
      >
        <Form>
          <FormItem label="公司名称">
            <Input />
          </FormItem>
          <FormItem label="公司地址">
            <Input />
          </FormItem>
          <FormItem label="法人代表">
            <Input />
          </FormItem>
          <FormItem label="公司电话">
            <Input />
          </FormItem>
          <FormItem label="公司介绍">
            <TextArea />
          </FormItem>
          <FormItem label="公司规模">
            <Input />
          </FormItem>
          <FormItem label="成立时间">
            <DatePicker />
          </FormItem>
        </Form>
      </Modal>
    </Card>
  )
}

export default connect(({
  customer
}) => ({
  customer
}))(CustomerManagement);
