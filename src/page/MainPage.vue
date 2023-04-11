<template>
  <div class="fixed z-0 top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
    <BaseBoard :sgfInfo="sgfinfo" @updateSGF="(val) => (currSGF = val)" />
    <div class="mt-10">
      <input v-model="inputSGF" class="border border-black py-2 px-4" placeholder="paste SGF here" />
      <button
        @click="handleOnLoadSGF"
        class="
          w-40
          ml-4
          border
          bg-black
          text-white
          px-4
          py-2
          hover:bg-white hover:text-black hover:border hover:border-black
          transition
        "
      >
        從 SGF 載入棋局
      </button>
    </div>
    <div class="mt-10">
      <input v-model="outputSGF" class="border border-black py-2 px-4" placeholder="paste SGF here" />
      <button
        @click="handleOnSaveSGF"
        class="
          w-40
          ml-4
          border
          bg-black
          text-white
          px-4
          py-2
          hover:bg-white hover:text-black hover:border hover:border-black
          transition
        "
      >
        輸出 SGF 檔案
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const sgfinfo = ref(`(;GM[1]SZ[9])`)
const inputSGF = ref('')
const outputSGF = ref('')
const currSGF = ref('')
const handleOnLoadSGF = () => {
  sgfinfo.value = inputSGF.value
  inputSGF.value = ''
}
const handleOnSaveSGF = () => {
  outputSGF.value = currSGF.value
}
</script>
