<template>
  <modal
    ref="modal"
    :custom="{
      bg: {
        header: 'primary',
      },
      size: '',
    }"
  >
    <template v-slot:title>
      <h5 class="modal-title font-weight-bold">Pedido #({{ data.id }})</h5>
    </template>
    <template v-slot:body>
      <div class="mb-3">
        <div v-if="data?.quantity">
          <span class="font-weight-bold">Numero de platos en pedido: </span>
          <span>{{ data.quantity }}</span>
        </div>
        <div v-if="data?.owner?.email">
          <span class="font-weight-bold">Creado por: </span>
          <span>{{ data.owner.email }}</span>
        </div>
        <div v-if="data?.created_at">
          <span class="font-weight-bold">Fecha creado: </span>
          <span>{{ data.created_at }}</span>
        </div>
      </div>
      <ul v-if="data?.details?.length">
        <li>{{ data.quantity }}: platos</li>
      </ul>
    </template>
  </modal>
</template>

<script>
import { ref, reactive, computed } from "vue";

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
    const { findOne, data } = useOrder();

    const modal = ref(null);
    const open = async ({ id }) => {
      findOne({ id });
      modal.value.open({});
    };

    return {
      modal,
      open,
      data,
    };
  },
};
</script>
