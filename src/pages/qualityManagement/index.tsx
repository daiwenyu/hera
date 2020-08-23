import React, { useState } from 'react';
import { Card, Table, Form, Input, Space, Button, Modal, Select, Tag, DatePicker } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

function QualityManagement() {
  const [visible, setVisible] = useState(false);

  const projectType = {
    0: '全部',
    1: '科技项目',
    2: '知识产权',
    3: '资质项目',
    4: '文创项目',
    5: '其他项目',
  }

  const projectStatusType = {
    0: '全部',
    1: '已审核',
    2: '已反馈',
    3: '已录入'
  }

  const columns = [{
    title: '项目编号',
    dataIndex: '',
  }, {
    title: '项目名称',
    dataIndex: '',
  }, {
    title: '状态',
    dataIndex: '',
    render: value => (
      <Tag>{projectStatusType[value]}</Tag>
    )
  }, {
    title: '提交时间',
    dataIndex: '',
  }, {
    title: '操作',
    dataIndex: '',
    render: value => (
      <Space>
        <Button type="link">详情</Button>
        <Button type="link">编辑</Button>
      </Space>
    )
  }];

  return (
    <Card
      title="质量管理"
      extra={
        <Button
          type="primary"
          onClick={() => setVisible(true)}
        >
          新增
        </Button>
      }
    >
      <Form>
        <FormItem
          label="项目编号"
        >
          <Input />
        </FormItem>
        <FormItem
          label="项目状态"
        >
          <Select>
            {
              Object.keys(projectStatusType).map(v => (
                <Option value={v}>{projectType[v]}</Option>
              ))
            }
          </Select>
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
        title="新增项目"
        visible={visible}
        okText="保存"
        onCancel={() => setVisible(false)}
      >
        <Form>
          <FormItem label="项目编号">
            <Input />
          </FormItem>
          <FormItem label="项目名称">
            <Input />
          </FormItem>
          <FormItem label="项目描述">
            <TextArea />
          </FormItem>
          <FormItem label="文件上传">
            <Input />
          </FormItem>
        </Form>
      </Modal>
    </Card>
  );
}

export default QualityManagement;
