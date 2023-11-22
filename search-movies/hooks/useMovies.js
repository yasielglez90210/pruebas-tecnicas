import { fetchMovies } from '../services/movies'
import { useState, useRef, useCallback } from 'react'

export const useMovies = ({ search }) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search }) => {
    if (previousSearch.current === search) return

    try {
      setLoading(true)
      const newMovies = await fetchMovies({ search })
      previousSearch.current = search
      setMovies(newMovies)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return { movies, getMovies, loading }
}
