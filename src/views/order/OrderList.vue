<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col">
              <h4 class="card-title">Listado Pedidos</h4>
            </div>
            <div class="col">
              <div class="d-flex justify-content-end gap-2">
                <ButtonCustom
                  :classesNames="{
                    btn_custom:
                      'btn btn-outline-primary d-flex align-items-center gap-2',
                  }"
                  type="button"
                  text="Actualizar"
                  icon="rotate-cw"
                  :loading="listFetchingData"
                  @click="getList"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card-content collapse show">
          <div class="card-body">
            <div class="d-flex align-items-start">
              <!-- other card -->
              <div
                class="card m-3 text-dark bg-danger mb-3"
                style="width: 18rem"
              >
                <div class="card-header">
                  Solicitado
                  <span class="badge bg-light text-dark">{{
                    listData.data.requested.quantity
                  }}</span>
                </div>
                <ul class="list-group list-group-flush">
                  <li
                    v-for="order in listData.data.requested.list"
                    class="list-group-item"
                    :key="order.id"
                  >
                    <div class="d-flex justify-content-between">
                      <span>
                        <span class="badge bg-secondary">
                          # {{ order.id }}
                        </span>
                      </span>
                      <span>
                        <span class="badge bg-secondary">
                          Cant. {{ order.quantity }}
                        </span>
                      </span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span>
                        Creado: {{ order.created_at }}
                        Actualizado: {{ order.updated_at }}
                      </span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <ButtonCustom
                        :classesNames="{
                          btn_custom:
                            'btn btn-warning d-flex align-items-center gap-2 btn-sm',
                        }"
                        type="button"
                        text="Solicitar"
                        @click="requestOrder(order)"
                      />
                    </div>
                  </li>
                </ul>
              </div>
              <!-- other card -->
              <div
                class="card m-3 text-dark bg-warning mb-3"
                style="width: 18rem"
              >
                <div class="card-header">
                  Pendiente
                  <span class="badge bg-light text-dark">{{
                    listData.data.pending.quantity
                  }}</span>
                </div>
                <ul class="list-group list-group-flush">
                  <li
                    v-for="order in listData.data.pending.list"
                    class="list-group-item"
                    :key="order.id"
                  >
                    <div class="d-flex justify-content-between">
                      <span>
                        <span class="badge bg-secondary">
                          # {{ order.id }}
                        </span>
                      </span>
                      <span>
                        <span class="badge bg-secondary">
                          Cant. {{ order.quantity }}
                        </span>
                      </span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span>
                        Creado: {{ order.created_at }}
                        Actualizado: {{ order.updated_at }}
                      </span>
                    </div>
                    <ul>
                      <li
                        v-for="detail in order.details"
                        :key="detail.id"
                        class="m-2"
                      >
                        <div class="d-flex justify-content-between">
                          <span>
                            {{ detail.product.name }}
                          </span>
                          <div class="d-flex">
                            <span
                              class="badge bg-secondary d-flex align-items-center m-1"
                            >
                              Cant. {{ detail.quantity }}
                            </span>
                            <ButtonCustom
                              :classesNames="{
                                btn_custom: `btn ${states[detail.state].color} d-flex align-items-center gap-2 btn-sm`,
                              }"
                              type="button"
                              :text="states[detail.state].name"
                              @click="states[detail.state].click({
                                id: detail.id,
                              })"
                            />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <!-- other card -->
              <div
                class="card m-3 text-dark bg-success mb-3"
                style="width: 18rem"
              >
                <div class="card-header">
                  Enviado
                  <span class="badge bg-light text-dark">{{
                    listData.data.dispatched.quantity
                  }}</span>
                </div>
                <ul class="list-group list-group-flush">
                  <li
                    v-for="order in listData.data.dispatched.list"
                    class="list-group-item"
                    :key="order.id"
                  >
                    <div class="d-flex justify-content-between">
                      <span>
                        <span class="badge bg-secondary">
                          # {{ order.id }}
                        </span>
                      </span>
                      <span>
                        <span class="badge bg-secondary">
                          Cant. {{ order.quantity }}
                        </span>
                      </span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span>
                        Creado: {{ order.created_at }}
                        Actualizado: {{ order.updated_at }}
                      </span>
                    </div>
                    <ul>
                      <li
                        v-for="detail in order.details"
                        :key="detail.id"
                        class="m-2"
                      >
                        <div class="d-flex justify-content-between">
                          <span>
                            {{ detail.product.name }}
                          </span>
                          <div class="d-flex">
                            <span
                              class="badge bg-secondary d-flex align-items-center m-1"
                            >
                              Cant. {{ detail.quantity }}
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <!-- ------ -->
            </div>
            <PaginationCustom
              :page="listData.page"
              :per_page="listData.per_page"
              :last_page="listData.last_page"
              :next_page="listData.next_page"
              :prev_page="listData.prev_page"
              @update="updateList"
            />
          </div>
        </div>
      </div>
    </div>
    <Create ref="modal_create" @finish_success="getList" />
    <!-- <Edit ref="modal_edit" @finish_success="getList" /> -->
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";

import TableCustom from "@/components/Table.vue";
import ButtonCustom from "@/components/Button.vue";
import PaginationCustom from "@/components/Pagination.vue";
import Create from "./Create.vue";

import useOrder from "@/composables/useOrder";
import { useSwal } from '@/composables/useSwal';

export default {
  name: "OrderManagement",
  components: {
    TableCustom,
    ButtonCustom,
    PaginationCustom,
    Create,
    // Edit,
  },
  setup() {

    const Swal = useSwal();

    const {
      listStatesFetchingData: listFetchingData,
      listStatesErrors: listErrors,
      listStatesData: listData,
      getListStates: getList,
      listStatesParams: listParams,
      listStatesSetParams: setParams,
      generateOrder,
      changeState,
    } = useOrder();

    onBeforeMount(() => {
      setParams({
        per_page: 5,
        page: 1,
        search: undefined,
      });
      getList();
      console.log(getList());
    });

    const updateList = ({ per_page, page }) => {
      setParams({
        per_page,
        page,
      });
      getList();
    };

    const modal_create = ref(null);
    const modalEvent = () => {
      modal_create.value.open();
    };

    const modal_edit = ref(null);
    const modalEventUpdate = ({ id: idData }) => {
      // modal_edit.value.open({ idData });
    };

    const requestOrder = async ({ id }) => {
      await generateOrder({ id });
      getList();
    };

    // 1 - cuando fue generado el pedido
    // 2 - cuando fue solicitado a bodega
    // 3 - cuando cocina confirma que hay items para preparar
    // 4 - cuando esta listo para ser entregado
    const states = {
      1: {
        state: "created",
        name: "Solicitar",
        color: "btn-secondary",
        click: async ({id}) => {
          console.log("Solicitando",id);
          try {
            await changeState({
              id,
              state: 3,
            })
            getList()
          } catch ({errors}) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errors.id.join('\n'),
            })
            getList()
          }
        },
      },
      2: {
        state: "requested",
        name: "Preparar",
        color: "btn-warning",
        click: async ({id}) => {
          console.log("Solicitado",id);
          try {
            await changeState({
              id,
              state: 3,
            })
            getList()
          } catch ({errors}) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errors.id.join('\n'),
            })
            getList()
          }
        },
      },
      3: {
        state: "preparing",
        name: "Preparado",
        color: "btn-info",
        click: async ({id}) => {
          console.log("Preparado",id);
          await changeState({
            id,
            state: 4,
          });
          getList();
        },
      },
      4: {
        state: "prepared",
        name: "Preparado",
        color: "btn-success",
        click: async ({id}) => {
          console.log("Preparado",id);
        },
      },
    }

    return {
      listFetchingData,
      listErrors,
      listData,
      listParams,
      updateList,
      getList,
      modalEvent,
      modal_create,
      modal_edit,
      states,
      requestOrder,
    };
  },
};
</script>

<style scoped></style>
