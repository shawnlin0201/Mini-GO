import { cloneDeep, isEqual } from 'lodash'

export const isKo = (currboard, historyBoard) => {
  return isEqual(currboard, historyBoard.at(-2))
}
export const countLiberties = ({
  visited,
  currColor,
  board,
  historyBoard,
  x,
  y,
  needCheckOpponentLiberties = false,
}) => {
  const currBoard = cloneDeep(board)
  let liberties = 0
  let checkQueue = [[x, y]]
  currBoard[x][y] = currColor

  while (checkQueue.length > 0) {
    const [x, y] = checkQueue.shift()
    if (visited.has(`${x}${y}`)) {
      continue
    }
    visited.add(`${x}${y}`)
    const dx = [-1, 0, 1, 0]
    const dy = [0, 1, 0, -1]
    for (let i = 0; i < dx.length; i++) {
      const nx = x + dx[i]
      const ny = y + dy[i]
      const isOutSide = nx < 0 || nx >= currBoard.length || ny < 0 || ny >= currBoard[0].length
      if (isOutSide) {
        continue
      }
      const hasNotChess = currBoard[nx][ny] === null
      const sameColor = currBoard[nx][ny] === currBoard[x][y]
      const noVisited = !visited.has(`${nx}${ny}`)

      if (hasNotChess) {
        liberties++
      } else if (sameColor && noVisited) {
        checkQueue.push([nx, ny])
      } else if (needCheckOpponentLiberties && !sameColor && noVisited) {
        checkQueue.push([nx, ny])
        const opponentColor = currColor === 'B' ? 'W' : 'B'
        const opponentLiberties = countLiberties({
          visited,
          currColor: opponentColor,
          historyBoard,
          board: currBoard,
          x: nx,
          y: ny,
        })
        if (opponentLiberties === 0) {
          return true
        }
      }
    }
  }
  return liberties
}
export const isValidMove = ({ historyBoard, color, x, y }) => {
  x = Number(x)
  y = Number(y)
  const currBoard = cloneDeep(historyBoard).at(-1)
  // 檢查落子是否在棋盤內
  if (x < 0 || x > 8 || y < 0 || y > 8) {
    return false
  }
  // 檢查落子當前位置是否為空
  if (currBoard[x][y] !== null) {
    return false
  }
  let visited = new Set()
  let liberties = countLiberties({
    historyBoard,
    visited,
    currColor: color,
    board: historyBoard.at(-1),
    x,
    y,
    needCheckOpponentLiberties: true,
  })

  return !!liberties
}
