<template>
  <div class="relative rounded-lg bg-[#d7b072] w-100 h-100 inline-block text-sm">
    <!-- 棋盤樣式 -->
    <div class="absolute z-1 top-0 w-full flex justify-center px-6">
      <span class="inline-block w-full text-center h-8 leading-8" v-for="col in 9" :key="col">
        {{ XAxis[col - 1] }}
      </span>
    </div>
    <div class="absolute z-1 bottom-0 w-full flex justify-center px-6">
      <span class="inline-block w-full text-center h-8 leading-8" v-for="col in 9" :key="col">
        {{ XAxis[col - 1] }}
      </span>
    </div>
    <div class="absolute z-1 left-0 h-full flex flex-col-reverse justify-center py-6">
      <span class="inline-block text-center w-8 h-full leading-10" v-for="row in 9" :key="row">
        {{ row }}
      </span>
    </div>
    <div class="absolute z-1 right-0 h-full flex flex-col-reverse justify-center py-6">
      <span class="inline-block text-center w-8 h-full leading-10" v-for="row in 9" :key="row">
        {{ row }}
      </span>
    </div>
    <div class="absolute z-0 w-full h-full p-10 box-border">
      <table class="table border-collapse w-full h-full">
        <tr class="table-row" v-for="row in 8" :key="row">
          <td class="border border-black" v-for="col in 8" :key="col"></td>
        </tr>
      </table>
    </div>
    <!-- 格線系統：供點擊 -->
    <div class="relative z-2 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-90 h-90 bg-yellow">
      <div class="absolute z-1 grid grid-rows-9 grid-cols-9">
        <template v-for="row in 9">
          <div class="w-10 h-10 flex justify-center items-center" v-for="col in 9" :key="row + col">
            <BaseStone
              :class="board.getPointColor({ x: col - 1, y: row - 1 }) === 'B' ? 'bg-black' : 'bg-white'"
              v-if="board.isOccupied({ x: col - 1, y: row - 1 })"
            ></BaseStone>
            <BaseStone
              v-else
              @click="board.putChess({ color: board.getCurrPlayerColor(), x: col - 1, y: row - 1 })"
              :class="
                board.getCurrPlayerColor() === 'B'
                  ? 'hover:border-2 hover:border-black'
                  : 'hover:border-2 hover:border-white'
              "
            ></BaseStone>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { minigo } from '@/utils/chess'
// const sgfInfo = ref(`(;FF[4]GM[1]SZ[9];B[cd];W[dd];B[de];W[ef];B[dc])`)
const sgfInfo = ref(`(;GM[1]SZ[9];B[aa];W[bb];B[cd];W[dd];B[de];W[ef];B[dc];W[ff])`)
const board = new minigo.Board(sgfInfo.value)
const XAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
</script>
