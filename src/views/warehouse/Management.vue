<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col">
              <h4 class="card-title">Inventario Ingredientes</h4>
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
            <div class="row">
              <div class="col-md-12">
                <TableCustom
                  :columns="[
                    {
                      label: 'N°',
                      field: 'id',
                    },
                    {
                      label: 'Ingrediente',
                      field: 'name',
                      type: 'text',
                      limit: 10,
                    },
                    {
                      label: 'Imagen',
                      field: 'image',
                      type: 'image',
                    },
                    {
                      label: 'Cantidad Existente',
                      field: 'stock',
                      type: 'text',
                      limit: 10,
                    },
                    {
                      label: 'Cantidad Solicitada',
                      field: 'requested_quantity',
                      type: 'text',
                      limit: 10,
                    },
                    {
                      label: 'Cantidad faltante',
                      field: 'requested_quantity',
                      type: 'custom',
                      limit: 10,
                    },
                    {
                      label: 'Accion',
                      field: 'no_stock',
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
                    <div v-if="dataField == 'no_stock'">
                      <!-- <template v-if="dataFieldExact == true"> -->
                      <button
                        v-on:click="EventBuy(dataRow)"
                        class="btn btn-outline-primary"
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                          <path
                            d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z"
                          />
                        </svg>
                        Comprar
                      </button>
                      <!-- </template> -->
                    </div>

                    <div v-else-if="dataField == 'requested_quantity'">
                      {{
                        dataRow.stock - dataRow.requested_quantity < 0
                          ? (dataRow.stock - dataRow.requested_quantity) * -1
                          : dataRow.stock - dataRow.requested_quantity ==
                            dataRow.stock
                          ? "0"
                          : dataRow.stock - dataRow.requested_quantity >
                            dataRow.requested_quantity
                          ? "0"
                          : dataRow.stock > dataRow.requested_quantity
                          ? "0"
                          : dataRow.stock - dataRow.requested_quantity
                      }}
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
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";

import TableCustom from "@/components/Table.vue";
import ButtonCustom from "@/components/Button.vue";
import PaginationCustom from "@/components/Pagination.vue";

import { useRouter, useRoute } from "vue-router";
import router from "@/router";

import useWarehouse from "@/composables/useWarehouse";

export default {
  name: "WarehouseManagement",
  components: {
    TableCustom,
    ButtonCustom,
    PaginationCustom,
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
    } = useWarehouse();

    const route = useRoute();

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

    const EventBuy = (data) => {
      console.log(data, "data recibida para enviar");
      const { id, name, stock } = data;
      router.push({
        name: "shopping",
        query: {
          id,
        },
      });
    };

    return {
      listFetchingData,
      listErrors,
      listData,
      listParams,
      updateList,
      getList,
      EventBuy,
      state_change,
    };
  },
};
</script>
