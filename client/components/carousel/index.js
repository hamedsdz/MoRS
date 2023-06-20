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
    pauseOnHover: false,
    rtl: true,
  };
  return (
    <div className="hidden md:block absolute top-0 right-0 w-screen h-screen">
      <Slider {...settings}>
        {slides &&
          slides.map((slide) => (
            <div className="relative w-screen h-screen brightness-90">
              <Image
                src={publicRuntimeConfig.backdropUrl + slide.backdrop_image_path}
                layout="fill"
                objectFit="cover"
                className="relative w-full h-full"
                loading="eager"
                alt={slide.title}
              />
              <div className="absolute bottom-4 right-4 backdrop-blur bg-white/25 p-4 rounded-lg w-[calc(100%-4rem)] md:w-1/3">
                <Caption title level={4} doTranslate={false}>
                  {slide.title}
                </Caption>
                <Caption paragraph doTranslate={false}>
                  {slide.overview}
                </Caption>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
