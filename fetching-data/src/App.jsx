import './App.css'
import useGetInfo from './hooks/useGetInfo'

export default function App() {
  const { fact, cat, loading } = useGetInfo()

  return (
    <main>
      <h1>App de gaticos</h1>
      {loading ? <p>Cargando...</p> : <p>{fact}</p>}
      {cat && (
        <img
          width={250}
          src={cat}
          alt={`Image from https://cataas.com using the first word: ${fact}`}
        />
      )}
    </main>
  )
}
