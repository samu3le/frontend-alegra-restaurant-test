import * as types from "./types";

import store from "@/store";

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
    state.list.data = data.ingredients ?? data.shoppings;

    if (data.ingredient) {
      store.dispatch("ingredient/setData", data.ingredient);
    }
  },
  [types.LIST_FETCH_FAILURE](state, { errors }) {
    state.list.fetchingData = false;
    state.list.errors = errors;
  },

  [types.BUY_FETCH_REQUEST](state) {
    state.buy.fetchingData = true;
    state.buy.errors = null;
  },
  [types.BUY_FETCH_SUCCESS](state, { data }) {
    state.buy.fetchingData = false;
    state.buy.errors = null;
    state.buy.data = data.ingredient;
  },
  [types.BUY_FETCH_FAILURE](state, { errors }) {
    state.buy.fetchingData = false;
    state.buy.errors = errors;
  },

  [types.STATE_CHANGE_FETCH_REQUEST](state) {
    state.create.fetchingData = true;
    state.create.errors = null;
  },
  [types.STATE_CHANGE_FETCH_SUCCESS](state, { data }) {
    state.create.fetchingData = false;
    state.create.errors = null;
    state.create.data = data.ingredients;
  },
  [types.STATE_CHANGE_FETCH_FAILURE](state, { errors }) {
    state.create.fetchingData = false;
    state.create.errors = errors;
  },
};
