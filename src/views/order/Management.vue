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
                    {
                      label: 'Creado hace',
                      field: 'created_at',
                      type: 'datetime-ago',
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
                      <span>{{ dataRow.owner.email }}</span>
                    </div>
                    <div v-else-if="dataField == 'actions'">
                      <ButtonCustom
                        :classesNames="{
                          btn_custom:
                            'btn btn-outline-primary d-flex align-items-center gap-2',
                        }"
                        type="button"
                        text="Ver"
                        icon="eye"
                        @click="modalEventFind(dataRow)"
                      />
                    </div>
                    <div v-else-if="dataField == 'state'">
                      {{ state[dataFieldExact] }}
                    </div>
                    <div v-else>
                      {{ dataFieldExact }}
                    </div>
                  </template>
                </TableCustom>
                <PaginationCustom
                  :page="listData.current_page"
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
    <Find ref="modal_find" @finish_success="getList" />
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";

import TableCustom from "@/components/Table.vue";
import ButtonCustom from "@/components/Button.vue";
import PaginationCustom from "@/components/Pagination.vue";
import Create from "./Create.vue";
import Find from "./OrderFind.vue";

import useOrder from "@/composables/useOrder";

export default {
  name: "OrderManagement",
  components: {
    TableCustom,
    ButtonCustom,
    PaginationCustom,
    Create,
    Find,
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
      1: "Solicitado",
      2: "Pendiente",
      3: "Enviado",
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

    const modal_find = ref(null);
    const modalEventFind = ({ id }) => {
      console.log("modal_find", modal_find.value);
      modal_find.value.open({ id });
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
      modalEventFind,
      modal_find,
      state_change,
      state,
    };
  },
};
</script>
