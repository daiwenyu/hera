import { Effect } from 'umi';
import { setAuthority } from '@/utils/authority';
import { addUser, editUser, queryUserList, deleteUser } from '@/services/user';

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
    deleteUser: Effect;
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
    *deleteUser({ payload }, { call }) {
      const res = yield call(deleteUser, payload);
      return res;
    }
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
