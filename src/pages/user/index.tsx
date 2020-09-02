import React, { useState, useEffect } from 'react';
import {
  Card, Table, Form, Input, Space, Button, Modal,
  Select, Row, Col, message, Tag, Popover, Image, Popconfirm
} from 'antd';
import { connect } from 'umi';
import { receipt } from '@/utils/utils';

const FormItem = Form.Item;
const { Option } = Select;

function UserManagement(props) {
  const {
    dispatch,
    userMgmt,
    queryLoading
  } = props;
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [activeData, setActiveData] = useState({});

  const status = {
    0: {
      label: '无效',
      color: 'warning'
    },
    1: {
      label: '有效',
      color: 'success'
    },
    2: {
      label: '删除',
      color: 'error'
    }
  }

  const getUserList = async () => {
    const data = await dispatch({
      type: 'userMgmt/queryUserList',
      payload: {}
    });
    setDataSource(data);
  }

  const columns = [{
    title: '账号',
    dataIndex: 'account',
  },
  // {
  //   title: '微信号',
  //   dataIndex: 'wechatNum',
  //   render: (value, index, row) => (
  //     <Popover
  //       title="微信二维码"
  //       content={
  //         <Image
  //           width={200}
  //           height={200}
  //           src={row.wechatCode}
  //         />
  //       }
  //     >
  //       {value || '-'}
  //     </Popover >
  //   )
  // },
  {
    title: '密码',
    dataIndex: 'password',
  }, {
    title: '审核状态',
    dataIndex: 'status',
    align: 'center',
    render: value => (
      <Tag color={status[value].color}>
        {status[value].label}
      </Tag>
    )
  }, {
    title: '手机号',
    dataIndex: 'mobile',
  }, {
    title: '操作',
    dataIndex: 'id',
    align: 'center',
    width: 120,
    render: (value, row) => row.status !== 2 ? (
      <Space>
        <Button
          type="link"
          size="small"
          onClick={() => {
            setActiveData(row);
            setVisible(true);
          }}
        >
          编辑
        </Button>
        <Popconfirm
          title="确定删除？"
          onConfirm={async () => {
            const res = await dispatch({
              type: 'userMgmt/deleteUser',
              payload: {
                id: value
              }
            });
            receipt(res, { msg: '删除成功！' })
              .then(() => {
                getUserList();
              });
          }}
        >
          <Button
            type="link"
            size="small"
          >
            删除
          </Button>
        </Popconfirm>
      </Space>
    ) : null
  }];

  const saveUserInfo = () => {
    form.validateFields()
      .then(async value => {
        // console.log(value);
        if (activeData.id) {
          const res = await dispatch({
            type: 'userMgmt/editUser',
            payload: {
              ...activeData,
              ...value
            }
          });
          receipt(res, { msg: '添加成功！' })
            .then(() => {
              setVisible(false);
              getUserList();
            });
        } else {
          const res = await dispatch({
            type: 'userMgmt/addUser',
            payload: value
          });
          receipt(res, { msg: '添加成功！' })
            .then(() => {
              setVisible(false);
              getUserList();
            });
        }
      })
  }

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    if (visible === false) {
      setActiveData({});
    } else {
      form.resetFields();
    }
  }, [visible]);

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
      <Form form={searchForm} layout="vertical">
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
        loading={queryLoading}
        rowKey="id"
        bordered
        size="small"
        dataSource={dataSource}
        columns={columns}
      />
      <Modal
        title={activeData.id ? '编辑用户' : '新增用户'}
        visible={visible}
        okText="保存"
        onCancel={() => setVisible(false)}
        onOk={saveUserInfo}
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
            initialValue={activeData.userName}
            rules={[{
              required: true
            }]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="手机号"
            name="mobile"
            initialValue={activeData.mobile}
            rules={[{
              required: true
            }]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="账号"
            name="account"
            initialValue={activeData.account}
            rules={[{
              required: true
            }]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="密码"
            name="password"
            initialValue={activeData.password}
            rules={[{
              required: true
            }]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="所属部门"
            name="departmentId"
            initialValue={activeData.departmentId}
            rules={[{
              required: true
            }]}
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

export default connect(({
  userMgmt,
  loading
}) => ({
  userMgmt,
  queryLoading: loading.effects['userMgmt/queryUserList']
}))(UserManagement);
