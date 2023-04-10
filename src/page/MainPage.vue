<!-- todo: SGF 載入/輸出 -->
<template>
  <div class="fixed z-0 top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
    <BaseBoard />
    <div class="mt-10">
      <input class="border border-black py-2 px-4" placeholder="SGF here" />
      <button
        class="
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
      <button
        class="
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
<script setup></script>
