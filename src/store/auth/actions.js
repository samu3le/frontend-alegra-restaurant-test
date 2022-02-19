import * as types from "./types";

import endpoint from "@/endpoint";

export default {
  signIn({ commit }, {
    user,
    password,
  }) {
    commit(types.SIGN_IN_FETCH_REQUEST);

    console.log('signIn');

    return endpoint
      .post({
        url: `${types.route}/sign_in`,
        params: {
          user,
          password,
        },
      })
      .then(({ data }) => {
        console.log('signIn -> data', data);
        commit(types.SIGN_IN_FETCH_SUCCESS, data);
        return data;
      })
      .catch((err) => {
        console.err("err", err);
        commit(types.SIGN_IN_FETCH_FAILURE, { err: err.errors });
        return Promise.reject(err);
      });
  },
};
