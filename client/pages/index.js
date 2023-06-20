// api
import { useGetMovies } from "apis/movies";
// auth
import { Protected } from "auth";
// layout
import MainLayout from "layouts/main";
// component
import CustomCarousel from "components/carousel";

function Home() {
  const { loading, data } = useGetMovies({ search: "", page: 0, limit: 5 });
  return (
    <div className="container max-w-[900px]">
      {/* carousel */}
      <CustomCarousel loading={loading} slides={data?.movies?.docs} />
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
