import { Square } from './Square'

export const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return null

  const winnerText = winner === false ? 'Empate' : 'Ganó'

  return (
    winner !== null && (
      <section className="winner">
        <div className="text">
          <h2>{winnerText}</h2>

          {winner !== false && (
            <header className="win">
              <Square>{winner}</Square>
            </header>
          )}

          <footer>
            <button onClick={resetGame}>Empezar de nuevo</button>
          </footer>
        </div>
      </section>
    )
  )
}
