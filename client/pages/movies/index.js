import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// api
import { useGetMovies } from "apis/movies";
// auth
import { Protected } from "auth";
// layout
import MainLayout from "layouts/main";
// component
import { Pagination, Card as AntCard } from "antd";
import Card from "components/card";
import Caption from "components/caption";
import { EmptyResult } from "components/warnings";
import { GenresSelect, CountriesSelect } from "components/select";
import FullLoading from "components/loading";

function Movies() {
  const router = useRouter();
  const [genre, setGenre] = useState([]);
  const [country, setCountry] = useState([]);
  const [page, setPage] = useState(1);
  const { data, loading } = useGetMovies({ page, limit: 15, genre, country });

  useEffect(() => {
    if (router.query?.genre) {
      setGenre(router.query.genre);
    }
    if (router.query?.country) {
      setCountry(router.query.country);
    }
  }, [router.query]);
  return (
    <div className="container max-w-[900px] mb-5">
      <AntCard className="mb-5 rounded-xl">
        <Caption text bold>
          filters
        </Caption>
        <div className="mt-2 flex flex-wrap gap-3">
          <GenresSelect className="w-[10rem]" value={genre} onChange={(value) => setGenre(value)} />
          <CountriesSelect
            className="w-[13rem]"
            value={country}
            onChange={(value) => setCountry(value)}
          />
        </div>
      </AntCard>
      <div className="text-white">
        {!loading ? (
          data.docs?.length ? (
            <div className="movies-list gap-4">
              {data.docs.map((movie) => (
                <Card
                  key={movie._id}
                  id={movie._id}
                  title={movie.title}
                  overView={movie.overview}
                  genres={movie.genres}
                  score={movie.averageRate}
                  poster={movie.poster_path}
                  className="mx-auto"
                />
              ))}
            </div>
          ) : (
            <div className="py-20">
              <EmptyResult />
            </div>
          )
        ) : (
          <FullLoading />
        )}
      </div>
      {data !== null && (
        <Pagination
          className="mt-6 text-left"
          defaultPageSize={1}
          defaultCurrent={data.page}
          total={data.totalPages}
          onChange={(page) => setPage(page)}
        />
      )}
    </div>
  );
}

Movies.getLayout = function getLayout(page) {
  return (
    <Protected>
      <MainLayout>{page}</MainLayout>
    </Protected>
  );
};

export default Movies;
