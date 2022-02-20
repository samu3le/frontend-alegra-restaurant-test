<template>
    <div class="" :style="{
            width: '100%',
        }">
        <label :for="name" class="form-label">{{ label || 'Ingredients'  }}</label>
        <div class="input-group mb-3">
            <v-select
                :options="listData.data"
                :filterable="false"

                :style="{
                    width: '100%',
                }"
                
                @option:selected="onChange"
                @option:deselecting="onChange"
                @option:deselected="onChange"
                @onChange="onChange"
                @input="onChange"
                @click="onChange"
                @change="onChange"
                
                @open="onOpen"
                @close="onClose"
                
                @search="(search, loading) => { 
                    loading(true)
                    fetch(search).then(loading(false));
                }"
                v-model="inputValue"
            >
                <template v-slot:list-footer>
                    <li v-show="hasNextPage" ref="load" class="loader">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Cargando items...
                    </li>
                    <li role="option" class="vs__dropdown-option">
                        <ButtonCustom
                            :classesNames="{
                                btn_custom: 'btn btn-outline-primary d-flex align-items-center gap-2',
                            }" 
                            type="button" 
                            text="Agregar" 
                            icon="plus" 
                            @click="createModalOpen"
                        />
                    </li>
                </template>

                <template v-slot:no-options>
                    No hay items
                </template>

                <template v-slot:option="item">
                    Nombre: {{ item?.name || '' }}
                </template>

                <template v-slot:selected-option="item">
                    <div class="selected d-center">
                        Nombre: {{ item?.name || '' }}
                    </div>
                </template>

            </v-select>
            <div 
                :class="[
                    (
                    errors.length ? 'invalid-feedback-custom-label ' : ''
                    ),
                ]"
                v-if="errors.length"
                >
                <ul>
                    <li v-for="(item, index) in errors" :key="index" :value="item">
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <CreateModal
        ref="create_modal"
        @finish_success="reset"
    />
</template>

<script>
import vSelect from 'vue-select'

import { ref, onMounted, nextTick, computed, onBeforeMount, watch } from 'vue'

import useIngredient from '@/composables/useIngredient';

import ButtonCustom from '@/components/Button.vue'

import CreateModal from '@/views/ingredient/Create.vue'

export default {
    name: 'SelectableInfiniteScroll',
    components: {
        'v-select': vSelect,
        CreateModal,
        ButtonCustom,
    },
    props: {
        type: {
            type: String,
            default: "select",
        },
        value: {
            type: [Object],
            default: "",
        },
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            default: null,
        },
        successMessage: {
            type: String,
            default: "",
        },
        placeholder: {
            type: String,
            default: "",
        },
        errors: {
            type: Array,
            default: [],
        },
        unique_in_drivers: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, ctx) {
        
        const { unique_in_drivers, value } = props;

        const {
            listErrors,
            listData,
            setParams,
            getList,
        } = useIngredient()
        
        const load = ref(null);
        const observer = ref(null);
        const limit = ref(10);
        const search = ref('');

        const inputValue = ref(value)

        const infiniteScroll = async ([{ isIntersecting, target }]) => {
            if (isIntersecting) {
                const ul = target.offsetParent
                const scrollTop = target.offsetParent.scrollTop
                limit.value += 10
                await nextTick()
                ul.scrollTop = scrollTop

                unique_in_drivers.value ? setParams({
                    per_page: limit.value,
                    page: 1,
                    search,
                    sort_by: 'created_at',
                    sort: 'asc',
                    unique_in_drivers: true,
                }) : setParams({
                    per_page: limit.value,
                    page: 1,
                    search,
                    sort_by: 'created_at',
                    sort: 'asc',
                })
                getList()
            }
        }

        onBeforeMount(() => {
            unique_in_drivers.value ? setParams({
                per_page: limit.value,
                page: 1,
                search,
                sort_by: 'created_at',
                sort: 'asc',
                unique_in_drivers: true,
            }) : setParams({
                per_page: limit.value,
                page: 1,
                sort_by: 'created_at',
                sort: 'asc',
                search,
            })
            getList()
        })

        const onOpen = async () => {
            getList()
            if (hasNextPage) {
                await nextTick()
                observer.value.observe(load.value)
            }
        }

        const onClose = async () => {
            observer.value.disconnect()
        }

        const create_modal = ref(null);
        const createModalOpen = () => {
            create_modal.value.open();
        }

        const reset = () => {
            console.log('reset')
            inputValue.value = {};
        }

        const hasNextPage = computed(() => {
            return listData.value.records_total > limit.value
        })

        const fetch = async (e) => {
            unique_in_drivers.value ? setParams({
                per_page: limit.value,
                page: 1,
                search: e,
                sort_by: 'created_at',
                sort: 'asc',
                unique_in_drivers: true,
            }) : setParams({
                per_page: limit.value,
                page: 1,
                search: e,
                sort_by: 'created_at',
                sort: 'asc',
            })

            try {
                await getList()
                return new Promise(resolve)
            } catch (error) {
                
            }
        }

        onMounted(() => {
            console.log('onMounted!')
            observer.value = new IntersectionObserver(infiniteScroll)
        })

        const onChange = (e) => {
            if(!e?.id){
                console.log('onChange',e)
                const path = e.path
                for (const el of path) {
                    if(el.tagName == 'BUTTON'){
                        if(el.classList.contains('vs__clear')){
                            ctx.emit("update:modelValue", undefined);
                            ctx.emit("change");
                        }
                    }
                }
            }else{
                ctx.emit("update:modelValue", e);
                ctx.emit("change", e);
            }
        };

        return {
            onChange,
            load,
            reset,
            fetch,
            onOpen,
            getList,
            onClose,
            hasNextPage,
            listData,
            listErrors,
            inputValue,
            create_modal,
            createModalOpen,
        };
    },
};
</script>

<style scoped>
    .invalid-feedback-custom-label {
        width: 100%;
        margin-top: .25rem;
        font-size: 80%;
        color: #dc3545;
    }

    .invalid-feedback-custom {
        width: 100%;
        margin-top: .25rem;
        /* font-size: 80%; */
        color: #dc3545;
    }

    label {
        font-weight: bold;
    }
</style>