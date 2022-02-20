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
            <!-- other card -->
            <div class="d-flex align-items-start">
              <div
                class="card m-3 text-dark bg-danger mb-3"
                style="width: 18rem"
              >
                <div class="card-header">
                  requested <span class="badge bg-light text-dark">4</span>
                </div>
                <ul class="list-group list-group-flush">
                  <li v-for="order in listData.data.requested.list" class="list-group-item" :key="order.id">
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
                      <li v-for="detail in order.details" :key="detail.id" class="m-2">
                        <div class="d-flex justify-content-between">
                          <span>
                            {{ detail.product.name }}
                          </span>
                          <div class="d-flex">
                            <span class="badge bg-secondary d-flex align-items-center m-1">
                              Cant. {{ detail.quantity }}
                            </span>
                            <ButtonCustom
                              :classesNames="{
                                btn_custom: 'btn btn-outline-dark d-flex align-items-center gap-2 btn-sm',
                              }"
                              type="button"
                              text=""
                              icon="arrow-right"
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
                class="card m-3 text-dark bg-warning mb-3"
                style="width: 18rem"
              >
                <div class="card-header">
                  pending <span class="badge bg-light text-dark">4</span>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    pedido 1
                    <div>
                      <ul>
                        <li>pizza 24</li>
                        <li>arepa 12</li>
                        <li>bebida 2</li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- other card -->
              <div
                class="card m-3 text-dark bg-success mb-3"
                style="width: 18rem"
              >
                <div class="card-header">
                  dispatched <span class="badge bg-light text-dark">4</span>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    pedido 1
                    <div>
                      <ul>
                        <li>pizza 24</li>
                        <li>arepa 12</li>
                        <li>bebida 2</li>
                      </ul>
                    </div>
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

    const {
      listStatesFetchingData: listFetchingData,
      listStatesErrors: listErrors,
      listStatesData: listData,
      getListStates: getList,
      listStatesParams: listParams,
      listStatesSetParams: setParams,
    } = useOrder();

    const state = {
      1: "requested",
      2: "pending",
      3: "dispatched",
    };

    onBeforeMount(() => {
      setParams({
        per_page: 10,
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
      state,
    };
  },
};
</script>

<style scoped></style>
