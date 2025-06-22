
import Slider from "react-slick";

const SlickSliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [

      {
        breakpoint: 1224, // For screens with width <= 1024px
        settings: {
          slidesToShow: 3, // Show 2 slides
          slidesToScroll: 3, // Scroll 2 slides at a time
        },
      },
      {
        breakpoint: 1024, // For screens with width <= 1024px
        settings: {
          slidesToShow: 2, // Show 2 slides
          slidesToScroll: 2, // Scroll 2 slides at a time
        },
      },
      {
        breakpoint: 600, // For screens with width <= 600px
        settings: {
          slidesToShow: 2, // Show 1 slide
          slidesToScroll: 2, // Scroll 1 slide at a time
        },
      },
      {
        breakpoint: 480, // For screens with width <= 480px
        settings: {
          slidesToShow: 1, // Show 1 slide
          slidesToScroll: 1, // Scroll 1 slide at a time
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto sm:p-4 p-2 z-50 bg-white rounded-xl overflow-hidden">
      <Slider {...settings}>
        {/* Slide Item */}
        {[1, 2, 3, 4].map((num, index) => (
          <div key={index} className="px-2">
            <div className="flex justify-center items-center">
              <div
                className={`
    w-full 
    flex flex-col justify-center items-center 
    border rounded-2xl group 
    h-[140px] sm:h-[170px] md:h-[150px] lg:h-[200px] xl:h-[220px]
    ${index % 3 === 0
                    ? 'bg-[rgb(225,252,242)]'
                    : index % 3 === 1
                      ? 'bg-[rgb(244,241,254)]'
                      : 'bg-[rgb(251,249,228)]'}
  `}
              >

                <img
                  src={`./${num}.svg`}
                  alt={`Slide ${num}`}
                  className="w-[50%] h-[40%] sm:w-[60%] sm:h-[36%] object-contain group-hover:animate-bounce"
                />
                <div className="font-semibold text-sm sm:text-base md:text-lg">Vegetables</div>
                <span className="text-xs sm:text-sm text-gray-500">291 items</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>

  );
};

export default SlickSliderComponent;
