import * as types from "./types";

export default {
  [types.LIST_SET_PARAMS](state, params) {
    state.list.params = {
      ...state.list.params,
      ...params,
    };
  },
  [types.LIST_FETCH_REQUEST](state) {
    state.list.fetchingData = true;
    state.list.errors = null;
  },
  [types.LIST_FETCH_SUCCESS](state, { data }) {
    state.list.fetchingData = false;
    state.list.errors = null;
    state.list.data = data.orders;
  },
  [types.LIST_FETCH_FAILURE](state, { errors }) {
    state.list.fetchingData = false;
    state.list.errors = errors;
  },

  [types.FIND_FETCH_SUCCESS](state, { data }) {
    state.fetchingData = false;
    state.errors = null;
    state.data = data.order;
  },
  [types.FIND_FETCH_REQUEST](state) {
    state.fetchingData = true;
    state.errors = null;
    state.data = {};
  },
  [types.FIND_FETCH_FAILURE](state, { errors }) {
    state.fetchingData = false;
    state.errors = errors;
  },

  [types.CREATE_FETCH_REQUEST](state) {
    state.create.fetchingData = true;
    state.create.errors = null;
  },
  [types.CREATE_FETCH_SUCCESS](state, { data }) {
    state.create.fetchingData = false;
    state.create.errors = null;
    state.create.data = data.orders;
  },
  [types.CREATE_FETCH_FAILURE](state, { errors }) {
    state.create.fetchingData = false;
    state.create.errors = errors;
  },

  [types.STATE_CHANGE_FETCH_REQUEST](state) {
    state.create.fetchingData = true;
    state.create.errors = null;
  },
  [types.STATE_CHANGE_FETCH_SUCCESS](state, { data }) {
    state.create.fetchingData = false;
    state.create.errors = null;
    state.create.data = data.orders;
  },
  [types.STATE_CHANGE_FETCH_FAILURE](state, { errors }) {
    state.create.fetchingData = false;
    state.create.errors = errors;
  },

  [types.LIST_STATES_FETCH_REQUEST](state) {
    state.list_states.fetchingData = true;
    state.list_states.errors = null;
  },
  [types.LIST_STATES_FETCH_SUCCESS](state, { data }) {
    state.list_states.fetchingData = false;
    state.list_states.errors = null;
    state.list_states.data = data.orders;
  },
  [types.LIST_STATES_FETCH_FAILURE](state, { errors }) {
    state.list_states.fetchingData = false;
    state.list_states.errors = errors;
  },
  [types.LIST_STATES_SET_PARAMS](state, params) {
    state.list_states.params = {
      ...state.list_states.params,
      ...params,
    };
  },

  [types.GENERATE_FETCH_REQUEST](state) {
    state.generate.fetchingData = true;
    state.generate.errors = null;
  },
  [types.GENERATE_FETCH_SUCCESS](state, { data }) {
    state.generate.fetchingData = false;
    state.generate.errors = null;
    state.generate.data = data.order;
  },
  [types.GENERATE_FETCH_FAILURE](state, { errors }) {
    state.generate.fetchingData = false;
    state.generate.errors = errors;
  },
};
