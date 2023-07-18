import { useRouter } from "next/router";
import getConfig from "next/config";
import { useEffect, useState, useRef } from "react";
// api
import { useGetSingleMovie, useRatingMovie } from "apis/movies";
// auth
import { Protected } from "auth";
// layout
import MainLayout from "layouts/main";
// component
import { InputNumber, Tag } from "antd";
import Caption from "components/caption";
import FullLoading from "components/loading";
import { CustomCarouselImage } from "components/image";
import { CustomPosterImage } from "components/image";
import CustomButton from "components/button";
import Link from "next/link";

const { publicRuntimeConfig } = getConfig();

function Movie() {
  const router = useRouter();
  const rateRef = useRef();
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
        <div className="relative container max-w-[900px] flex flex-col items-center gap-4 my-5 mx-auto">
          <div className="fixed top-0 right-0 opacity-40 md:opacity-80">
            <CustomCarouselImage
              src={publicRuntimeConfig.backdropUrl + data.movie.backdrop_image_path}
              fill
              className="relative object-cover w-screen h-screen"
              alt={data.movie.title}
            />
          </div>
          <div className="relative flex flex-col md:flex-row items-center gap-6 h-full w-full z-10 md:backdrop-blur md:bg-white/25 md:px-6 md:pt-6 md:rounded-lg">
            <div className="w-4/6 md:w-2/6">
              <CustomPosterImage
                src={publicRuntimeConfig.posterUrl + data.movie.poster_path}
                alt={data.movie.title}
                fill={true}
                className="relative object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-2 mb-0 w-4/6 details">
              <span className="flex items-center gap-2">
                <span className="title">
                  <Caption text>{"title"}</Caption>
                </span>
                <Caption text doTranslate={false}>
                  {data.movie.title}
                </Caption>
              </span>
              <span className="flex items-center gap-2">
                <span className="title">
                  <Caption text>{"genres"}</Caption>
                </span>
                <div>
                  {data.movie.genres && data.movie.genres.length
                    ? data.movie.genres.map((genre, key) => (
                        <Link href={`/movies?genre=${genre}`} key={key}>
                          <Tag color="#2db7f5" className="text-[.5rem]">
                            {genre}
                          </Tag>
                        </Link>
                      ))
                    : null}
                </div>
              </span>
              <span className="flex items-center gap-2">
                <span className="title">
                  <Caption text>{"productionCountries"}</Caption>
                </span>
                <div>
                  {data.movie.production_countries && data.movie.production_countries.length
                    ? data.movie.production_countries.map((country, key) => (
                        <Link href={`/movies?country=${country}`} key={key}>
                          <Tag color="orange-inverse" className="text-[.5rem]">
                            {country}
                          </Tag>
                        </Link>
                      ))
                    : null}
                </div>
              </span>
              <span>
                <span className="title">
                  <Caption text>{"descriptions"}</Caption>
                </span>
                <Caption paragraph doTranslate={false}>
                  {data.movie.overview}
                </Caption>
              </span>
              <div className="flex gap-4 items-center scoring z-10">
                <Caption text bold>
                  yourScore
                </Caption>
                {rateLoading ? (
                  <FullLoading />
                ) : (
                  <>
                    <InputNumber
                      ref={rateRef}
                      min="0"
                      max="10"
                      step="0.1"
                      onChange={(value) => !!value && setRate(value)}
                      value={rate ?? 0}
                      stringMode
                    />
                    {rate && rate != data?.userRate ? (
                      <CustomButton
                        loading={rateLoading}
                        onClick={() => mutate({ movieId: id, rate: rate })}
                      >
                        submitRate
                      </CustomButton>
                    ) : null}
                  </>
                )}
              </div>
            </div>
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
