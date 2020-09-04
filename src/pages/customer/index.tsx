import React, { useState, useEffect } from 'react';
import { Card, Table, Form, Input, Space, Button, Modal, Select, DatePicker, Tag, Row, Col } from 'antd';
import { Link, connect } from 'umi';
import ProTable from '@ant-design/pro-table';
import { getCompanyList } from '@/services/customer';

const FormItem = Form.Item;
// const { Option } = Select;
const { TextArea } = Input;

function CustomerManagement({
  dispatch,
  customer
}) {
  const [visible, setVisible] = useState(false);
  const [customerList, setCustomerList] = useState([]);

  const [searchForm] = Form.useForm();

  const columns = [{
    title: '编号',
    dataIndex: 'id',
    valueType: 'index',
    width: 72,
  }, {
    title: '企业名称',
    dataIndex: 'companyName',
  }, {
    title: '企业编号',
    dataIndex: 'companyNo',
    hideInTable: true
  }, {
    title: '法人代表',
    dataIndex: 'corporation',
    hideInSearch: true
  }, {
    title: '注册地址',
    dataIndex: 'companyAddress',
    hideInSearch: true
  }, {
    title: '状态',
    dataIndex: 'status',
    hideInSearch: true,
    render: value => (
      <Tag>{value === '1' ? '正常' : '未开启'}</Tag>
    )
  }, {
    title: '成立时间',
    dataIndex: 'establishedTime',
    hideInSearch: true
  }, {
    title: '操作',
    dataIndex: '',
    hideInSearch: true,
    render: (value, row) => (
      <Link to={`/customer/detail/${row.id}`}>详情</Link>
    )
  }];

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
          {/* <Button
            // type="primary"
            onClick={() => setVisible(true)}
          >
            导入
          </Button> */}
        </ Space>
      }
    >
      {/* <Table
        columns={columns}
        dataSource={customerList}
      /> */}

      <ProTable
        columns={columns}
        // actionRef={actionRef}
        request={async (params) => {
          const { current, pageSize, id, companyName } = params;
          const {
            result: { result, total }
          } = await getCompanyList({
            companyNo: id,
            pageNum: current,
            pageSize,
            companyName
          });
          return Promise.resolve({
            total,
            data: result,
            success: true,
          });
        }}
        rowKey="id"
        dateFormatter="string"
        size="small"
        bordered
        options={false}
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
