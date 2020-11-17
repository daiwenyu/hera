import React, { useState } from 'react';
import { Button, Card, Form, Collapse, Tag, Select, Slider, Switch, DatePicker, Row, Col, Space, InputNumber } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Tags from '@/components/Tags';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  // padding: grid,
  // width: 250
});

const tmpData = {
  select: {
    type: 'select',
    label: '下拉框',
    key: uuidv4(),
    form: {
      id: uuidv4(),
      value: '1',
      options: [{
        label: '男',
        value: '1'
      }, {
        label: '女',
        value: '2'
      }, {
        label: '其他',
        value: '3'
      }]
    }
  },
  checkbox: {
    type: 'checkbox',
    label: '多选框',
    key: uuidv4(),
    form: {
      id: uuidv4(),
      value: ['1', '2'],
      options: [{
        label: '男',
        value: '1'
      }, {
        label: '女',
        value: '2'
      }, {
        label: '其他',
        value: '3'
      }]
    }
  },
  radiobox: {
    type: 'radiobox',
    label: '单选框',
    key: uuidv4(),
    form: {
      id: uuidv4(),
      value: '1',
      options: [{
        label: '男',
        value: '1'
      }, {
        label: '女',
        value: '2'
      }, {
        label: '其他',
        value: '3'
      }]
    }
  },
  date: {
    type: 'date',
    label: '日期',
    key: uuidv4(),
    form: {
      id: uuidv4(),
      value_1: moment('2020-10-10', 'YYYY-MM-DD'),
      value_2: moment('2020-11-11', 'YYYY-MM-DD')
    }
  },
  time: {
    type: 'time',
    label: '时间',
    key: uuidv4(),
    form: {
      id: uuidv4(),
      value_1: moment('12:09:20', 'HH:mm:ss'),
      value_2: moment('22:45:12', 'HH:mm:ss')
    }
  },
  datetime: {
    type: 'datetime',
    label: '时间日期',
    key: uuidv4(),
    form: {
      id: uuidv4(),
      value_1: moment('2020-11-11 12:09:20', 'YYYY-MM-DD HH:mm:ss'),
      value_2: moment('2020-12-13 22:55:58', 'YYYY-MM-DD HH:mm:ss')
    }
  },
  switch: {
    type: 'switch',
    label: '开关',
    key: uuidv4(),
    form: {
      id: uuidv4(),
      value: true,
    }
  },
  autocomplete: {
    type: 'autocomplete',
    label: '自动填充',
    key: uuidv4(),
    form: {
      id: uuidv4(),
      value: '1',
      options: [{
        label: '男',
        value: '1'
      }, {
        label: '女',
        value: '2'
      }, {
        label: '其他',
        value: '3'
      }]
    }
  },
  int: {
    type: 'int',
    label: '整型',
    key: uuidv4(),
    form: {
      id: uuidv4(),
      value_1: 68,
      value_2: 69,
      unit: '岁'
    }
  },
  flot: {
    type: 'flot',
    label: '浮点型',
    key: uuidv4(),
    form: {
      id: uuidv4(),
      value_1: 1.25,
      unit: '元'
    }
  },
  factor: {
    type: 'factor',
    key: uuidv4(),
    form: {
      value: true,
      id: uuidv4(),
    }
  }
}


function YYTag() {
  const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          disabled: true,
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
              disableCheckbox: true,
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
        },
      ],
    },
  ];

  const [tagsData, setTagsData] = useState([]);

  const [tagsList, setTagsList] = useState([{
    label: '基础信息',
    key: '1',
    tags: [{
      id: '11',
      label: '品牌偏好'
    }, {
      id: '22',
      label: '购物'
    }, {
      id: '33',
      label: '时间'
    }, {
      id: '44',
      label: '消费店铺'
    }, {
      id: '55',
      label: '跑步倾向'
    }, {
      id: '66',
      label: '篮球'
    }, {
      id: '77',
      label: '瑜伽'
    }]
  }, {
    label: '消费偏好',
    key: '2',
    tags: []
  }, {
    label: '运动赛事',
    key: '3',
    tags: []
  }, {
    label: '未分类标签',
    key: '4',
    tags: []
  }, {
    label: '手工标签',
    key: '5',
    tags: []
  }]);

  return (
    <Card>
      <DragDropContext
        onDragEnd={(result, provided) => {
          console.log(result, provided);
        }}
      >

        <Row gutter={16}>
          <Col flex="200px">

            <Collapse defaultActiveKey="1">
              {
                tagsList.map(category => (
                  <Panel header={category.label} key={category.key}>
                    <Droppable droppableId="droppable-12" >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                          {...provided.droppableProps}
                        >
                          {
                            category.tags.map((tag, index) => (
                              <Draggable
                                key={tag.id}
                                draggableId={tag.id}
                                index={index}
                              >
                                {
                                  (provided, snapshot) => (
                                    <div
                                      className={styles.tag}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {tag.label}
                                    </div>
                                  )
                                }
                              </Draggable>
                            ))
                          }
                        </div>
                      )}
                    </Droppable>
                  </Panel>
                ))
              }
            </Collapse>
          </Col>

          <Col flex="auto">
            <Form
              onFinish={(values) => { console.log(values) }}
            >
              <Droppable droppableId="droppable">
                {
                  (provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    // style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {
                        tagsData.map(v => (
                          <Tags
                            key={v.key}
                            type={v.type}
                            label={v.label}
                            form={v.form}
                            onDelete={(data) => {
                              console.log(v.id)
                            }}
                          />
                        ))
                      }
                      <FormItem>
                        <Button htmlType="submit">确定</Button>
                      </FormItem>
                    </div>
                  )
                }
              </Droppable>
            </Form>
          </Col>
        </Row>
      </DragDropContext>
    </Card >
  )
}

export default YYTag;
