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
        url: `${types.route}/get_all`,
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
  create({ commit }, { quantity }) {
    commit(types.CREATE_FETCH_REQUEST);

    return endpoint
      .post({
        url: `${types.route}/create`,
        params: {
          quantity,
        },
      })
      .then(({ data }) => {
        commit(types.CREATE_FETCH_SUCCESS, data);
        return data;
      })
      .catch((err) => {
        console.log("err", err);
        commit(types.CREATE_FETCH_FAILURE, { err: err.errors });
        return Promise.reject(err);
      });
  },
  find({ commit }, 
    { id }
  ) {
    commit(types.FIND_FETCH_REQUEST);

    return endpoint
      .get({
        url: `${types.route}/find`,
        params: { id },
      })
      .then(({ data }) => {
        commit(types.FIND_FETCH_SUCCESS, data);
        return {};
      })
      .catch((err) => {
        console.log("err", err);
        commit(types.FIND_FETCH_FAILURE, { err: err.errors });
        return Promise.reject(err);
      });
  },
};
