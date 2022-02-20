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
      <h5 class="modal-title font-weight-bold">Pedido #(id)</h5>
    </template>
    <template v-slot:body>
      <pre>
        <code>
          {{ data }}
        </code>
      </pre>
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

    const { 
      findOne,
      data,
    } = useOrder();

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
