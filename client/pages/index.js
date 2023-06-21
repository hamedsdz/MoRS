// api
import { useGetRandomMovies, useGetPopularMovies, useGetRecommendation } from "apis/movies";
// auth
import { Protected } from "auth";
// layout
import MainLayout from "layouts/main";
// component
import CustomCarousel from "components/carousel";
import MoviesSlider from "components/carousel/moviesSlider";

function Home() {
  const { loading, data } = useGetRandomMovies({ search: "", page: 0, limit: 5 });
  const { loading: popularLoading, data: PopularData } = useGetPopularMovies();
  const { loading: recommendationLoading, data: recommendationData } = useGetRecommendation();
  return (
    <div className="container max-w-[900px]">
      {/* carousel */}
      {data && !!data.length && <CustomCarousel loading={loading} slides={data} />}
      {PopularData && !!PopularData.length && (
        <MoviesSlider
          loading={popularLoading}
          movies={PopularData}
          title={"popular"}
          className="md:mt-[calc(100vh-3rem)]"
        />
      )}
      {recommendationData && !!recommendationData.length && (
        <MoviesSlider
          loading={recommendationLoading}
          movies={recommendationData}
          title={"recommendation"}
        />
      )}
    </div>
  );
}
Home.getLayout = function getLayout(page) {
  return (
    <Protected>
      <MainLayout>{page}</MainLayout>
    </Protected>
  );
};

export default Home;
