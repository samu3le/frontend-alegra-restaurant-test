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
        console.err("err", err);
        commit(types.SIGN_IN_FETCH_FAILURE, { err: err.errors });
        return Promise.reject(err);
      });
  },
  verify({ commit }) {
    commit(types.AUTH_VERIFY);
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
        console.err("err", err);
        commit(types.SIGN_OUT_FETCH_FAILURE, { err: err.errors });
        return Promise.reject(err);
      });
  },
};
