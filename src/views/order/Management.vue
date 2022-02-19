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
                  text="Nuevo"
                  icon="plus"
                  @click="modalEvent"
                />
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
            <div class="row">
              <div class="col-md-12">
                <TableCustom
                  :columns="[
                    {
                      label: 'N°',
                      field: 'id',
                    },
                    {
                      label: 'Cantidad Platos',
                      field: 'quantity',
                      type: 'number',
                    },
                    {
                      label: 'Estado',
                      field: 'state',
                      type: 'custom',
                    },
                    {
                      label: 'Propietario',
                      field: 'owner',
                      type: 'custom',
                    },
                    {
                      label: 'Accion',
                      field: 'actions',
                      type: 'custom',
                    },
                  ]"
                  :list="listData.data"
                  :per_page="listParams.per_page"
                  @update="updateList"
                >
                  <template
                    v-slot:custom="{ dataRow, dataField, dataFieldExact }"
                  >
                    <div v-if="dataField == 'owner'">
                      <span>{{ dataRow.owner.nickname }}</span>
                    </div>
                    <div v-else-if="dataField == 'actions'">
                      <div class="btn-group" role="group" aria-label="">
                        <button
                          v-on:click="modalEventUpdate(dataRow)"
                          class="btn btn-outline-primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                          Ver
                        </button>
                      </div>
                    </div>
                    <div v-else-if="dataField == 'state'">
                      {{ state[dataFieldExact] }}
                      <!-- <select
                        class="form-select"
                        @change="
                          state_change({
                            id: dataRow.id,
                            states: $event.target.value,
                          })
                   ataField == 'stat   >
                        <option
                          :value="item.value"
                          v-for="(item, index) in states"
                          :key="index"
                          :selected="dataFieldExact == item.value"
                        >
                          {{ item.text }}
                        </option>
                      </select> -->
                    </div>
                    <div v-else>
                      {{ dataFieldExact }}
                    </div>
                  </template>
                </TableCustom>
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
      listFetchingData,
      listErrors,
      listData,
      listParams,
      setParams,
      getList,
      setStateChange,
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

    const state_change = ({ id, active }) => {
      setStateChange({ id, active }).then(getList);
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
      state_change,
      state,
    };
  },
};
</script>
