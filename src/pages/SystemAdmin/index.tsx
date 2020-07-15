import {PageContainer} from "@ant-design/pro-layout";
import React, {useEffect} from "react";
import {Card} from "antd";
import {connect} from "umi";
import {SystemModelState} from "@/models/connect";
import {Dispatch} from "@@/plugin-dva/connect";

export interface SystemAdminProps {
  dispatch: Dispatch;
}

function SystemAdmin(props: SystemAdminProps) {
  const {dispatch} = props;

  useEffect(() => {
    dispatch({
      type: 'system/getMenus'
    });
  }, []);

  return (
    <PageContainer>
      <Card title="菜单设置">
        123
      </Card>
    </PageContainer>
  );
}

export default connect(({system}: SystemModelState) => ({system}))(SystemAdmin);
