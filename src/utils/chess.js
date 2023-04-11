import { ref, reactive } from 'vue'
import { cloneDeep } from 'lodash'
import { isValidMove, countLiberties } from './chess-rule.js'

const charToNumber = (str) => {
  const arrOffset = 1
  return str.replace(/[a-zA-Z]/g, (match) => {
    const code = match.toLowerCase().charCodeAt(0)
    if (code >= 97 && code <= 122) {
      return code - 96 - arrOffset
    }
    return match
  })
}
const numberToChar = (num) => {
  const arrOffset = 1
  return String(num).replace(/[0-8]/g, (match) => {
    const code = match.charCodeAt(0)
    return String.fromCharCode(code + 96 - 48 + arrOffset)
  })
}
export const minigo = (() => {
  class Board {
    constructor(sgf = '') {
      this.gameInfo = ref({
        FF: '',
      })
      this.historyMoves = reactive([])
      this.historyBoard = []
      this.board = reactive(new Array(9).fill().map(() => new Array(9).fill(null)))
      this.sgf = ref(sgf)
      this.currPlayerColor = ref('')
      this.parseSGF(sgf)
    }
    getCurrPlayerColor() {
      this.currPlayerColor.value = this.historyMoves.length % 2 === 0 ? 'B' : 'W'
      return this.currPlayerColor.value
    }
    getPointColor({ x, y }) {
      return this.board[x][y]
    }
    isOccupied({ x, y }) {
      return this.board[x][y] !== null
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
      const gameInfoRegex = /(GM|SZ)\[(\d+)\]/g
      while ((match = gameInfoRegex.exec(sgf))) {
        this.gameInfo.value[match[1]] = match[2]
      }
      // Extract Game Move
      const moveRegex = /;(W|B)\[([a-z]{2})\]/g
      while ((match = moveRegex.exec(sgf))) {
        moves.push({
          color: match[1],
          x: charToNumber(match[2][0]),
          y: charToNumber(match[2][1]),
        })
      }
      moves.forEach((move) => this.putChess({ color: move.color, x: move.x, y: move.y, updateSGFFromMove: false }))
      return sgf
    }
    putChess({ color, x, y, updateSGFFromMove = true }) {
      this.historyBoard.push(cloneDeep(this.board))
      // todo: 驗證合法
      if (
        !isValidMove({
          historyBoard: this.historyBoard,
          color,
          x,
          y,
        })
      ) {
        return
      }
      // todo: 吃子判斷
      this.board[x][y] = color

      this.historyMoves.push({
        color,
        x,
        y,
      })
      this.updateBoard({ currColor: color })

      if (updateSGFFromMove) {
        this.updateSGFFromMove({ color, x, y })
      }
    }
    updateBoard({ currColor }) {
      const opponentColor = currColor === 'B' ? 'W' : 'B'
      const markedBoard = []
      this.board.forEach((row, x) => {
        row.forEach((color, y) => {
          if (color === opponentColor) {
            let visited = new Set()
            const liberties = countLiberties({
              visited,
              currColor: opponentColor,
              board: this.board,
              x,
              y,
            })
            if (liberties === 0) {
              markedBoard.push([x, y])
            }
          }
        })
      })
      markedBoard.forEach((point) => {
        this.board[point[0]][point[1]] = null
      })
    }
    updateSGFFromMove({ color, x, y }) {
      const newMove = `;${color}[${numberToChar(x)}${numberToChar(y)}]`
      this.sgf.value = this.sgf.value.replace(')', `${newMove})`)
    }
  }
  return {
    Board,
  }
})()
