import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Row, Col, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, connect, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';

interface LoginProps {
  dispatch: Dispatch;
}
const FormItem = Form.Item;
const { Password } = Input;

const Login: React.FC<LoginProps> = props => {
  const [key, setKey] = useState('');
  const { dispatch } = props;

  const onChangeKey = () => {
    setKey((+new Date()).toString());
  }

  const onLogin = (values) => {
    // console.log(values)
    dispatch({
      type: 'login/login',
      payload: {
        ...values,
        key
      },
    });
  }

  useEffect(() => {
    onChangeKey();
  }, []);

  return (
    <Row justify="space-around">
      <Col flex="368px" >
        <Form
          style={{ padding: 8 }}
          onFinish={onLogin}
        >
          <FormItem>ChangeView</FormItem>
          <FormItem
            name="account"
            rules={[{
              required: true,
              message: '请输入用户名'
            }]}
          >
            <Input
              size="large"
              prefix={
                <UserOutlined
                  style={{
                    color: '#1890ff'
                  }}
                />
              }
              placeholder="请输入用户名"
            />
          </FormItem>
          <FormItem
            name="userPwd"
            rules={[{
              required: true,
              message: '请输入密码'
            }]}
          >
            <Password
              size="large"
              prefix={
                <LockOutlined
                  style={{
                    color: '#1890ff'
                  }}
                />
              }
              placeholder="请输入密码"
            />
          </FormItem>
          <Space style={{ width: '100%' }}>
            <FormItem
              name="verifyCode"
              rules={[{
                required: true,
                message: '请输入验证码'
              }]}
            >
              <Input
                style={{
                  width: 245
                }}
                size="large"
                placeholder="请输入验证码"
              />
            </FormItem>
            <FormItem>
              <img
                style={{
                  width: 100,
                  height: 40,
                  cursor: 'pointer'
                }}
                alt="点击切换验证码"
                src={`/park-crm-admin/login/verify/code?key=${key}`}
                onClick={onChangeKey}
              />
            </FormItem>
          </Space>
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
    </Row>
  );
}

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
