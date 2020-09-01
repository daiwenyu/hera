import React, { useState } from 'react';
import { Card, Table, Form, Input, Space, Button, Modal, Select, Tag, DatePicker, Row, Col } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

function ProjectManagement() {
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
    1: '已对接',
    2: '已启动',
    3: '已完成初稿',
    4: '已提交对接',
    5: '已完成',
  }

  const columns = [{
    title: '项目编号',
    dataIndex: '',
  }, {
    title: '项目名称',
    dataIndex: '',
  }, {
    title: '所属公司',
    dataIndex: '',
  }, {
    title: '申请人',
    dataIndex: '',
  }, {
    title: '申请时间',
    dataIndex: '',
  }, {
    title: '项目类别',
    dataIndex: '',
    render: value => (
      <Tag>{projectType[value]}</Tag>
    )
  }, {
    title: '状态',
    dataIndex: '',
    render: value => (
      <Tag>{projectStatusType[value]}</Tag>
    )
  }, {
    title: '操作',
    dataIndex: '',
    render: value => (
      <Button type="link">编辑</Button>
    )
  }];

  return (
    <Card
      title="项目管理"
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
              label="项目类别"
            >
              <Select>
                {
                  Object.keys(projectType).map(v => (
                    <Option value={v}>{projectType[v]}</Option>
                  ))
                }
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="状态"
            >
              <Select>
                {
                  Object.keys(projectStatusType).map(v => (
                    <Option value={v}>{projectType[v]}</Option>
                  ))
                }
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="项目名称"
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
      >
        <Form>
          <FormItem label="项目名称">
            <Input />
          </FormItem>
          <FormItem label="项目描述">
            <TextArea />
          </FormItem>
          <FormItem label="项目类型">
            <Input />
          </FormItem>
          <FormItem label="项目状态">
            <Input />
          </FormItem>
          <FormItem label="申报人">
            <Input />
          </FormItem>
          <FormItem label="联系方式">
            <Input />
          </FormItem>
          <FormItem label="申报时间">
            <DatePicker />
          </FormItem>
        </Form>
      </Modal>
    </Card>
  );
}

export default ProjectManagement;
