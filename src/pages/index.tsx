import React from 'react';
import styles from './index.less';
import {Button, Card} from "antd";

export default () => {
  return (
    <Card>
      <h1 className={styles.title}>Page index</h1>
      <Button>123</Button>
    </Card>
  );
}
