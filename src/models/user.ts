import { login, signOut } from '@/services';
import { YieldReturn } from '@/types';

export default {
  namespace: 'user',

  state: {
    info: null,
    currentMenu: null,
  },

  effects: {
    *login({ payload, callback }: any, { call }: any) {
      const response: YieldReturn<typeof login> = yield call(login, payload);
      if (callback) callback(response);
    },
    *signOut({ payload, callback }: any, { call }: any) {
      const response: YieldReturn<typeof signOut> = yield call(signOut, payload);
      if (callback) callback(response);
    },
  },

  reducers: {
    saveState(state: any, { payload }: any) {
      return { ...state, ...payload };
    },
  },
};
