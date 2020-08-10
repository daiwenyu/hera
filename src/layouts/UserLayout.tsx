import React from 'react';
import { MenuDataItem } from '@ant-design/pro-layout';
import { ConnectProps, connect } from 'umi';
import { ConnectState } from '@/models/connect';
import styles from './UserLayout.less';

export interface UserLayoutProps extends Partial<ConnectProps> {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const { children } = props;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
