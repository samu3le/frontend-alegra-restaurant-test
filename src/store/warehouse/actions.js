import * as types from "./types";

import endpoint from "@/endpoint";

export default {
  setFetchingData({ commit }) {
    commit(types.LIST_FETCH_REQUEST);
  },
  setParams({ commit }, params) {
    commit(types.LIST_SET_PARAMS, params);
  },
  getList({ state, commit }) {
    commit(types.LIST_FETCH_REQUEST);

    return endpoint
      .get({
        url: `${types.route}/ingredients_list`,
        params: state.list.params,
      })
      .then(({ data }) => {
        commit(types.LIST_FETCH_SUCCESS, data);
        return data;
      })
      .catch((err) => {
        console.log("err", err);
        commit(types.LIST_FETCH_FAILURE, { err: err.errors });
        return Promise.reject(err);
      });
  },
  buy({ commit }, { id }) {
    commit(types.BUY_FETCH_REQUEST);
    return endpoint
      .post({
        url: `${types.route}/buy`,
        params: {
          id,
        },
      })
      .then(({ data }) => {
        commit(types.BUY_FETCH_SUCCESS, data);
        return data;
      })
      .catch((err) => {
        console.log("err", err);
        commit(types.BUY_FETCH_FAILURE, { err: err.errors });
        return Promise.reject(err);
      });
  },
  getShoppingList({ state, commit }, { id }) {
    commit(types.LIST_FETCH_REQUEST);

    return endpoint
      .get({
        url: `${types.route}/shopping_list`,
        params: {
          ...state.list.params,
          id,
        },
      })
      .then(({ data }) => {
        commit(types.LIST_FETCH_SUCCESS, data);
        return data;
      })
      .catch((err) => {
        console.log("err", err);
        commit(types.LIST_FETCH_FAILURE, { err: err.errors });
        return Promise.reject(err);
      });
  },
};
