import { useEffect, useState } from 'react'
import './App.css'
import { Square } from './components/Square'
import confetti from 'canvas-confetti'
import { TURNS } from './data/constanst'
import { checkWinner, checkEndGame } from './utils/board'
import { WinnerModal } from './components/WinnerModal'
import { resetGameStorage, saveGameStorage } from './utils/storage'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    // Si tenemos un ganador o si el cuadrado ya está ocupado, no hacemos nada
    if (board[index] || winner) return

    // Actualizamos el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Actualizamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Salvamos partida
    saveGameStorage(newBoard, newTurn)

    // Comprobamos si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  return (
    <main className="board">
      <h1>Cross and Zero</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          )
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
    </main>
  )
}

export default App
