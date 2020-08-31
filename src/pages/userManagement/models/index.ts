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
  namespace: 'userManagement',

  state: {
    status: undefined,
  },

  effects: {
    *addUser({ payload }, { call, put }) {
      const res = yield call(addUser, payload);
      return res
    },
    *editUser(_, { call }) {
      const { code } = yield call(logout);
      console.log(code)
      localStorage.removeItem('cv_sessionId');
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
    *queryUserList({ payload }, { call }) {
      const { } = yield call(queryUserList, payload);
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
