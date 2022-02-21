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
      <h5 class="modal-title font-weight-bold">Crear Ingrediente</h5>
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
          name="name"
          type="text"
          label="Nombre"
          placeholder=""
          v-model.lazy="formValues.name"
          :value="formValues.name"
          :errors="formValuesErrors.name"
        />
      </div>
      <div class="mb-3">
        <InputText
          name="key"
          type="text"
          label="Llave"
          placeholder=""
          v-model.lazy="formValues.key"
          :value="formValues.key"
          :errors="formValuesErrors.key"
        />
      </div>
      <div class="mb-3">
        <InputText
          name="image"
          type="file"
          label="Imagen"
          accept="image/png, image/jpeg"
          placeholder=""
          :errors="formValuesErrors.image"
          @change="fileChange"
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

import useIngredient from "@/composables/useIngredient";

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
    const makeid = (length) => {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    };

    const { createFetchingData, createErrors, create } = useIngredient();

    const schemaCreate = yup.object().shape({
      name: yup.string().required().min(2).max(25),
      key: yup.string().required().min(2).max(25),
      // is_active: yup.boolean(),
    });

    const nameFake = makeid(10);

    let formValues = reactive({
      name: nameFake,
      key: nameFake,
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

    const fileChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        formValues.image = e.target.result;
      };
      reader.readAsDataURL(file);
    };

    const createEvent = async () => {
      try {
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
          }
        }
      } catch (err) {
        console.log("createEvent -> catch", err);
        formValuesErrors.value = getErrorsFromYup({
          arr: formValuesErrors.value,
          err,
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

      fileChange,
    };
  },
};
</script>
