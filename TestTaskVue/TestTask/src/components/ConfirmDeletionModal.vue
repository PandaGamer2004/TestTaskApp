<script setup lang="ts">
import {useStore} from "@/store/store";
import { computed, onMounted, onUnmounted } from "@vue/runtime-core";
import * as ActionKeys from "@/store/actionkeys"
const store = useStore();

const showModal  = computed<boolean>(() => {
    return store.state.isModalDisplayed;
})


const deletionString = computed<string>(() =>{
    const deletionString = "Are you shoure you want to delete this item?";
    return store.state.selectedComunalAppartments.length === 1? deletionString
        : deletionString.slice(0, deletionString.length-1) + "s?"
})

function denyDeletion() : void{
    store.dispatch(ActionKeys.DENY_DELETION);
}

function confirmDeletion(): void{
    store.dispatch(ActionKeys.CONFIRM_DELETION);
}


</script>



<template>
  <Transition name="modal">
    <div v-if="showModal" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>{{deletionString}}</h3>
          </div>
          <div class="modal-footer">
              <button class="modal-footer-button button-confirm" @click="confirmDeletion">Confirm Deletion</button>
              <button class="modal-footer-button button-deny" @click="denyDeletion">Deny Deletion</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-header h3{
    text-align: center;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-footer{
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.modal-footer-button{
    border: 1px;
    border-radius: 10px;
    padding: 10px;
    color: white;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.button-confirm{
    background-color: #FF473D;
}

.button-deny{
    background-color: #00A1D6;
}



.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>