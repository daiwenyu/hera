import React, { useContext, useEffect, useState } from 'react';
import { MinusCircleOutlined } from '@ant-design/icons';
import {
  Button, Card, Form, Input, Tree,
  Select, Slider, Switch, DatePicker, Row,
  Col, Space, InputNumber, Checkbox, Radio, TimePicker, AutoComplete
} from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

const TagsProps = React.createContext({});

function Box(props) {
  const { children } = props;
  const { onDelete, label } = useContext(TagsProps);

  return (
    <div className={styles.box}>
      <div className={styles.label}>{label}</div>
      <div className={styles.content} >
        {children}
      </div>
      <div className={styles.operate}>
        <MinusCircleOutlined
          onClick={() => {
            if (onDelete) {
              onDelete();
            }
          }}
        />
      </div>
    </div>
  );
}

function FormItemer(props) {
  const {
    label,
    form: { id }
  } = useContext(TagsProps);
  const { children, ...formItemProps } = props;
  return (
    <FormItem
      {...formItemProps}
      name={id}
      rules={[{
        required: true,
        message: `${label}不能为空`
      }]}
    >
      {children}
    </FormItem>
  );
}

function TSelect() {
  const {
    form: {
      options, value
    }
  } = useContext(TagsProps);

  return (
    <Space>
      <FormItemer
        initialValue={value}
      >
        <Select
          style={{ minWidth: 100 }}
          options={options}
        />
      </FormItemer>
    </Space>
  );
}

function TFactor() {
  const {
    form: {
      id, value
    }
  } = useContext(TagsProps);
  const [visiable, setVisiable] = useState(value);
  return (
    <div className={styles.factor}>
      {
        visiable ? (
          <>
            <div className={styles.topLine} />
            <div className={styles.bottomLine} />
          </>
        ) : null
      }
      <FormItem
        name={id}
        initialValue={value}
        noStyle
        valuePropName="checked"
      >
        <Switch
          checkedChildren="且"
          unCheckedChildren="或"
          onChange={(checked) => setVisiable(checked)}
        />
      </FormItem>
    </div>
  );
}

function TCheckbox() {
  const {
    form: {
      options, value
    }
  } = useContext(TagsProps);

  return (
    <FormItemer
      initialValue={value}
    >
      <Checkbox.Group
        options={options}
      />
    </FormItemer>
  );
}

function TRadiobox() {
  const {
    form: {
      options, value
    }
  } = useContext(TagsProps);

  return (
    <FormItemer
      initialValue={value}
    >
      <Radio.Group
        options={options}
      />
    </FormItemer>
  );
}

function TDate() {
  const {
    form: {
      value_1, value_2
    }
  } = useContext(TagsProps);

  return (
    <FormItemer
      initialValue={value_2 ? [value_1, value_2] : value_1}
    >
      {
        value_2 ? (
          <RangePicker allowClear />
        ) : (
            <DatePicker allowClear />
          )
      }
    </FormItemer>
  );
}

function TTime() {
  const {
    form: {
      value_1, value_2
    }
  } = useContext(TagsProps);

  // TODO range

  return (
    <FormItemer
      initialValue={value_2 ? [value_1, value_2] : value_1}
    >
      {
        value_2 ? (
          <TimePicker.RangePicker allowClear />
        ) : (
            <TimePicker allowClear />
          )
      }
    </FormItemer>
  );
}

function TDateTime() {
  const {
    form: {
      value_1, value_2
    }
  } = useContext(TagsProps);

  return (
    <FormItemer
      initialValue={value_2 ? [value_1, value_2] : value_1}
    >
      {
        value_2 ? (
          <RangePicker showTime allowClear />
        ) : (
            <DatePicker showTime allowClear />
          )
      }
    </FormItemer>
  );
}

function TNumberRange(props) {
  const {
    label,
    form: {
      value_1, value_2, unit
    }
  } = useContext(TagsProps);
  const { onChange, value } = props;
  const [min, setMin] = useState(value[0]);
  const [max, setMax] = useState(value[1]);

  useEffect(() => {
    if (onChange) {
      onChange([min, max])
    }
  }, [min, max]);

  return (
    <Space>
      <InputNumber
        value={min}
        formatter={v => `${v} ${unit}`}
        onChange={v => setMin(v)}
      />
      <span>&lt;=</span>
      {label}
      <span>&lt;=</span>
      <InputNumber
        value={max}
        formatter={v => `${v} ${unit}`}
        onChange={v => setMax(v)}
      />
    </Space>
  );
}

/**
 * 数字组件
 * @param type {string} int / flot
 */
function TNumber(type) {
  return () => {
    const {
      label,
      form: {
        value_1, value_2, unit
      }
    } = useContext(TagsProps);


    return (
      <Space>
        <FormItemer
          initialValue={value_2 ? [value_1, value_2] : value_1}
        >
          {
            value_2 ? (
              <TNumberRange />
            ) : (
                <InputNumber
                  formatter={v => `${v} ${unit}`}
                />
              )
          }
        </FormItemer>
      </Space>
    )
  };
}

function TSwitch() {
  const {
    form: {
      value
    }
  } = useContext(TagsProps);

  return (
    <FormItemer
      initialValue={value}
      valuePropName="checked"
    >
      <Switch />
    </FormItemer>
  );
}

function TAutocomplete() {
  const {
    form: {
      options, value
    }
  } = useContext(TagsProps);

  return (
    <Space>
      <FormItemer
        initialValue={value}
      >
        <AutoComplete
          style={{ minWidth: 180 }}
          options={options}
        />
      </FormItemer>
    </Space>
  );
}

const TagsComp = {
  checkbox: {
    comp: TCheckbox
  },
  radiobox: {
    comp: TRadiobox
  },
  date: {
    comp: TDate
  },
  time: {
    comp: TTime
  },
  datetime: {
    comp: TDateTime
  },
  int: {
    comp: TNumber('int')
  },
  flot: {
    comp: TNumber('flot')
  },
  switch: {
    comp: TSwitch
  },
  autocomplete: {
    comp: TAutocomplete
  },
  select: {
    comp: TSelect
  },
  factor: {
    comp: TFactor
  }
}

/**
 * 标签编辑器
 * @param {object} props - 标签属性
 * @param {string} props.type - 标签类型
 * @param {string} props.label - 标签名称
 * @param {function} props.onDelete - 删除标签时回调
 */
function Tags(props) {
  // console.log(arguments);
  const {
    type,
  } = props;

  const Comp = TagsComp[type].comp;

  return (
    <TagsProps.Provider value={props}>
      {
        type !== 'factor' ? (
          <Box>
            <Comp />
          </Box>
        ) : (
            <Comp />
          )
      }
    </TagsProps.Provider>
  );
}

export default Tags;
