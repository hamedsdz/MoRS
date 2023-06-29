import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// api
import { useGetSingleMovie, useRatingMovie } from "apis/movies";
// auth
import { Protected } from "auth";
// layout
import MainLayout from "layouts/main";
// component
import { InputNumber } from "antd";
import Caption from "components/caption";
import FullLoading from "components/loading";

function Movie() {
  const router = useRouter();
  const { id } = router.query;
  const { loading, data } = useGetSingleMovie(id);
  const { mutate, loading: rateLoading } = useRatingMovie({ key: "getSingleMovie", id });

  const [rate, setRate] = useState(undefined);

  useEffect(() => {
    if (data && data?.userRate) {
      setRate(data.userRate);
    }
  }, [data]);

  return (
    <>
      {!loading ? (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-6">
            <div>image</div>
            <div>details</div>
          </div>
          <div className="flex gap-4 items-center scoring">
            <Caption text bold>
              yourScore
            </Caption>
            {rateLoading ? (
              <FullLoading />
            ) : (
              <InputNumber
                min="0"
                max="10"
                step="0.1"
                onChange={(value) => !!value && mutate({ movieId: id, rate: value })}
                value={rate}
                stringMode
              />
            )}
          </div>
        </div>
      ) : (
        <FullLoading />
      )}
    </>
  );
}

Movie.getLayout = function getLayout(page) {
  return (
    <Protected>
      <MainLayout>{page}</MainLayout>
    </Protected>
  );
};

export default Movie;
