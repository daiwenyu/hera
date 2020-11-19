import { Tabs } from 'antd';
import React from 'react';

const { TabPane } = Tabs;

function Category() {
  return (
    <>
      <Tabs>
        <TabPane tab="自动标签" />
        <TabPane tab="手工标签" />
      </Tabs>
    </>
  )
}

export default Category;
