import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Row, Col, Space, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, connect, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';
import { StateType } from '@/models/login';

interface LoginProps {
  dispatch: Dispatch;
  userLogin: StateType
}
const FormItem = Form.Item;
const { Password } = Input;

const Login: React.FC<LoginProps> = props => {
  const [key, setKey] = useState((+new Date()).toString());
  const { dispatch, userLogin = {} } = props;
  const { status } = userLogin;

  const onChangeKey = () => {
    setKey((+new Date()).toString());
  }

  const onLogin = async (values: any) => {
    await dispatch({
      type: 'login/login',
      payload: {
        ...values,
        key
      },
    });
  }

  return (
    <Row justify="space-around">
      <Col flex="368px" >
        <Form
          style={{ padding: 8 }}
          onFinish={onLogin}
        >
          <FormItem>ChangeView</FormItem>
          {
            status && status !== '000000' ? (
              <Alert
                style={{
                  marginBottom: 24,
                }}
                message={{
                  100008: '验证码错误',
                  100009: '用户名或密码错误'
                }[status]}
                type="error"
                showIcon
              />
            ) : null
          }
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
                src={`/api/login/verify/code?key=${key}`}
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
