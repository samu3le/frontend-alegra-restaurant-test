<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col">
              <h4 class="card-title">Listado Productos</h4>
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
                      label: 'Nombre',
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
                      label: 'Estado',
                      field: 'is_active',
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
                    <div v-if="dataField == 'is_active'">
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :checked="dataRow.is_active"
                          @click.stop.prevent="
                            state_change({
                              active: $event.target.checked,
                              id: dataRow.id,
                            })
                          "
                        />
                      </div>
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
import Find from "./ProductFind.vue";

import useProduct from "@/composables/useProduct";
import { useSwal } from "@/composables/useSwal";

export default {
  name: "ProductManagement",
  components: {
    TableCustom,
    ButtonCustom,
    PaginationCustom,
    Create,
    Find,
  },
  setup() {
    const Swal = useSwal();

    const {
      listFetchingData,
      listErrors,
      listData,
      listParams,
      setParams,
      getList,
      setStateChange,
    } = useProduct();

    onBeforeMount(() => {
      setParams({
        per_page: 10,
        page: 1,
        search: undefined,
      });
      getList();
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

    const modal_find = ref(null);
    const modalEventFind = ({ id }) => {
      console.log("modal_find", modal_find.value);
      modal_find.value.open({ id });
    };

    const state_change = ({ id, active }) => {
      console.log("state_change", id, active);
      setStateChange({ id, active })
        .then(getList)
        .catch(({ errors }) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errors.active,
          });
          getList();
        });
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
      state_change,
      modalEventFind,
    };
  },
};
</script>
