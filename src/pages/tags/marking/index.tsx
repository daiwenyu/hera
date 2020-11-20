import React, { useState } from 'react';
import { Input, Button, Modal, Form, Select } from 'antd';
import ProTable from '@ant-design/pro-table';

const FormItem = Form.Item;

function Category() {
  const [manualVisible, setManualVisible] = useState(false);
  const [taskVisible, setTaskVisible] = useState(false);

  return (
    <>
      <ProTable
        options={false}
        columns={[{
          title: '会员ID',
          dataIndex: 'id',
          search: false
        }, {
          title: '用户名',
          dataIndex: 'useName',
          search: false
        }, {
          title: '关键字',
          dataIndex: 'key',
          hideInTable: true
        }, {
          title: '注册时间',
          dataIndex: 'dateTime',
          hideInTable: true
        }, {
          title: '会员类型',
          dataIndex: 'useType'
        }, {
          title: '注册渠道',
          dataIndex: 'signUpChanel'
        }, {
          title: '服务渠道',
          dataIndex: 'serviceChanel',
          search: false
        }, {
          title: '操作',
          dataIndex: 'option',
          valueType: 'option',
          align: 'center',
          render: (text, row, _, action) => [
            <a>查看会员详情</a>,
            <a>等级渊源</a>
          ]
        }]}
        toolBarRender={() => [
          <Button
            ghost
            type="primary"
            onClick={() => { setManualVisible(true) }}
          >
            手工打标
          </Button>,
          <Button
            ghost
            type="primary"
            onClick={() => { setTaskVisible(true) }}
          >
            批量手工打标
          </Button>
        ]}
        request={() => {
          return Promise.resolve({
            total: 200,
            data: [{
              id: '001'
            }],
            success: true,
          });
        }}
      />

      <Modal
        visible={manualVisible}
        title="手工打标"
        onCancel={() => setManualVisible(false)}
      >
        <Form>
          <FormItem label="会员名">
            ***会员
          </FormItem>
          <FormItem label="会员名">
            <Select
              mode="multiple"
            />
          </FormItem>
        </Form>
      </Modal>

      <Modal
        visible={taskVisible}
        title="新增会员打标任务"
        onCancel={() => setTaskVisible(false)}
        footer={[
          <Button>取消</Button>,
          <Button type="primary">增量导入</Button>,
          <Button type="primary">覆盖导入</Button>
        ]}
      >
        <Form>
          <FormItem label="标签内容">
            <Input />
          </FormItem>
          <FormItem
            label="上传文件"
            extra={
              <span>
                请先下载
                <a>
                  《会员标签导入模板》
                </a>
                ，根据导入须知内容录入数据后进行文件导入
              </span>
            }
          >
            <Input />
          </FormItem>
        </Form>
      </Modal>
    </>
  )
}

export default Category;
