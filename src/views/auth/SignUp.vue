<template>
  <div class="container w-50 mt-5 rounded shadow">
    <div class="row align-items-stretch">
      <div class="col bg-white p-5 rounded-end">
        <h4 class="fw-bold text-center py-5">Registrarse</h4>
        <div
          class="alert alert-danger"
          role="alert"
          v-if="signUpErrors"
          v-html="signUpErrors"
        ></div>

        <div class="mb-3">
          <InputText
            name="name"
            type="text"
            label="Alias"
            placeholder="Nickname"
            v-model.lazy="formValues.nickname"
            :value="formValues.nickname"
            :errors="formValuesErrors.nickname"
          />
        </div>

        <div class="mb-3">
          <InputText
            name="name"
            type="text"
            label="Email"
            placeholder="mail@mail.com"
            v-model.lazy="formValues.email"
            :value="formValues.email"
            :errors="formValuesErrors.email"
          />
        </div>

        <div class="mb-3">
          <InputText
            name="name"
            :type="formTypes.password"
            label="Contraseña"
            placeholder="********"
            v-model.lazy="formValues.password"
            :value="formValues.password"
            :errors="formValuesErrors.password"
          >
            <template v-slot:buttons>
              <ButtonCustom
                :classesNames="{
                  btn_custom: 'btn btn-outline-info d-flex align-items-center gap-2',
                }"
                type="button"
                icon="eye"
                @click="passwordShow"
              />
            </template>
          </InputText>
        </div>

        <div class="mb-3">
          <InputText
            name="name"
            :type="formTypes.password"
            label="Confirma la contraseña"
            placeholder="********"
            v-model.lazy="formValues.passwordConfirmation"
            :value="formValues.passwordConfirmation"
            :errors="formValuesErrors.passwordConfirmation"
          >
            <template v-slot:buttons>
              <ButtonCustom
                :classesNames="{
                  btn_custom: 'btn btn-outline-info d-flex align-items-center gap-2',
                }"
                type="button"
                icon="eye"
                @click="passwordShow"
              />
            </template>
          </InputText>
        </div>

        <div class="d-grid">
          <ButtonCustom
            :classesNames="{
              btn_custom: 'btn btn-primary d-flex align-items-center gap-2',
            }"
            type="button"
            text="Registrase"
            icon="log-in"
            :loading="signUpFetchingData"
            @click="signUpEvent"
          />
        </div>
        <div class="my-3">
          <router-link to="login" class="dropdown-item">
            Ingresa aquí
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";

import * as yup from "yup";

import { useRouter, useRoute } from 'vue-router'

import router from '@/router'

import Modal from "@/components/Modal.vue";
import ButtonCustom from "@/components/Button.vue";
import InputText from "@/components/InputText.vue";

import useAuth from "@/composables/useAuth";

import { getErrorsFromYup } from "@/helpers";

export const props = {};

export default {
  components: {
    Modal,
    ButtonCustom,
    InputText,
  },
  setup(props, ) {

    const route = useRoute()

    const {
      signUpFetchingData,
      signUpErrors,
      signUpData,

      signUp,
    } = useAuth();

    const schemaCreate = yup.object().shape({
      nickname: yup.string().required().min(2).max(25),
      email: yup.string().email().required().min(2).max(25),
      password: yup.string().required().min(2).max(25),
      passwordConfirmation: yup.string().required().min(2).max(25).oneOf([yup.ref('password')]),
    });

    let formValues = reactive({
      nickname: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    });

    const formValuesErrors = ref({});

    const signUpEvent = async () => {
      try {
        await schemaCreate.validate(formValues, { abortEarly: false });
        for (const key in formValuesErrors.value) {
          formValuesErrors.value[key] = [];
        }
        try {
          await signUp(formValues);
        } catch (err) {
          console.error("signUpEvent -> catch", err);
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
        console.error("signUpEvent -> catch", err);
        formValuesErrors.value = getErrorsFromYup({
          arr: formValuesErrors.value,
          err,
        });
      }
    };

    const formTypes = ref({
      password: "password",
    });
    const passwordShow = () => {
      formTypes.value.password = formTypes.value.password === "password" ? "text" : "password";
    };

    return {
      formValues,
      formValuesErrors,

      signUpEvent,

      signUpFetchingData,
      signUpErrors,

      passwordShow,
      formTypes,
    };
  },
};
</script>

<style scoped>
.container {
  background: #7386d5;
  background: linear-gradient(to right, #6d7fcc, #cdc6f0);
}
</style>
