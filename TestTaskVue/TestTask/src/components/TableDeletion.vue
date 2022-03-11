<script setup lang="ts">
import { useStore } from "@/store/store";
import * as ActionKeys from "@/store/actionkeys";


const store = useStore();

function deleteSelected(){
    store.dispatch(ActionKeys.DELETE_SELECTED_COMMUNAL_APPARTMENTS);
}

function unselectAll(){
    store.dispatch(ActionKeys.USNSELECT_ALL_COMMUNAL_APARTMENTS);
}

</script>

<template>
    <div class="button-group">
        <button @click="deleteSelected" class="pretty-button button-red">Delete all selected</button>
        <button @click="unselectAll" class="pretty-button button-red">Unselect all</button>
    </div>
</template>


<style scoped>

.button-group{
    padding: 20px;
    margin: 0 auto;
    width : 300px;
}

.pretty-button{
    border: 1px;
    border-radius: 10px;
    padding: 10px;
    color: white;
}

.button-group .pretty-button + .pretty-button{
    margin-left: 20px;
}

.button-red{
    background-color: #FF473D;
}

</style>
