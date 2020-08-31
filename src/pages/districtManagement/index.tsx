import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Row, Col, Table, Space, Button } from 'antd';

const FormItem = Form.Item;

function DistrictM(props) {
  const { dispatch } = props;
  const [dataSource, setDataSource] = useState([]);

  const columns = [{
    title: '区部ID',
    dataIndex: 'areaId',
  }, {
    title: '区部名称',
    dataIndex: 'pareaName',
  }, {
    title: '创建时间',
    dataIndex: 'create_time',
  }, {
    title: '状态',
    dataIndex: 'status',
  }, {
    title: '操作',
    dataIndex: 'id',
  }];

  const queryAreaList = async () => {
    const data = await dispatch({
      type: 'districtM/queryAreaList',
      payload: {}
    });
    setDataSource(data);
    // console.log(data);
  }

  useEffect(() => {
    queryAreaList();
  }, []);

  return (
    <Card
      title="区部管理"
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={6}>
            <FormItem
              label="区部名称"
              name=""
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label=" "
            >
              <Space>
                <Button>查询</Button>
                <Button>重置</Button>
              </Space>
            </FormItem>
          </Col>
          <Col span={24}>
            <Table
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

export default connect(({
  districtM
}) => ({
  districtM
}))(DistrictM);
