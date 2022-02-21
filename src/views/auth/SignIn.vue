<template>
  <div class="container w-50 mt-5 rounded shadow">
    <div class="row align-items-stretch">
      <div class="col bg-white p-5 rounded-end">
        <h4 class="fw-bold text-center py-5">Inicio de Sesion</h4>
        <div
          class="alert alert-danger"
          role="alert"
          v-if="signInErrors"
          v-html="signInErrors"
        ></div>

        <div class="mb-3">
          <InputText
            name="name"
            type="text"
            label="Usuario (alias ó email)"
            placeholder="samuel1996 ó samuel@gmail.com"
            v-model.lazy="formValues.user"
            :value="formValues.user"
            :errors="formValuesErrors.user"
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

        <div class="d-grid">
          <ButtonCustom
            :classesNames="{
              btn_custom: 'btn btn-primary d-flex align-items-center gap-2',
            }"
            type="button"
            text="Iniciar Sesion"
            icon="log-in"
            :loading="signInFetchingData"
            @click="signInEvent"
          />
        </div>
        <div class="my-3">
          <router-link to="register" class="dropdown-item">
            Registrate
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
      signInFetchingData,
      signInErrors,
      signInData,

      signIn,
    } = useAuth();

    const schemaCreate = yup.object().shape({
      user: yup.string().required().min(2).max(25),
      password: yup.string().required().min(2).max(25),
      remember_me: yup.boolean(),
    });

    let formValues = reactive({
      user: "admin",
      password: "12345678",
      remember_me: false,
    });

    const formValuesErrors = ref({});

    const signInEvent = async () => {
      try {
        await schemaCreate.validate(formValues, { abortEarly: false });
        for (const key in formValuesErrors.value) {
          formValuesErrors.value[key] = [];
        }
        try {
          await signIn(formValues);
        } catch (err) {
          console.log('err', err)
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
        console.log("signInEvent -> catch", err);
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

      signInEvent,

      signInFetchingData,
      signInErrors,

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
