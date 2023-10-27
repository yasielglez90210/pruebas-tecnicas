import { WINNER_COMBINATIONS } from '../data/constanst'

export const checkWinner = (newBoard) => {
  for (const combination of WINNER_COMBINATIONS) {
    const [a, b, c] = combination
    if (
      newBoard[a] &&
      newBoard[a] === newBoard[b] &&
      newBoard[a] === newBoard[c]
    ) {
      return newBoard[a]
    }
  }
  return null
}

export const checkEndGame = (newBoard) => {
  // Si todas las casillas están ocupadas, es un empate
  return newBoard.every((square) => square !== null)
}
