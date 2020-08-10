import React from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const { Password } = Input;

const Login: React.FC = (prop) => {
  return (
    <Row justify="space-around">
      <Col flex="368px" >
        <Form
          style={{
            padding: 8,
          }}
        >
          <FormItem>
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入用户名"
            />
          </FormItem>
          <FormItem>
            <Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请输入密码"
            />
          </FormItem>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
            >
              登录
        </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row >

  );
}

export default Login;