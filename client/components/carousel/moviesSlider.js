import Slider from "react-slick";
// component
import Card from "components/card";
import Caption from "components/caption";

export default function MoviesSlider({ loading, movies, title, className }) {
  const settings = {
    className: "movieSlider",
    dots: false,
    infinite: false,
    centerMode: false,
    swipeToSlide: true,
    currentSlide: 0,
    slidesToShow: 5.2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          slidesToShow: 4,
          autoplay: true,
          autoplaySpeed: 3000,
          pauseOnHover: true,
          currentSlide: 0,
          cssEase: "linear",
          rtl: false,
        },
      },
      {
        breakpoint: 750,
        settings: {
          arrows: false,
          slidesToShow: 3,
          autoplay: true,
          autoplaySpeed: 3000,
          pauseOnHover: true,
          currentSlide: 0,
          cssEase: "linear",
          rtl: false,
        },
      },
      {
        breakpoint: 550,
        settings: {
          arrows: false,
          slidesToShow: 2,
          autoplay: true,
          autoplaySpeed: 3000,
          pauseOnHover: true,
          currentSlide: 0,
          cssEase: "linear",
          rtl: false,
        },
      },
      {
        breakpoint: 380,
        settings: {
          arrows: false,
          slidesToShow: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          pauseOnHover: true,
          currentSlide: 0,
          cssEase: "linear",
          rtl: false,
        },
      },
    ],
  };

  return (
    <div className={`movie-slider-container my-10 text-white ${className}`}>
      <Caption title level={3}>
        {title}
      </Caption>
      <Slider {...settings}>
        {!loading &&
          movies &&
          movies.map((slide, key) => (
            <Card
              key={key}
              id={slide._id}
              title={slide.title}
              overView={slide.overview}
              genres={slide.genres}
              score={slide.averageRate}
              poster={slide.poster_path}
            />
          ))}
      </Slider>
    </div>
  );
}
