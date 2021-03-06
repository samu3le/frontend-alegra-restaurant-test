import { computed } from "vue";
import { useStore } from "vuex";

export default () => {
  const module = "order";

  const store = useStore();

  return {
    listFetchingData: computed(() => store.getters[`${module}/listFetchingData`]),
    listErrors: computed(() => store.getters[`${module}/listErrors`]),
    listData: computed(() => store.getters[`${module}/listData`]),
    getList: () => store.dispatch(`${module}/getList`),
    listParams: computed(() => store.getters[`${module}/listParams`]),
    setParams: (e) => store.dispatch(`${module}/setParams`, e),

    listStatesFetchingData: computed(() => store.getters[`${module}/listStatesFetchingData`]),
    listStatesErrors: computed(() => store.getters[`${module}/listStatesErrors`]),
    listStatesData: computed(() => store.getters[`${module}/listStatesData`]),
    getListStates: () => store.dispatch(`${module}/getListStates`),
    listStatesParams: computed(() => store.getters[`${module}/listStatesParams`]),
    listStatesSetParams: (e) => store.dispatch(`${module}/listStatesSetParams`, e),

    createFetchingData: computed(
      () => store.getters[`${module}/createFetchingData`]
    ),
    createErrors: computed(() => store.getters[`${module}/createErrors`]),
    create: () => store.dispatch(`${module}/create`),

    data: computed(() => store.getters[`${module}/data`]),

    findOne: (e) => store.dispatch(`${module}/find`, e),
    create: (e) => store.dispatch(`${module}/create`, e),
    setStateChange: (e) => store.dispatch(`${module}/state_change`, e),

    setFetchingData: (e) => store.dispatch(`${module}/setFetchingData`, e),

    generateOrder: (e) => store.dispatch(`${module}/generateOrder`, e),
    changeState: (e) => store.dispatch(`${module}/changeState`, e),
  };
};
