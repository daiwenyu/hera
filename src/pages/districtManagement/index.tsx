import React from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';

function DistrictM() {
  return (
    <Card
      title="123"
    >
      {/* <Form /> */}
    </Card>
  );
}

export default connect(({ a }) => ({}))(DistrictM);
