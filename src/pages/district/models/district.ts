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
} from '@/services/district';

export interface StateType {
  status?: string;
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
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

const Model: LoginModelType = {
  namespace: 'district',

  state: {
    status: undefined,
  },

  effects: {
    *queryAreaList({ payload }, { call, put }) {
      const { result } = yield call(queryAreaList, payload);
      return result || [];
    },
    *addAreaUser({ payload }, { call }) {
      // const { } = yield call(addAreaUser, payload);
    },
    *delAreaUser({ payload }, { call }) {
      // const { } = yield call(delAreaUser, payload);
    },
    *saveWechatCode({ payload }, { call }) {
      // const { } = yield call(saveWechatCode, payload);
    },
    *queryAreaUser({ payload }, { call }) {
      // const { } = yield call(queryAreaUser, payload);
    },
    *queryUncheckedAreaUser({ payload }, { call }) {
      // const { } = yield call(queryUncheckedAreaUser, payload);
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
