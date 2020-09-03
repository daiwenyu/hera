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
import {
  addCompany,
  getCompanyList,
  updateCompany
} from '@/services/customer';

export interface StateType {
  status?: string;
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface CustomerModelType {
  namespace: string;
  state: StateType;
  effects: {
    addCompany: Effect;
    getCompanyList: Effect;
    updateCompany: Effect;
  };
  reducers: {
    // changeLoginStatus: Reducer<StateType>;
  };
}

const Model: CustomerModelType = {
  namespace: 'customer',

  state: {
    status: undefined,
  },

  effects: {
    *addCompany({ payload }, { call }) {
      const res = yield call(addCompany, payload);
      return res;
    },
    *updateCompany({ payload }, { call }) {
      const res = yield call(updateCompany, payload);
      return res;
    },
    *getCompanyList({ payload }, { call }) {
      const { result } = yield call(getCompanyList, payload);
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
