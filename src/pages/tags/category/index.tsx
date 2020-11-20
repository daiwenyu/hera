import React, { useState } from 'react';
import { Table, Input, Button, Modal, Form, Select, Space } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

function Category() {
  const [nodeVisible, setNodeVisible] = useState(false);
  const [tagVisible, setTagVisible] = useState(false);

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'age',
      key: 'age',
      width: '12%',
    },
    {
      title: '标签数量',
      dataIndex: 'address',
      width: '30%',
      key: 'address',
    },
    {
      title: '操作',
      dataIndex: 'option',
      align: 'center',
      render: (text, record, index) => {
        // console.log(record)
        if (Array.isArray(record.children) && record.children.length) {
          return (
            <a
              onClick={() => {
                setNodeVisible(true);
              }}
            >
              新建子节点
            </a>
          );
        }
        return (
          <a
            onClick={() => {
              setTagVisible(true);
            }}
          >
            标签管理
          </a>
        );
      }
    }
  ];

  const data = [
    {
      key: 1,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      children: [
        {
          key: 11,
          name: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park',
        },
        {
          key: 12,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
          children: [
            {
              key: 121,
              name: 'Jimmy Brown',
              age: 16,
              address: 'New York No. 3 Lake Park',
            },
          ],
        },
        {
          key: 13,
          name: 'Jim Green sr.',
          age: 72,
          address: 'London No. 1 Lake Park',
          children: [
            {
              key: 131,
              name: 'Jim Green',
              age: 42,
              address: 'London No. 2 Lake Park',
              children: [
                {
                  key: 1311,
                  name: 'Jim Green jr.',
                  age: 25,
                  address: 'London No. 3 Lake Park',
                },
                {
                  key: 1312,
                  name: 'Jimmy Green sr.',
                  age: 18,
                  address: 'London No. 4 Lake Park',
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
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
      />

      <Modal
        visible={nodeVisible}
        title="创建节点"
        onCancel={() => { setNodeVisible(false) }}
      >
        <Form>
          <FormItem label="分类名称">
            <Input />
          </FormItem>
          <FormItem label="分类描述">
            <TextArea />
          </FormItem>
        </Form>
      </Modal>

      <Modal
        visible={tagVisible}
        title="标签管理"
        onCancel={() => { setTagVisible(false) }}
      >
        <Form>
          <FormItem label="关联分类">
            ***分类
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
            rowKey="id"
            dataSource={[{
              id: '1',
              name: 'a10'
            }]}
            pagination={false}
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
              render: (text, record, index) => {
                return (
                  <Space>
                    <a>标签设置</a>
                    <a>取消关联</a>
                  </Space>
                )
              }
            }]}
          />
        </Form>
      </Modal>

    </>
  )
}

export default Category;
