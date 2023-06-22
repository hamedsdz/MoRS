// api
import { useGetRecommendation } from "apis/movies";
// auth
import { Protected } from "auth";
// layout
import MainLayout from "layouts/main";
// component
import Card from "components/card";
import Caption from "components/caption";
import { EmptyResult } from "components/warnings";
import FullLoading from "components/loading";

function MovieRecommendation() {
  const { data, loading } = useGetRecommendation();
  return (
    <div className="container max-w-[900px] mb-5 recommendation">
      <Caption title level={4}>
        recommendation
      </Caption>
      <div className="text-white mt-6">
        {!loading ? (
          !!data?.length ? (
            <div className="movies-list gap-4">
              {data.map((movie) => (
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
    </div>
  );
}

MovieRecommendation.getLayout = function getLayout(page) {
  return (
    <Protected>
      <MainLayout>{page}</MainLayout>
    </Protected>
  );
};

export default MovieRecommendation;
