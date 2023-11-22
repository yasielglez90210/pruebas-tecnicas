function ListOfMovies({ movies }) {
  return movies?.map(({ id, title, year, poster }) => {
    if (poster === 'N/A') return

    return (
      <div className="movie" key={id}>
        <h4>{title}</h4>
        <p>{year}</p>
        <img src={poster} alt={`Poster de la película con ID: ${id}`} />
      </div>
    )
  })
}

function NoMoviesResults() {
  return <p>No se encontraron películas para esta búsqueda</p>
}

export const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />
}
