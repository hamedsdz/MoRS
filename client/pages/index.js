// auth
import { Protected } from "auth";
// layout
import MainLayout from "layouts/main";

function Home() {
  return <div>Hello From MoRS!</div>;
}
Home.getLayout = function getLayout(page) {
  return (
    <Protected>
      <MainLayout>{page}</MainLayout>
    </Protected>
  );
};

export default Home;
