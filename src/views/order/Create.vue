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
      <h5 class="modal-title font-weight-bold">Crear Pedido</h5>
    </template>
    <template v-slot:body>
      <div
        class="alert alert-danger"
        role="alert"
        v-if="createErrors"
        v-html="createErrors"
      ></div>

      <div class="mb-3">
        <InputText
          name="quantity"
          type="number"
          label="Numero de platos en pedido"
          placeholder=""
          v-model.trim.lazy="formValues.quantity"
          :value="formValues.quantity"
          :errors="formValuesErrors.quantity"
        />
      </div>
    </template>
    <template v-slot:actions>
      <ButtonCustom
        :classesNames="{
          btn_custom: 'btn btn-primary d-flex align-items-center gap-2',
        }"
        type="button"
        text="Guardar"
        icon="save"
        :loading="createFetchingData"
        @click="createEvent"
      />
    </template>
  </modal>
</template>

<script>
import { ref, reactive } from "vue";

import * as yup from "yup";

import Modal from "@/components/Modal.vue";
import ButtonCustom from "@/components/Button.vue";
import InputText from "@/components/InputText.vue";

import useOrder from "@/composables/useOrder";

import { useSwal } from "@/composables/useSwal";

import { getErrorsFromYup } from "@/helpers";

export const props = {};

export default {
  emits: ["finish_success"],
  props,
  components: {
    Modal,
    ButtonCustom,
    InputText,
  },
  setup(props, { emit, attrs }) {
    const Swal = useSwal();

    const { createFetchingData, createErrors, create } = useOrder();

    const schemaCreate = yup.object().shape({
      quantity: yup.number().required().min(1),

      // is_active: yup.boolean(),
    });

    let formValues = reactive({
      // quantity
      // is_active
    });

    const formValuesErrors = ref({});

    const modal = ref(null);

    const open = () => {
      modal.value.open({});
    };

    const close = () => {
      for (const key in formValues) {
        delete formValues[key];
      }
      for (const key in formValuesErrors.value) {
        delete formValuesErrors.value[key];
      }
    };

    const createEvent = async () => {
      console.log("createEvent");

      try {
        console.log("entra");
        await schemaCreate.validate(formValues, { abortEarly: false });
        for (const key in formValuesErrors.value) {
          formValuesErrors.value[key] = [];
        }
        try {
          await create(formValues);
          modal.value.close();
          emit("finish_success");
        } catch (err) {
          if (err?.errors) {
            for (const key in formValuesErrors.value) {
              formValuesErrors.value[key] = [];
            }

            const { errors } = err;
            for (const error in errors) {
              formValuesErrors.value[error] = err.errors[error];
            }
            modal.value.close();
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.errors,
            });
          }
        }
      } catch (err) {
        console.log("createEvent -> catch", err);
        formValuesErrors.value = getErrorsFromYup({
          arr: formValuesErrors.value,
          err,
        });

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errors.id.join("\n"),
        });
      }
    };

    return {
      modal,
      open,
      close,
      formValues,
      formValuesErrors,

      createErrors,
      createFetchingData,

      createEvent,
    };
  },
};
</script>
