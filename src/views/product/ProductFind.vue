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
      <h5 class="modal-title font-weight-bold">Receta de: {{ data.name }}</h5>
    </template>
    <template v-slot:body>
      <div class="mb-3">
        <img
          :src="data?.image ? data.image : '@/assets/image-not-found.png'"
          class="img-thumbnail"
          style="width: 50px; height: 50px"
          @error="
            replaceByDefault({
              $event: $event,
              value: data?.image,
            })
          "
        />
        <div class="mt-2" v-if="data?.created_at">
          <span class="font-weight-bold">Fecha creado: </span>
          <span>{{ data.created_at }}</span>
        </div>
      </div>
      <span class="font-weight-bold">Ingredientes</span>
      <ul>
        <div v-for="item in data.ingredients" :key="item.id">
          <li v-if="item?.name">
            {{ item.name }}: {{ item.pivot.quantity }}
            <span
              ><img
                :src="item?.image ? item.image : '@/assets/image-not-found.png'"
                class="img-thumbnail"
                style="width: 50px; height: 50px"
                @error="
                  replaceByDefault({
                    $event: $event,
                    value: item?.image,
                  })
                "
            /></span>
          </li>
        </div>
      </ul>
    </template>
  </modal>
</template>

<script>
import { ref } from "vue";

import Modal from "@/components/Modal.vue";

import useProduct from "@/composables/useProduct";

export const props = {};

export default {
  emits: ["finish_success"],
  props,
  components: {
    Modal,
  },
  setup(props, { emit, attrs }) {
    const { findOne, data } = useProduct();

    const modal = ref(null);
    const open = async ({ id }) => {
      findOne({ id });
      modal.value.open({});
    };

    const state = {
      1: "Creado",
      2: "Solicitado",
      3: "Preparacion",
      4: "Preparado",
    };

    const replaceByDefault = ({ $event, value }) => {
      console.log("");
      $event.target.src = require("@/assets/image-not-found.png");
    };

    return {
      modal,
      open,
      data,
      state,
      replaceByDefault,
    };
  },
};
</script>
