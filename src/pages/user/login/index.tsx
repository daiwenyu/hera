import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Row, Col, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const { Password } = Input;

const Login: React.FC = (prop) => {
  const [verifyCode, setVerifyCode] = useState('');

  const getData = async () => {
    // const data = await getVerifyCode({ key: 123 });
    // const blob = new Blob([data]);
    // const url = URL.createObjectURL(blob);
    // console.log(url)
    // setVerifyCode(url);
  }

  const onChangeVerifyCode = () => {
    setVerifyCode(+new Date());
  }

  useEffect(() => {
    // getData();
    setVerifyCode(123)
  }, []);

  return (
    <Row justify="space-around">
      <Col flex="368px" >
        <Form
          style={{
            padding: 8,
          }}
        >
          <FormItem>ChangeView</FormItem>
          <FormItem>
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
          <FormItem>
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
          <FormItem>
            <Space style={{ width: '100%' }}>
              <Input
                style={{
                  width: 245
                }}
                size="large"
                placeholder="请输入验证码"
              />
              <img
                style={{
                  width: 100,
                  height: 40
                }}
                alt=""
                src={`/park-crm-admin/login/verify/code?key=${verifyCode}`}
                onClick={onChangeVerifyCode}
              />
            </Space>
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
