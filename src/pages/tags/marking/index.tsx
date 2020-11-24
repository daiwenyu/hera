import React, { useState } from 'react';
import { Input, Button, Modal, Form, Select, Upload } from 'antd';
import ProTable from '@ant-design/pro-table';
import { UploadOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
function Category() {
  const [manualVisible, setManualVisible] = useState(false);
  const [taskVisible, setTaskVisible] = useState(false);
  const [batchForm] = Form.useForm();

  const columns = [{
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
    width: 100,
    render: (text, row, _, action) => [
      <a key="detail">详情</a>,
      <a key="marking" onClick={() => { setManualVisible(true) }}>打标</a>
    ]
  }]

  return (
    <>
      <ProTable
        rowKey="id"
        options={false}
        columns={columns}
        toolBarRender={() => [
          <Button
            key="batch"
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
          <Button key="cancel" onClick={() => setTaskVisible(false)}>取消</Button>,
          <Button
            key="increment"
            type="primary"
            onClick={() => {
              batchForm.validateFields()
                .then(values => {
                  console.log(values)
                })
            }}
          >
            增量导入
          </Button>,
          <Button key="cover" type="primary">覆盖导入</Button>
        ]}
      >
        <Form
          // layout="vertical"
          form={batchForm}
          onFieldsChange={changedFields => {
            const [{ value, name: [key] }] = changedFields;
            if (key === 'file' && value.length === 2) {
              const [, lastFile] = value;
              batchForm.setFieldsValue({
                file: [lastFile]
              });
            }
          }}
        >
          <FormItem
            label="标签内容"
            name="tagName"
            rules={[{
              required: true
            }]}
          >
            <Select />
          </FormItem>
          <FormItem
            label="上传文件"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              return e && e.fileList;
            }}
            name="file"
            rules={[{
              required: true,
              message: '请选择文件'
            }]}
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
            <Upload
              accept=".xls,.xlsx"
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>请选择文件</Button>
            </Upload>
          </FormItem>
        </Form>
      </Modal>
    </>
  )
}

export default Category;
