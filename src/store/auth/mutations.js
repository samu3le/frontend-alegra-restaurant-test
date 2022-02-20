import * as types from "./types";

import router from '@/router'

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
    window.localStorage.removeItem('auth')
    window.localStorage.setItem("auth", JSON.stringify(data.user));
    router.push({ name: 'Home' })
  },
  [types.SIGN_IN_FETCH_FAILURE](state, { errors }) {
    state.signIn.fetchingData = false;
    state.signIn.errors = errors;
  },
  [types.SIGN_UP_FETCH_REQUEST](state) {
    state.signIn.fetchingData = true;
    state.signIn.errors = null;
  },
  [types.SIGN_UP_FETCH_SUCCESS](state, {
    data,
  }) {
    state.signIn.fetchingData = false;
    state.signIn.errors = null;
    state.signIn.data = data.user;

    state.auth = data.user
    window.localStorage.removeItem('auth')
    window.localStorage.setItem("auth", JSON.stringify(data.user));
    router.push({ name: 'Home' })
  },
  [types.SIGN_UP_FETCH_FAILURE](state, { errors }) {
    state.signIn.fetchingData = false;
    state.signIn.errors = errors;
  },
  [types.AUTH_VERIFY](state) {
    state.auth = JSON.parse(window.localStorage.getItem("auth"))
  },
  [types.SIGN_OUT_FETCH_REQUEST](state) {
    state.signOut.fetchingData = true;
    state.signOut.errors = null;
  },
  [types.SIGN_OUT_FETCH_SUCCESS](state, {
    data,
  }) {
    state.signOut.fetchingData = false;
    state.signOut.errors = null;
    state.signOut.data = null;

    state.auth = null
    window.localStorage.removeItem('auth')
    router.push({ name: 'Home' })
  },
  [types.SIGN_OUT_FETCH_FAILURE](state, { errors }) {
    state.signOut.fetchingData = false;
    state.signOut.errors = errors;
    state.signOut.data = null;

    state.auth = null
    window.localStorage.removeItem('auth')
    router.push({ name: 'Home' })
  },
  [types.CLEAN](state,) {
    state.auth = null
    window.localStorage.removeItem('auth')
    router.push({ name: 'Login' })
  },
  
};
