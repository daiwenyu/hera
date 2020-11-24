import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Modal, Form, Select, Space, Popconfirm } from 'antd';
import { history } from 'umi';

const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const data = [
  {
    key: 1,
    name: 'John Brown sr.',
    number: 60,
    desc: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        number: 42,
        desc: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        number: 30,
        desc: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            number: 16,
            desc: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        number: 72,
        desc: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            number: 42,
            desc: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                number: 25,
                desc: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                number: 18,
                desc: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    number: 32,
    desc: 'Sidney No. 1 Lake Park',
  },
];

function Category() {
  const [nodeVisible, setNodeVisible] = useState(false);
  const [tagVisible, setTagVisible] = useState(false);
  const [activeData, setActiveData] = useState(undefined);
  const [isModify, setIsModify] = useState(false);
  const [nodeForm] = Form.useForm();
  const [relationForm] = Form.useForm();

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'age',
    },
    {
      title: '标签数量',
      dataIndex: 'number',
      key: 'address',
    },
    {
      title: '操作',
      dataIndex: 'option',
      // align: 'right',
      fixed: 'right',
      width: 240,
      render: (text, record, index) => {
        const hasTag = false;
        const hasChildren = Array.isArray(record.children) && record.children.length;
        return (
          <Space>
            {
              hasTag === false ? (
                <a
                  onClick={() => {
                    setActiveData(record);
                    setNodeVisible(true);
                  }}
                >
                  新建子节点
                </a>
              ) : null
            }
            {
              hasChildren ? null : (
                <a
                  onClick={() => {
                    setActiveData(record);
                    setTagVisible(true);
                  }}
                >
                  标签管理
                </a>
              )
            }
            <a
              onClick={() => {
                setActiveData(record);
                setNodeVisible(true);
                setIsModify(true);
              }}
            >
              编辑
            </a>
            <Popconfirm
              placement="left"
              title="请注意删除后无法恢复，确定删除吗？"
            >
              <a>删除</a>
            </Popconfirm>
          </Space>
        );
      }
    }
  ];

  useEffect(() => {
    if (nodeVisible === false) {
      nodeForm.resetFields();
      setActiveData(undefined);
      setIsModify(false);
    }
  }, [nodeVisible]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button
        type="primary"
        onClick={() => { setNodeVisible(true) }}
      >
        创建标签
      </Button>

      <Table
        rowKey="key"
        columns={columns}
        dataSource={data}
        scroll={{
          x: 'max-content'
        }}
      />

      <Modal
        forceRender
        visible={nodeVisible}
        title={
          // eslint-disable-next-line no-nested-ternary
          isModify ? '编辑节点' : (activeData ? `创建子节点（父节点-${activeData.name}）` : "创建父节点")
        }
        onCancel={() => { setNodeVisible(false) }}
      >
        <Form form={nodeForm} {...formItemLayout}>
          <FormItem
            name="cateName"
            label="分类名称"
            rules={[{
              required: true
            }, {
              max: 10
            }]}
          >
            <Input />
          </FormItem>
          <FormItem
            name="cateDecs"
            label="分类描述"
            rules={[{
              max: 50
            }]}
          >
            <TextArea rows={3} />
          </FormItem>
        </Form>
      </Modal>

      <Modal
        forceRender
        width={800}
        visible={tagVisible}
        title="标签管理"
        onCancel={() => { setTagVisible(false) }}
      >
        <Form form={relationForm} >
          <FormItem label="关联分类">
            {activeData ? activeData.name : ''}
          </FormItem>
          <FormItem label="关联标签">
            <Select
              options={[{
                label: 'a10',
                value: '1'
              }, {
                label: 'a22',
                value: '2',
                disabled: true
              }, {
                label: 'a33',
                value: '3'
              }]}
              mode="multiple"
            />
          </FormItem>
          <Table
            size="small"
            rowKey="id"
            dataSource={[{
              id: '1',
              name: 'a10'
            }]}
            columns={[{
              title: '已关联标签名称',
              dataIndex: 'name',
            }, {
              title: '标签描述',
              dataIndex: 'desc',
            }, {
              title: '操作',
              dataIndex: 'id',
              align: 'center',
              width: 140,
              render: (text, record, index) => {
                return (
                  <Space>
                    <a
                      onClick={() => {
                        history.push('/tags/list/configuration');
                      }}
                    >
                      标签设置
                    </a>
                    <Popconfirm
                      title="确认取消关联？"
                    >
                      <a>取消关联</a>
                    </Popconfirm>
                  </Space>
                )
              }
            }]}
          />
        </Form>
      </Modal>

    </Space>
  )
}

export default Category;
