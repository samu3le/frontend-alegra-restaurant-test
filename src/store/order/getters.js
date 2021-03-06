export default {
  fetchingData(state) {
    return state.fetchingData;
  },
  errors(state) {
    return state.errors;
  },
  data(state) {
    return state.data;
  },

  listFetchingData(state) {
    return state.list.fetchingData;
  },
  listErrors(state) {
    return state.list.errors;
  },
  listData(state) {
    return state.list.data;
  },
  listParams(state) {
    return state.list.params;
  },

  createFetchingData(state) {
    return state.create.fetchingData;
  },
  createErrors(state) {
    return state.create.message;
  },

  listStatesFetchingData(state) {
    return state.list_states.fetchingData;
  },
  listStatesErrors(state) {
    return state.list_states.errors;
  },
  listStatesData(state) {
    return state.list_states.data;
  },
};
