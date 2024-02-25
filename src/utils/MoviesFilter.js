
function MoviesFilter(movies, values,  setMovieEmpty) {

  const filteredMoviesRU =
    movies
      .filter(function(movie){
        if(values.shortmovie) {
          return movie.nameRU.toLowerCase().includes(values.movie.toLowerCase()) &&
          movie.duration <=40
        }
        else {
          return  movie.nameRU.toLowerCase().includes(values.movie.toLowerCase())
        }
      });

  const filteredMoviesEN =
    movies
      .filter(function(movie){
        if(values.shortmovie) {
          return movie.nameEN.toLowerCase().includes(values.movie.toLowerCase()) &&
          movie.duration <=40
        }
        return  movie.nameEN.toLowerCase().includes(values.movie.toLowerCase())
      });

  const filteredMovies = [... new Set([...filteredMoviesRU, ...filteredMoviesEN])];
  if(filteredMovies.length === 0) {
    setMovieEmpty(true);
  }

  return filteredMovies
};

export default MoviesFilter