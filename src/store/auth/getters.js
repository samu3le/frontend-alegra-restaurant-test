export default {
  signInFetchingData(state) {
    return state.signIn.fetchingData;
  },
  signInErrors(state) {
    return state.signIn.errors;
  },
  signInData(state) {
    return state.signIn.data;
  },
  auth(state) {
    return state.auth;
  },
};
