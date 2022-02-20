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
      <h5 class="modal-title font-weight-bold">Crear Producto</h5>
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
          name="image"
          type="file"
          label="Imagen"
          accept="image/png, image/jpeg"
          placeholder=""
          :errors="formValuesErrors.image"
          @change="fileChange"
        />
      </div>
      <div class="mb-3">
        <SelectIngredient
          name="ingredients_select"
          ref="ingredients_select"
          label="Ingredientes"
          v-model="formValues.ingredients_selected"
          :value="formValues.ingredients_selected"
          placeholder=""
        />
        <ButtonCustom
          :classesNames="{
            btn_custom: 'btn btn-primary d-flex align-items-center gap-2',
          }"
          type="button"
          text=""
          icon="arrow-down"
          @click="addIngredient"
        />
        <template v-if="formValues.ingredients.length">
          <div class="container">
            <div class="row" v-for="(item, index) in formValues.ingredients" :key="index">
              <div class="col-sm-7 d-flex align-items-center">{{ item.name }}</div>
              <div class="col-sm-2 d-flex align-items-center ">
                <InputText
                  name="quantity"
                  type="number"
                  label=""
                  placeholder=""
                  v-model.lazy="item.quantity"
                  :value="item.quantity"
                />
              </div>
              <div class="col-sm-3 d-flex align-items-center justify-content-end">
                <ButtonCustom
                  :classesNames="{
                    btn_custom: 'btn btn-outline-danger d-flex align-items-center gap-2',
                  }"
                  type="button"
                  text=""
                  icon="x"
                  @click="remIngredient(item)"
                />
              </div>
            </div>
          </div>
        </template>
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

import SelectIngredient from '@/views/ingredient/Select.vue'

import useProduct from "@/composables/useProduct";

import { getErrorsFromYup } from "@/helpers";

export const props = {};

export default {
  name: "CreateProduct",
  emits: ["finish_success"],
  props,
  components: {
    Modal,
    ButtonCustom,
    InputText,
    SelectIngredient,
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

    const { createFetchingData, createErrors, create } = useProduct();

    const schemaCreate = yup.object().shape({
      name: yup.string().required().min(2).max(25),
      ingredients: yup.array(),
      // is_active: yup.boolean(),
    });

    let formValues = ref({
      name: `product-${makeid(5)}`,
      ingredients: [],
      // name
      // image
    });

    const formValuesErrors = ref({});

    const modal = ref(null);

    const ingredients_select = ref(null)

    const open = () => {
      modal.value.open({});
      ingredients_select.value.reset()
    };

    const close = () => {
      console.log("close")
      formValues.value.name = ""
      formValues.value.ingredients = []
      formValues.value.image = ""
      formValues.value.ingredients_selected = {}
      formValuesErrors.value = {};
    };

    const fileChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        formValues.value.image = e.target.result;
      };
      reader.readAsDataURL(file);
    };
    const addIngredient = () => {
      if(!formValues.value.ingredients_selected?.id){
        alert('Debe indicar un ingrediente');
        return false;
      }; 
      const founded = formValues.value.ingredients.some(e => {
        if (e.id === formValues.value.ingredients_selected.id) {
          return true;
        }
      })
      founded ? alert('El ingrediente ya fue agregado') : formValues.value.ingredients.push({
        ...formValues.value.ingredients_selected,
        quantity: 1
      })
    }

    const remIngredient = (ingredient) => {
      const founded = formValues.value.ingredients.findIndex(e => e.id === ingredient.id)
      founded !== -1 ? formValues.value.ingredients.splice(founded, 1) : null
    }

    const createEvent = async () => {
      try {
        await schemaCreate.validate(formValues.value, { abortEarly: false });
        for (const key in formValuesErrors.value) {
          formValuesErrors.value[key] = [];
        }
        try {
          await create(formValues.value);
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
      ingredients_select,
      formValues,
      formValuesErrors,

      createErrors,
      createFetchingData,

      createEvent,

      fileChange,

      addIngredient,
      remIngredient,
    };
  },
};
</script>
