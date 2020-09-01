import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Card, Form, Input, Row, Col, Table, Space, Button, Tag } from 'antd';

const FormItem = Form.Item;

function District(props) {
  const { dispatch } = props;
  const [dataSource, setDataSource] = useState([]);
  const status = {
    0: {
      label: '不可用',
      color: 'warning'
    },
    1: {
      label: '正常',
      color: 'success'
    },
    2: {
      label: '删除',
      color: 'error'
    },
  }

  const columns = [{
    title: '区部ID',
    dataIndex: 'areaId',
  }, {
    title: '区部名称',
    dataIndex: 'pareaName',
  }, {
    title: '创建时间',
    align: 'center',
    dataIndex: 'create_time',
  }, {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    render: value => (
      <Tag color={status[value].color}>
        {status[value].label}
      </Tag>
    )
  }, {
    title: '操作',
    dataIndex: 'id',
    align: 'center',
    width: 120,
    render: value => (
      <Space>
        <Button
          type="link"
          size="small"
        >
          详情
        </Button>
        <Button
          type="link"
          size="small"
        >
          编辑
        </Button>
      </Space>
    )
  }];

  const queryAreaList = async (values) => {
    const data = await dispatch({
      type: 'district/queryAreaList',
      payload: values
    });
    setDataSource(data);
  }

  useEffect(() => {
    queryAreaList({});
  }, []);

  return (
    <Card title="区部管理">
      <Form
        layout="vertical"
        onFinish={queryAreaList}
      >
        <Row gutter={16}>
          <Col span={6}>
            <FormItem
              label="区部名称"
              name="dareaName"
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label=" "
            >
              <Space>
                <Button htmlType="submit">查询</Button>
                <Button>重置</Button>
              </Space>
            </FormItem>
          </Col>
          <Col span={24}>
            <Table
              bordered
              rowKey="id"
              size="small"
              dataSource={dataSource}
              columns={columns}
            />
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default connect(({ district }) => ({ district }))(District);
