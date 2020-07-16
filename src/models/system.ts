import {Reducer} from 'umi';
import defaultSettings, {DefaultSettings} from '../../config/defaultSettings';
import {getMenus} from '@/services/system';
import {Effect} from "@@/plugin-dva/connect";

export interface SystemModelType {
  namespace: 'system';
  state: DefaultSettings;
  effects: {
    getMenus: Effect;
  };
  reducers: {
    changeSetting: Reducer<DefaultSettings>;
  };
}

const SettingModel: SystemModelType = {
  namespace: 'system',
  state: defaultSettings,
  effects: {
    * getMenus(_, {call}) {
      const response = yield call(getMenus);
      return response;
    }
  },
  reducers: {
    changeSetting(state = defaultSettings, {payload}) {
      const {contentWidth} = payload;

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
