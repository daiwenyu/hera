import React from 'react';
import { Column, Pie } from '@ant-design/charts';

const DemoColumn: React.FC = () => {
  const data = [
    {
      type: '家具家电',
      sales: 38,
    },
    {
      type: '粮油副食',
      sales: 52,
    },
    {
      type: '生鲜水果',
      sales: 61,
    },
    {
      type: '美容洗护',
      sales: 145,
    },
    {
      type: '母婴用品',
      sales: 48,
    },
    {
      type: '进口食品',
      sales: 38,
    },
    {
      type: '食品饮料',
      sales: 38,
    },
    {
      type: '家庭清洁',
      sales: 38,
    },
  ];
  const config = {
    title: {
      visible: true,
      text: '基础柱状图-图形标签',
    },
    description: {
      visible: true,
      text: '基础柱状图图形标签默认位置在柱形上部\u3002',
    },
    forceFit: true,
    data,
    padding: 'auto',
    xField: 'type',
    yField: 'sales',
    meta: {
      type: { alias: '类别' },
      sales: { alias: '销售额(万)' },
    },
    label: {
      visible: true,
      style: {
        fill: '#0D0E68',
        fontSize: 12,
        fontWeight: 600,
        opacity: 0.6,
      },
    },
  };
  return <Column {...config} />;
};

const DemoPie: React.FC = () => {
  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其它',
      value: 5,
    },
  ];
  const config = {
    forceFit: true,
    title: {
      visible: true,
      text: '多色饼图',
    },
    description: {
      visible: true,
      text:
        '指定颜色映射字段(colorField)\uFF0C饼图切片将根据该字段数据显示为不同的颜色\u3002指定颜色需要将color配置为一个数组\u3002\n当把饼图label的类型设置为inner时\uFF0C标签会显示在切片内部\u3002设置offset控制标签的偏移值\u3002',
    },
    radius: 0.8,
    data,
    angleField: 'value',
    colorField: 'type',
    label: {
      visible: true,
      type: 'inner',
    },
  };
  return <Pie {...config} />;
};

export default () => {
  return (
    <>
      <DemoColumn />
      <DemoPie />
    </>
  )
}
