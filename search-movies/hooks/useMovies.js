import { fetchMovies } from '../services/movies'
import { useState, useRef, useCallback, useMemo } from 'react'

export const useMovies = ({ search, sort }) => {
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

  // const getSortedMovies = () => {
  //   const sortedMovies = sort
  //     ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
  //     : movies

  //   return sortedMovies
  // }

  // return { movies: getSortedMovies(movies), getMovies, loading }

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading }
}
