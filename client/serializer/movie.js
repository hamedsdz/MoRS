export default function movieSerializer(data) {
  return {
    id: data.id,
    title: data.title,
    originalTitle: data.original_title,
    genres: data.genres,
    overview: data.overview,
    posterPath: data.poster_path,
    productionCountries: data.production_countries,
    releaseDate: data.release_date,
    status: data.status,
    backdropPath: data.backdrop_image_path,
  };
}
