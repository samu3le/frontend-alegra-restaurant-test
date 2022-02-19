import * as types from "./types";

export default {
  [types.SIGN_IN_FETCH_REQUEST](state) {
    state.signIn.fetchingData = true;
    state.signIn.errors = null;
  },
  [types.SIGN_IN_FETCH_SUCCESS](state, {
    data,
  }) {
    state.signIn.fetchingData = false;
    state.signIn.errors = null;
    state.signIn.data = data.user;

    state.auth = data.user
    window.localStorage.setItem("auth", JSON.stringify(data.user));
  },
  [types.SIGN_IN_FETCH_FAILURE](state, { errors }) {
    state.signIn.fetchingData = false;
    state.signIn.errors = errors;
  },
};
