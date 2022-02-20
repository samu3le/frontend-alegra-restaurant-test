import * as types from "./types";

import endpoint from "@/endpoint";

export default {
  signIn({ commit }, {
    user,
    password,
  }) {
    commit(types.SIGN_IN_FETCH_REQUEST);

    return endpoint
      .post({
        url: `${types.route}/sign_in`,
        params: {
          user,
          password,
        },
      })
      .then(({ data }) => {
        commit(types.SIGN_IN_FETCH_SUCCESS, data);
        return data;
      })
      .catch((err) => {
        console.error("err", err);
        commit(types.SIGN_IN_FETCH_FAILURE, { err: err.errors });
        return Promise.reject(err);
      });
  },
  verify({ commit }) {
    commit(types.AUTH_VERIFY);
  },
  clean({ commit }) {
    commit(types.CLEAN);
  },
  signOut({ commit }) {
    commit(types.SIGN_OUT_FETCH_REQUEST);

    return endpoint
      .post({
        url: `${types.route}/sign_out`,
      })
      .then(({ data }) => {
        commit(types.SIGN_OUT_FETCH_SUCCESS, data);
        return data;
      })
      .catch((err) => {
        console.error("err", err);
        commit(types.SIGN_OUT_FETCH_FAILURE, { err: err.errors });
        return Promise.reject(err);
      });
  },
  signUp({ commit }, {
    nickname,
    email,
    password,
    passwordConfirmation,
  }) {
    commit(types.SIGN_UP_FETCH_REQUEST);

    return endpoint
      .post({
        url: `${types.route}/sign_up`,
        params: {
          nickname,
          email,
          password,
          passwordConfirmation,
        },
      })
      .then(({ data }) => {
        commit(types.SIGN_UP_FETCH_SUCCESS, data);
        return data;
      })
      .catch((err) => {
        console.error("err", err);
        commit(types.SIGN_UP_FETCH_FAILURE, { err: err.errors });
        return Promise.reject(err);
      });
  },
};
