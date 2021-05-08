import { login, signOut } from '@/services';

export default {
  namespace: 'user',

  state: {
    info: null,
    currentMenu: null,
  },

  effects: {
    *login({ payload, callback }: any, { call }: any) {
      const response: API.YieldReturn<typeof login> = yield call(login, payload);
      if (callback) callback(response);
    },
    *signOut({ payload, callback }: any, { call }: any) {
      const response: API.YieldReturn<typeof signOut> = yield call(signOut, payload);
      if (callback) callback(response);
    },
  },

  reducers: {
    saveState(state: any, { payload }: any) {
      return { ...state, ...payload };
    },
  },
};
