import { ref } from 'vue'

export const minigo = (() => {
  class Board {
    constructor(sgf = '') {
      this.gameInfo = ref({
        FF: '',
      })
      this.moves = ref([])
      this.chessOnBoard = ref([])
      this.sgf = ref(sgf)
      this.currPlayerColor = ref('')
      this.parseSGF(sgf)
    }
    getCurrPlayerColor() {
      this.currPlayerColor.value = this.moves.value.length % 2 === 0 ? 'B' : 'W'
      return this.currPlayerColor.value
    }
    getPointColor(point) {
      return this.chessOnBoard.value.filter((info) => info.move === `${point.x}${point.y}`)[0].color
    }
    isOccupied(point) {
      return this.chessOnBoard.value.filter((info) => info.move === `${point.x}${point.y}`).length
    }
    createNewBoard() {
      this.sgf.value = '(;SZ[9])'
    }
    getSGF() {
      return this.sgf.value
    }
    parseSGF(inputSGF) {
      if (!inputSGF) {
        this.sgf.value = '(;SZ[9])'
      }
      const sgf = inputSGF.replace(/\s+/g, '')
      const moves = []
      let match
      // Extract game info
      const gameInfoRegex = /(FF|GM|SZ)\[(\d+)\]/g
      while ((match = gameInfoRegex.exec(sgf))) {
        this.gameInfo.value[match[1]] = match[2]
      }
      // Extract Game Move
      const moveRegex = /;(W|B)\[([a-z]{2})\]/g
      while ((match = moveRegex.exec(sgf))) {
        moves.push({
          color: match[1],
          move: match[2],
        })
      }
      moves.forEach((move) => this.putChess(move.color, move.move))
      console.log('this.gameInfo', this.gameInfo)
      return sgf
    }
    putChess(color, move) {
      // todo: 驗證合法
      // todo: 吃子判斷
      this.chessOnBoard.value.push({
        color,
        move,
      })

      this.moves.value.push({
        color,
        move,
      })

      this.updateSGF(color, move)
    }
    updateSGF(color, move) {
      this.sgf.value = this.sgf.value.split(')').join(`;${color}[${move}]`)
    }
    undo() {
      // todo: SGF 移除最後一動
    }
  }
  return {
    Board,
  }
})()
