import { Reducer } from 'umi';
import { getMenus, addMenu, updateMenu } from '@/services/system';
import { Effect } from "@@/plugin-dva/connect";
import { message } from 'antd';
import defaultSettings, { DefaultSettings } from '../../config/defaultSettings';

export interface SystemModelType {
  namespace: 'system';
  state: DefaultSettings;
  effects: {
    getMenus: Effect;
    addMenu: Effect;
    updateMenu: Effect;
  };
  reducers: {
    changeSetting: Reducer<DefaultSettings>;
  };
}

const SettingModel: SystemModelType = {
  namespace: 'system',
  state: defaultSettings,
  effects: {
    * getMenus(_, { call }) {
      const response = yield call(getMenus);
      return response;
    },
    * addMenu({ payload }, { call }) {
      const response = yield call(addMenu, payload);
      message.success('添加成功！');
      return response;
    },
    * updateMenu({ payload }, { call }) {
      const response = yield call(updateMenu, payload);
      message.success('更新成功！');
      return response;
    }
  },
  reducers: {
    changeSetting(state = defaultSettings, { payload }) {
      const { contentWidth } = payload;

      if (state.contentWidth !== contentWidth && window.dispatchEvent) {
        window.dispatchEvent(new Event('resize'));
      }

      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default SettingModel;
