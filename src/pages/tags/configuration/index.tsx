import React from 'react';
import {
  Card, Col, Form, Input, Row,
  Select, Space, Button
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const { TextArea } = Input;

function Configuration() {
  return (
    <Form>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem label="标签名称">
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="标签属性">
                <Select />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="标签描述">
                <TextArea rows={1} />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="刷新频率">
                <Select />
              </FormItem>
            </Col>
          </Row>
        </Card>

        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card>
              <Row gutter={16}>
                <Col span={12}>
                  <FormItem label="标签值名称">
                    <Input />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="标签值描述">
                    <Input />
                  </FormItem>
                </Col>
              </Row>
            </Card>

            <Card>
              <Row gutter={16}>
                <Col span={12}>
                  <FormItem label="标签值名称">
                    <Input />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="标签值描述">
                    <Input />
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem label="标签值设置">
                    <Input />
                  </FormItem>
                </Col>
              </Row>
            </Card>

            <Button type="dashed" block icon={<PlusOutlined />}>
              添加标签值
          </Button>
          </Space>
        </Card>
      </Space>
    </Form>
  );
}

export default Configuration;
