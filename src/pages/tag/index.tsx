import React, { useState } from 'react';
import { Button, Card, Form, Collapse, Row, Col, } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Tags from '@/components/Tags';
import styles from './index.less';

const FormItem = Form.Item;
const { Panel } = Collapse;

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
  const [form] = Form.useForm();

  const conf = {
    11: 'select',
    22: 'checkbox',
    33: 'radiobox',
    44: 'date',
    55: 'time',
    66: 'datetime',
    77: 'flot',
  }

  const getTagTmplData = (type, formOpts = {}) => {
    const uuid = uuidv4();
    return {
      ...tmpData[type],
      key: uuid,
      form: {
        ...tmpData[type].form,
        id: uuid,
        ...formOpts
      }
    }
  }

  const addTag = (tag) => {
    const type = conf[tag.id];

    if (tagsData.length % 2 === 0) {
      setTagsData([...tagsData, getTagTmplData(type)]);
    } else {
      setTagsData([...tagsData, getTagTmplData('factor'), getTagTmplData(type)]);
    }
  }

  const deleteTag = (key, index) => {
    if (index === 0) {
      // 删除头部
      setTagsData(tagsData.filter((v, i) => i > 1));
      return;
    }

    if (index === tagsData.length - 1) {
      // 删除尾部
      setTagsData(tagsData.filter((v, i) => i < tagsData.length - 2));
      return;
    }

    // 其他
    const start = index - 1;
    const end = index + 1;
    const startValue = form.getFieldValue(tagsData[start].key);
    const endValue = form.getFieldValue(tagsData[end].key);
    const newData = [...tagsData];
    newData.splice(start, 3, getTagTmplData('factor', { value: startValue && endValue }));
    setTagsData(newData);
  }

  return (
    <Card>
      <Row gutter={16}>
        <Col flex="200px">
          <Collapse defaultActiveKey="1">
            {
              tagsList.map(category => (
                <Panel header={category.label} key={category.key}>
                  {
                    category.tags.map(tag => (
                      <div
                        onClick={() => { addTag(tag) }}
                        key={tag.id}
                        className={styles.tag}
                      >
                        {tag.label}
                      </div>
                    ))
                  }
                </Panel>
              ))
            }
          </Collapse>
        </Col>

        <Col flex="auto">
          <Form
            form={form}
            onFinish={(values) => { console.log(values) }}
          >
            {
              tagsData.map((v, i) => (
                <Tags
                  key={v.key}
                  type={v.type}
                  label={v.label}
                  form={v.form}
                  onDelete={() => deleteTag(v.key, i)}
                />
              ))
            }
            {
              tagsData.length ? (
                <Card size="small" bordered={false} style={{ textAlign: 'center' }}>
                  <FormItem>
                    <Button type="primary" htmlType="submit">确定</Button>
                  </FormItem>
                </Card>
              ) : null
            }
          </Form>
        </Col>
      </Row>
    </Card >
  )
}

export default YYTag;
