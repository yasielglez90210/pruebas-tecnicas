import { useCallback } from 'react'
import './App.css'
import { useMovies } from '../hooks/useMovies'
import { Movies } from '../components/Movies'
import debounce from 'just-debounce-it'
import { useSearch } from '../hooks/useSearch'

function App() {
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search })

  const debounceGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search })
    }, 400),
    [getMovies]
  )

  const handleOnChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debounceGetMovies(newSearch)
  }

  const handleOnSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      getMovies({ search })
    },
    [search, getMovies]
  )

  return (
    <>
      <h1>Buscador de películas</h1>
      <form className="form" onSubmit={handleOnSubmit}>
        <input onChange={handleOnChange} value={search} name="search" />
        <button>Buscar</button>
      </form>
      {error && <p>{error}</p>}

      <div className="movies">
        {loading ? <p>Cargando...</p> : <Movies movies={movies} />}
      </div>
    </>
  )
}

export default App
