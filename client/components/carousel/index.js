import Caption from "components/caption";
import getConfig from "next/config";
import Image from "next/image";
// component
import Slider from "react-slick";

const { publicRuntimeConfig } = getConfig();

export default function CustomCarousel({ loading, slides }) {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    vertical: false,
    autoplay: true,
    autoplaySpeed: 6500,
    speed: 1300,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };
  return (
    <div className="md:block md:absolute top-0 right-0 w-[calc(100vw-3.5rem)] md:w-screen h-1/2 md:h-screen">
      <Slider {...settings}>
        {slides &&
          slides.map((slide, key) => (
            <div
              className="relative w-[calc(100vw-3.5rem)] md:w-screen h1/2 md:h-screen brightness-90"
              key={key}
            >
              <Image
                src={publicRuntimeConfig.backdropUrl + slide.backdrop_image_path}
                layout="fill"
                objectFit="cover"
                className="relative w-full h-full"
                loading="eager"
                alt={slide.title}
              />
              <div className="absolute bottom-4 right-4 backdrop-blur bg-white/25 px-4 rounded-lg w-[calc(100%-4rem)] md:w-1/3 hidden sm:block">
                <Caption title level={5} doTranslate={false}>
                  {slide.title}
                </Caption>
                <span className="w-full ">
                  <Caption
                    paragraph
                    doTranslate={false}
                    ellipsis={{
                      rows: 2,
                      expandable: true,
                      symbol: "more",
                    }}
                  >
                    {slide.overview}
                  </Caption>
                </span>
              </div>
              <div className="absolute bottom-4 right-4 backdrop-blur bg-white/25 px-4 rounded-lg w-[calc(100%-4rem)] md:w-1/3 text-right sm:hidden">
                <span>{slide.title}</span>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
