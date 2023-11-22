import { useCallback, useState } from 'react'
import './App.css'
import { useMovies } from '../hooks/useMovies'
import { Movies } from '../components/Movies'
import debounce from 'just-debounce-it'
import { useSearch } from '../hooks/useSearch'

function App() {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

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

  const handleChangeSort = () => {
    setSort(!sort)
  }

  return (
    <>
      <h1>Buscador de películas</h1>
      <form className="form" onSubmit={handleOnSubmit}>
        <input
          type="text"
          onChange={handleOnChange}
          value={search}
          name="search"
        />
        <input type="checkbox" value={sort} onChange={handleChangeSort} />
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
