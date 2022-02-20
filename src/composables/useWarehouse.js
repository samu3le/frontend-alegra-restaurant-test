import { computed } from "vue";
import { useStore } from "vuex";

export default () => {
  const module = "warehouse";

  const store = useStore();

  return {
    listFetchingData: computed(
      () => store.getters[`${module}/listFetchingData`]
    ),
    listErrors: computed(() => store.getters[`${module}/listErrors`]),
    listData: computed(() => store.getters[`${module}/listData`]),
    findData: computed(() => store.getters[`${module}/findData`]),
    getList: () => store.dispatch(`${module}/getList`),

    listParams: computed(() => store.getters[`${module}/listParams`]),
    setParams: (e) => store.dispatch(`${module}/setParams`, e),

    buyFetchingData: computed(() => store.getters[`${module}/buyFetchingData`]),
    buyErrors: computed(() => store.getters[`${module}/buyErrors`]),
    buy: () => store.dispatch(`${module}/buy`),

    getShoppingList: (e) => store.dispatch(`${module}/getShoppingList`, e),
    buy: (e) => store.dispatch(`${module}/buy`, e),
    setStateChange: (e) => store.dispatch(`${module}/state_change`, e),

    setFetchingData: (e) => store.dispatch(`${module}/setFetchingData`, e),
  };
};
