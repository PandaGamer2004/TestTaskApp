<script setup lang="ts">
import type { CommunalApartment } from "@/models/CommunalApartmet";
import type { OrderingOptions } from "@/models/OrderingOptions";
import { useStore } from "@/store/store";
import { computed, watch } from "@vue/runtime-core";
import {ref } from "vue";
import type {Ref} from "vue";
import * as ActionKeys from "@/store/actionkeys";
const store = useStore();


const orederingOptions = computed<OrderingOptions>(() => {
    return store.state.orderingOptions;
})

const selectedOrdering : Ref<string[]> = ref([]);

watch(selectedOrdering, (newSelectedOrdering : string[]) =>{
    store.dispatch(ActionKeys.SET_COMMUNAL_APARTMENTS_ORDERING, newSelectedOrdering);
})

</script>


<template>
<div class="ordering-wrapper">
    <select v-model="selectedOrdering" multiple>
    <option v-for="(description, optionValue) in orederingOptions" :key="optionValue" :value="optionValue">
        {{description}}
    </option>
    </select>

</div>

</template>

<style scoped>
.ordering-wrapper{
    margin: 0 auto;
    width: fit-content;
    padding-bottom: 10px;
}
</style>