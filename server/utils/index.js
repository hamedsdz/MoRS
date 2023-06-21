function calculateAverageRatings(ratings) {
  const movieRatings = {};

  ratings.forEach((rating) => {
    if (!movieRatings[rating.movieId]) {
      movieRatings[rating.movieId] = {
        totalRating: rating.rate,
        count: 1,
      };
    } else {
      movieRatings[rating.movieId].totalRating += rating.rate;
      movieRatings[rating.movieId].count++;
    }
  });

  const averageRatings = {};

  for (const movieId in movieRatings) {
    averageRatings[movieId] = movieRatings[movieId].totalRating / movieRatings[movieId].count;
  }

  return averageRatings;
}

function sortMoviesByRatings(averageRatings) {
  const sortedMovies = [];

  for (const movieId in averageRatings) {
    sortedMovies.push({ movieId, averageRating: averageRatings[movieId] });
  }

  sortedMovies.sort((a, b) => b.averageRating - a.averageRating);

  return sortedMovies;
}
