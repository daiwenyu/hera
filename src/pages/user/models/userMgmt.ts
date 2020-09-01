import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { addUser, editUser, queryUserList } from '@/services/userManagement';

export interface StateType {
  status?: string;
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    addUser: Effect;
    editUser: Effect;
    queryUserList: Effect;
  };
  reducers: {
    // changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'userMgmt',

  state: {
    status: undefined,
  },

  effects: {
    *addUser({ payload }, { call }) {
      const res = yield call(addUser, payload);
      return res
    },
    *editUser({ payload }, { call }) {
      const res = yield call(editUser, payload);
      return res;
    },
    *queryUserList({ payload }, { call }) {
      const { result } = yield call(queryUserList, payload);
      return result || [];
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
