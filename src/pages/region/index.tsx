import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import {
  Card, Form, Input, Row, Col,
  Table, Space, Button, Tag, Modal, Select
} from 'antd';
import { receipt } from '@/utils/utils';

const FormItem = Form.Item;

function RegionMgmt(props) {
  const { dispatch } = props;
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [activeArea, setActiveArea] = useState({});
  const [areaUser, setAreaUser] = useState([]);
  const [uckAreaUser, setUckAreaUser] = useState([]);
  const [selectedId, setSelectedId] = useState(undefined);

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

  const getAreaUser = async (data = activeArea) => {
    const list = await dispatch({
      type: 'region/queryAreaUser',
      payload: {
        ...data
      }
    });
    setAreaUser(list);
  }

  const getUckAreaUser = async (data = activeArea) => {
    const list = await dispatch({
      type: 'region/queryUncheckedAreaUser',
      payload: {
        ...data
      }
    });
    setUckAreaUser(list);
  }

  const showDeatil = async (data) => {
    await getAreaUser(data);
    await getUckAreaUser(data);
    setVisible(true);
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
    width: 80,
    render: (value, row) => (
      <Space>
        <Button
          type="link"
          size="small"
          onClick={() => {
            setActiveArea(row);
            showDeatil(row);
          }}
        >
          详情
        </Button>
        {/* <Button
          type="link"
          size="small"
        >
          编辑
        </Button> */}
      </Space>
    )
  }];

  const queryAreaList = async (values) => {
    const data = await dispatch({
      type: 'region/queryAreaList',
      payload: values
    });
    setDataSource(data);
  }

  const deleteAreaUser = async (data) => {
    // console.log(data, activeArea);
    const res = await dispatch({
      type: 'region/delAreaUser',
      payload: {
        userId: data.id,
        areaId: activeArea.areaId
      }
    });

    receipt(res, { msg: '删除成功！' })
      .then(() => {
        getAreaUser();
        getUckAreaUser();
      });
  }

  useEffect(() => {
    queryAreaList({});
  }, []);

  useEffect(() => {
    if (visible === false) {
      setActiveArea({});
      setSelectedId(undefined);
      queryAreaList({});
    }
  }, [visible]);

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
      <Modal
        width={800}
        title={activeArea.pareaName}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Space>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请输入用户账号"
                optionFilterProp="label"
                value={selectedId}
                options={uckAreaUser.map(v => ({
                  ...v,
                  label: v.userName,
                  value: v.id
                }))}
                onChange={value => setSelectedId(value)}
              />
              <Button
                onClick={async () => {
                  const data = uckAreaUser.find(v => v.id === selectedId);
                  const res = await dispatch({
                    type: 'region/addAreaUser',
                    payload: {
                      ...data,
                      areaId: activeArea.areaId,
                      userId: data.id
                    }
                  });
                  receipt(res, { msg: '添加成功！' })
                    .then(() => {
                      getAreaUser();
                      getUckAreaUser();
                      setSelectedId(undefined);
                    });
                }}
              >
                添加
              </Button>
            </Space>
          </Col>
          <Col span={24}>
            <Table
              size="small"
              rowKey="id"
              dataSource={areaUser}
              columns={[{
                title: '账号',
                dataIndex: 'account'
              }, {
                title: '用户名',
                dataIndex: 'userName'
              }, {
                title: '手机号',
                dataIndex: 'mobile'
              }, {
                title: '操作',
                dataIndex: 'id',
                width: 80,
                render: (value, row) => (
                  <Button
                    type="link"
                    size="small"
                    onClick={() => deleteAreaUser(row)}
                  >
                    删除
                  </Button>
                )
              }]}
            />
          </Col>
        </Row>
      </Modal>
    </Card>
  );
}

export default connect(({ region }) => ({ region }))(RegionMgmt);
