import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import {
  queryAreaList,
  addAreaUser,
  delAreaUser,
  saveWechatCode,
  queryAreaUser,
  queryUncheckedAreaUser
} from '@/services/region';

export interface StateType {
  status?: string;
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface RegionModelType {
  namespace: string;
  state: StateType;
  effects: {
    queryAreaList: Effect;
    addAreaUser: Effect;
    delAreaUser: Effect;
    saveWechatCode: Effect;
    queryAreaUser: Effect;
    queryUncheckedAreaUser: Effect;
  };
  reducers: {
    // changeLoginStatus: Reducer<StateType>;
  };
}

const Model: RegionModelType = {
  namespace: 'region',

  state: {
    status: undefined,
  },

  effects: {
    *queryAreaList({ payload }, { call }) {
      const { result } = yield call(queryAreaList, payload);
      return result || [];
    },
    *addAreaUser({ payload }, { call }) {
      const res = yield call(addAreaUser, payload);
      return res;
    },
    *delAreaUser({ payload }, { call }) {
      const res = yield call(delAreaUser, payload);
      return res;
    },
    *saveWechatCode({ payload }, { call }) {
      // const { } = yield call(saveWechatCode, payload);
    },
    *queryAreaUser({ payload }, { call }) {
      const { result } = yield call(queryAreaUser, payload);
      return result || [];
    },
    *queryUncheckedAreaUser({ payload }, { call }) {
      const { result } = yield call(queryUncheckedAreaUser, payload);
      return result || [];
    },
  },

  reducers: {
    // changeLoginStatus(state, { payload }) {
    //   setAuthority(payload.currentAuthority);
    //   return {
    //     ...state,
    //     status: payload.status,
    //     type: payload.type,
    //   };
    // },
  },
};

export default Model;
