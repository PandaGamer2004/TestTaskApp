<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import CommunalApartmentTable from "./components/CommunalApartmentTable.vue";
import DeletionModal from "./components/ConfirmDeletionModal.vue";
import {useStore} from "@/store/store";
import * as ActionKeys from "@/store/actionkeys"
const store = useStore();

function handleScroll(){
    const windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
    const windowHeight = document.documentElement.clientHeight;
    if(windowRelativeBottom < windowHeight + 50){
        store.dispatch(ActionKeys.LOAD_NEXT_COMMUNAL_APPARTMENTS_PART);
    }
}

onMounted(() =>{
    window.addEventListener("scroll", handleScroll);
})

onUnmounted(() =>{
    window.removeEventListener("scroll", handleScroll);
})
</script>

<template>
<div class="wrapper">
  <DeletionModal/>
  <Suspense>
    <CommunalApartmentTable/>
  </Suspense>
</div>
</template>


<style scoped>
.wrapper{
  width: 80%;
  margin: 0 auto;
}
</style>
