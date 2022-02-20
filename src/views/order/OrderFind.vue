<template>
  <modal
    ref="modal"
    :custom="{
      bg: {
        header: 'primary',
      },
      size: '',
    }"
    @close="close"
  >
    <template v-slot:title>
      <h5 class="modal-title font-weight-bold">Pedido #(id)</h5>
    </template>
    <template v-slot:body>
      <div class="mb-3">
        <div class="">
          <span class="font-weight-bold">Numero de platos en pedido: </span>
          <span>1</span>
        </div>
        <div class="">
          <span class="font-weight-bold">Creado por: </span>
          <span>mail@mail.com</span>
        </div>
        <div class="">
          <span class="font-weight-bold">Fecha creado: </span>
          <span>2021-11-21</span>
        </div>
      </div>
      <ul>
        <li>Pizza: 24 platos</li>
        <li>Pollo: 24 platos</li>
      </ul>
    </template>
  </modal>
</template>

<script>
import { ref, reactive, computed } from "vue";
import store from "@/store";

import Modal from "@/components/Modal.vue";

import useOrder from "@/composables/useOrder";

export const props = {};

export default {
  emits: ["finish_success"],
  props,
  components: {
    Modal,
  },
  setup(props, { emit, attrs }) {
    const { findOne } = useOrder();
    // const store = useStore();

    // const order = computed(() => store.state.order.ingredient);

    const modal = ref(null);
    const open = async (idData) => {
      findOne(idData);
      modal.value.open();
    };

    const close = () => {
      for (const key in formValues) {
        delete formValues[key];
      }
      for (const key in formValuesErrors.value) {
        delete formValuesErrors.value[key];
      }
    };

    return {
      modal,
      open,
      // order,
    };
  },
};
</script>
