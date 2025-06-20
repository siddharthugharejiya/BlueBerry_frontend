
import 'animate.css';
import 'swiper/css';
import 'swiper/css/pagination';
import Nav from './Nav';
import "../index.css"
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Slider from "react-slick";
import SlickSliderComponent from './SlickSliderComponent';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cart_action, cart_get_Acation, Prodcuer_Filter_Action, Product, single_action } from '../Redux/action';
import { useLayoutEffect } from 'react';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { Chatbot } from './ChatBot';

function Home() {

  const dispatch = useDispatch()
  const [eye, seteye] = useState([])
  const [open, setopen] = useState(false)
  const [seconds, setSeconds] = useState(60)
  const [activeTab, setactiveTab] = useState("fruit")
  const [fashion, setfashion] = useState("Miria")
  const [quantity, setquantity] = useState({})
  const nav = useNavigate()
  useEffect(() => {
    const mainText = document.getElementById("mainText");
    const anim = document.querySelector("animateTransform");

    mainText.addEventListener("mouseenter", () => {
      anim.beginElement();
    });
  }, []);
  const formatTime = () => {
    // const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${secs}`;
  };
  useLayoutEffect(() => {
    setfashion("Maria")
  }, [])


  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };


  const settings3 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
        },
      }
    ],
  }




  //  card 


  const cartItems = useSelector(state => state.cart_get_items.cartItems);


  useEffect(() => {
    dispatch(cart_get_Acation());
  }, [dispatch]);


  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const qtyMap = {};
      cartItems.forEach((item) => {

        if (item.Product?._id && (quantity[item.Product._id] !== item.quantity)) {
          qtyMap[item.Product._id] = item.quantity;
        }
      });


      if (Object.keys(qtyMap).length > 0) {
        setquantity(prev => ({ ...prev, ...qtyMap }));
      }
    } else if (cartItems?.length === 0 && Object.keys(quantity).length > 0) {

      setquantity({});
    }
  }, [cartItems])

  const handleMinus = (productId) => {
    setquantity(prev => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0)
    }));
  };

  const handlePlus = (productId) => {
    setquantity(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };
  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const products = useSelector(state => state.Products?.data?.data ? state.Products.data.data : [])
  useEffect(() => {
    dispatch(Prodcuer_Filter_Action("fruit"))

  }, [products])
  const handleEye = (product) => {
    seteye(product)
    setopen(true)

  }
  const handleClose = () => {
    setopen(false)
  }

  const filtered = useSelector(state => state.Product_Filtered.data || [])
  const HandleCategoryes = (category) => {
    dispatch(Prodcuer_Filter_Action(category))
    setactiveTab(category)
  }

  useLayoutEffect(() => {
    dispatch(Product())
    dispatch(Prodcuer_Filter_Action("All"))
  }, [])


  const AddToCart = (cart) => {

    const q = quantity[cart._id] || 1;


    dispatch(Cart_action(cart, q))

  }
  const handleSinglePage = (id) => {
    // console.log(id);
    nav(`/single/${id}`)
    dispatch(single_action(id))

  }

  return (
    <>
      <Nav />
      <Chatbot />

      {/* slider */}
      <div className='h-[150vh]  2xl:h-screen  xl:h-screen lg:h-screen sm:h-screen '>
        <Swiper
          spaceBetween={50}
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          // pagination={{ clickable: true, bulletClass: "swiper-pagination-bullet swiper-container ", }}


          loop={true} autoplay={{ delay: 7000 }}
          style={{ height: "100%", width: "100%" }}
        >
          <SwiperSlide>
            <div className="h-full w-full bg-[#F8F8FB] relative overflow-hidden">
              <div className="grid grid-col sm:grid-cols-2 h-full w-full">
                <div className=" h-full w-full ">
                  <div className="flex text-qu flex-col justify-center h-full sm:ms-28 ms-2 mb-2">
                    <span
                      className="text-xl text-[#777] mb-4 ms-1 animate__animated animate__fadeInUp"
                      style={{ animationDelay: "0.3s", animationDuration: "0.8s" }}
                    >
                      Flat 30% off
                    </span>

                    <div
                      className="p-0 m-0 2xl:text-7xl md:text-3xl sm:text-xl text-4xl mb-5 text-[#3d4750] font-semibold animate__animated animate__fadeInUp"
                      style={{ animationDelay: "0.9s", animationDuration: "0.8s" }}
                    >
                      Explore
                      <div className="relative inline-block text-[#6c7fd8]">
                        Warm
                        <img
                          src="./shape.png"
                          alt="shape"
                          className="absolute w-9 h-9 md:w-8 md:h-8 sm:w-8 sm:h-8 sm:-top-5 sm:-right-5 -top-6 -right-6"
                        />
                      </div>
                      <br />

                      & Fresh Fruits
                    </div>

                    <div
                      className="animate__animated animate__fadeInUp"
                      style={{ animationDelay: "1.5s", animationDuration: "0.8s" }}
                    >
                      <button className="mt-2 px-6 py-3 border border-black hover:bg-[#6c7fd8] hover:text-white transition duration-500 rounded-xl w-fit">
                        Shop Now
                      </button>

                    </div>

                  </div>
                </div>


                <div className="flex items-center justify-center h-full w-full relative ">
                  <img src="./hero-1.png" alt="Hero" className="
                animate__animated
                animate__fadeInUp
                drop-shadow-3xl
                2xl:max-w-[70%] xl:max-w-[70%] 
                lg:max-w-[70%] md:max-w-[66%] 
                sm:max-w-[66%] max-w-[65%] 
                object-cover
                 min-w-[45%] max-h-[70%]
                  z-30" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 300 300"
                    className="animate-shape 
                    animate__animated
                animate__fadeInRight
                  w-[120%] absolute sm:top-[100px] xl:top-[-20px] lg:top-[-20px] md:top-[40px] top-[10px] right-[-50px] max-[1399px]:right-[-30px] max-[1199px]:w-[125%] max-[991px]:w-[100%] max-[991px]:top-[0px] max-[575px]:right-[0] max-[420px]:w-[110%] max-[420px]:right-[-30px]"
                  >
                    <linearGradient id="shape_1" x1="100%" x2="0%" y1="100%" y2="0%" />
                    <path fill="white">
                      <animate
                        repeatCount="indefinite"
                        attributeName="d"
                        dur="15s"
                        values="
                  M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45 
                  c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2 
                  c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7 
                  c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z;

                  M51,171.3c-6.1-17.7-15.3-17.2-20.7-32c-8-21.9,0.7-54.6,20.7-67.1c19.5-12.3,32.8,5.5,67.7-3.4
                  C145.2,62,145,49.9,173,43.4 c12-2.8,41.4-9.6,60.2,6.6c19,16.4,16.7,47.5,16,57.7c-1.7,22.8-10.3,25.5-9.4,46.4c1,22.5,11.2,25.8,9.1,42.6 
                  c-2.2,17.6-16.3,37.5-33.5,40.8c-22,4.1-29.4-22.4-54.9-22.6c-31-0.2-40.8,39-68.3,35.7c-17.3-2-32.2-19.8-37.3-34.8 
                  C48.9,198.6,57.8,191,51,171.3z;

                  M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45 
                  c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2 
                  c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7 
                  c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z"
                      />
                    </path>
                  </svg>
                </div>
              </div>

            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full w-full bg-[#F8F8FB] relative overflow-hidden">
              <div className="grid grid-col sm:grid-cols-2 h-full w-full">
                <div className=" h-full w-full ">
                  <div className="flex text-qu flex-col justify-center h-full sm:ms-28 ms-2 mb-2">
                    <span
                      className="text-xl text-[#777] mb-4 ms-1 animate__animated animate__fadeInUp"
                      style={{ animationDelay: "0.3s", animationDuration: "0.8s" }}
                    >
                      Flat 30% off
                    </span>

                    <div
                      className="p-0 m-0 2xl:text-7xl md:text-3xl sm:text-xl text-4xl mb-5 text-[#3d4750] font-semibold animate__animated animate__fadeInUp"
                      style={{ animationDelay: "0.9s", animationDuration: "0.8s" }}
                    >
                      Explore
                      <div className="relative inline-block text-[#6c7fd8]">
                        Warm
                        <img
                          src="./shape.png"
                          alt="shape"
                          className="absolute w-9 h-9 md:w-8 md:h-8 sm:w-8 sm:h-8 sm:-top-5 sm:-right-5 -top-6 -right-6"
                        />
                      </div>
                      <br />

                      & Fresh Fruits
                    </div>

                    <div
                      className="animate__animated animate__fadeInUp"
                      style={{ animationDelay: "1.5s", animationDuration: "0.8s" }}
                    >
                      <button className="mt-2 px-6 py-3 border border-black hover:bg-[#6c7fd8] hover:text-white transition duration-500 rounded-xl w-fit">
                        Shop Now
                      </button>

                    </div>

                  </div>
                </div>


                <div className="flex items-center justify-center h-full w-full relative ">
                  <img src="./hero-2.png" alt="Hero" className="
                animate__animated
                animate__fadeInUp
                drop-shadow-3xl
                2xl:max-w-[70%] xl:max-w-[70%] 
                lg:max-w-[70%] md:max-w-[66%] 
                sm:max-w-[66%] max-w-[65%] 
                object-cover
                 min-w-[45%] max-h-[70%]
                  z-30" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 300 300"
                    className="animate-shape 
                    animate__animated
                animate__fadeInRight
                  w-[120%] absolute sm:top-[95px] xl:top-[-20px] lg:top-[-20px] md:top-[40px] top-[10px] right-[-50px] max-[1399px]:right-[-30px] max-[1199px]:w-[125%] max-[991px]:w-[100%] max-[991px]:top-[0px] max-[575px]:right-[0] max-[420px]:w-[110%] max-[420px]:right-[-30px]"
                  >
                    <linearGradient id="shape_1" x1="100%" x2="0%" y1="100%" y2="0%" />
                    <path fill="white">
                      <animate
                        repeatCount="indefinite"
                        attributeName="d"
                        dur="15s"
                        values="
                  M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45 
                  c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2 
                  c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7 
                  c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z;

                  M51,171.3c-6.1-17.7-15.3-17.2-20.7-32c-8-21.9,0.7-54.6,20.7-67.1c19.5-12.3,32.8,5.5,67.7-3.4
                  C145.2,62,145,49.9,173,43.4 c12-2.8,41.4-9.6,60.2,6.6c19,16.4,16.7,47.5,16,57.7c-1.7,22.8-10.3,25.5-9.4,46.4c1,22.5,11.2,25.8,9.1,42.6 
                  c-2.2,17.6-16.3,37.5-33.5,40.8c-22,4.1-29.4-22.4-54.9-22.6c-31-0.2-40.8,39-68.3,35.7c-17.3-2-32.2-19.8-37.3-34.8 
                  C48.9,198.6,57.8,191,51,171.3z;

                  M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45 
                  c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2 
                  c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7 
                  c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z"
                      />
                    </path>
                  </svg>
                </div>
              </div>

            </div>

          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full w-full bg-[#F8F8FB] relative overflow-hidden">
              <div className="grid grid-col sm:grid-cols-2 h-full w-full">
                <div className=" h-full w-full ">
                  <div className="flex text-qu flex-col justify-center h-full sm:ms-28 ms-2 mb-2">
                    <span
                      className="text-xl text-[#777] mb-4 ms-1 animate__animated animate__fadeInUp"
                      style={{ animationDelay: "0.3s", animationDuration: "0.8s" }}
                    >
                      Flat 30% off
                    </span>

                    <div
                      className="p-0 m-0 2xl:text-7xl md:text-3xl sm:text-xl text-4xl mb-5 text-[#3d4750] font-semibold animate__animated animate__fadeInUp"
                      style={{ animationDelay: "0.9s", animationDuration: "0.8s" }}
                    >
                      Explore
                      <div className="relative inline-block text-[#6c7fd8]">
                        Organic
                        <img
                          src="./shape.png"
                          alt="shape"
                          className="absolute w-9 h-9 md:w-8 md:h-8 sm:w-8 sm:h-8 sm:-top-5 sm:-right-5 -top-6 -right-6"
                        />
                      </div>
                      <br />

                      & Fresh Fruits
                    </div>

                    <div
                      className="animate__animated animate__fadeInUp"
                      style={{ animationDelay: "1.5s", animationDuration: "0.8s" }}
                    >
                      <button className="mt-2 px-6 py-3 border border-black hover:bg-[#6c7fd8] hover:text-white transition duration-500 rounded-xl w-fit">
                        Shop Now
                      </button>

                    </div>

                  </div>
                </div>


                <div className="flex items-center justify-center h-full w-full relative ">
                  <img src="./hero-3.png" alt="Hero" className="
                animate__animated
                animate__fadeInUp
                drop-shadow-3xl
                2xl:max-w-[70%] xl:max-w-[70%] 
                lg:max-w-[70%] md:max-w-[66%] 
                sm:max-w-[66%] max-w-[65%] 
                object-cover
                 min-w-[45%] max-h-[70%]
                  z-30" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 300 300"
                    className="animate-shape 
                    animate__animated
                animate__fadeInRight
                  w-[120%] absolute sm:top-[95px] xl:top-[-20px] lg:top-[-20px] md:top-[40px] top-[10px] right-[-50px] max-[1399px]:right-[-30px] max-[1199px]:w-[125%] max-[991px]:w-[100%] max-[991px]:top-[0px] max-[575px]:right-[0] max-[420px]:w-[110%] max-[420px]:right-[-30px]"
                  >
                    <linearGradient id="shape_1" x1="100%" x2="0%" y1="100%" y2="0%" />
                    <path fill="white">
                      <animate
                        repeatCount="indefinite"
                        attributeName="d"
                        dur="15s"
                        values="
                  M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45 
                  c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2 
                  c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7 
                  c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z;

                  M51,171.3c-6.1-17.7-15.3-17.2-20.7-32c-8-21.9,0.7-54.6,20.7-67.1c19.5-12.3,32.8,5.5,67.7-3.4
                  C145.2,62,145,49.9,173,43.4 c12-2.8,41.4-9.6,60.2,6.6c19,16.4,16.7,47.5,16,57.7c-1.7,22.8-10.3,25.5-9.4,46.4c1,22.5,11.2,25.8,9.1,42.6 
                  c-2.2,17.6-16.3,37.5-33.5,40.8c-22,4.1-29.4-22.4-54.9-22.6c-31-0.2-40.8,39-68.3,35.7c-17.3-2-32.2-19.8-37.3-34.8 
                  C48.9,198.6,57.8,191,51,171.3z;

                  M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45 
                  c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2 
                  c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7 
                  c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z"
                      />
                    </path>
                  </svg>
                </div>
              </div>

            </div>


          </SwiperSlide>
        </Swiper >
      </div>

      <div className='grid  2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 2xl:h-[125vh] xl:h-[152vh] lg:h-[166vh] md:h-auto sm:h-[160vh] h-[110vh] relative overflow-hidden my-3'
      >
        <div className=' min-h-[76%] 2xl:h-[80%] xl:h-[80%] lg:h-[96%] h-full w-full rounded-xl lg:flex justify-center items-center relative  hidden'>
          <div className='h-auto 2xl:h-[76%] xl:h-[100%] lg:h-[65%] relative w-full' data-aos="fade-right">
            {/* Main Image Container - maintains responsive behavior */}
            <div className='relative w-full h-full'>
              {/* Main Image */}
              <img
                src="./category.jpg"
                alt=""
                className='w-full h-full rounded-3xl img-clip object-cover'
              />

              {/* Top Right Shape - moves with main image */}
              <div className='
      absolute 
      right-0 
      2xl:top-[75%] xl:top-[69%] lg:top-[58%] top-[65%]
      2xl:right-[-1px] xl:right-[-1px]
    '>
                <img
                  src="./top-shape.png"
                  className='h-auto max-w-full'
                  alt=""
                  style={{ transform: 'translateX(1px)' }}
                />
              </div>

              {/* Bottom Center Shape - moves with main image */}
              <div className='
      absolute 
      bottom-0 
      2xl:right-[45%] xl:right-[45%] lg:right-[235px] md:right-[54px] sm:right-[69px]
    '>
                <img
                  src="./top-shape.png"
                  className='h-auto max-w-full'
                  alt=""
                />
              </div>

              {/* Discount Badge - fixed position relative to main image */}
              <span className='p-1 px-4 bg-[rgba(0,0,0,0.86)] rounded-full text-white opacity-80 absolute top-5 right-5'>
                50% off
              </span>
            </div>
          </div>
        </div>

        <div className='h-screen sm:h-[160vh] w-full' >
          <div className='sm:h-[55%] h-[2s5%] flex justify-center items-center' data-aos="fade-left">
            <svg width="100%" height="100%" viewBox="0 0 800 200" className="w-full group lg:h-[165vh] md:h-screen sm:h-[70vh] h-[66vh] ">
              <defs>
                <linearGradient id="light-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="50%" stopColor="white" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>

                <mask id="light-mask">
                  <rect x="0" y="0" width="800" height="200" fill="url(#light-gradient)">
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      from="-800 0"
                      to="800 0"
                      dur="2s"
                      repeatCount="1"
                      fill="freeze"
                      begin="indefinite"
                    />
                  </rect>
                </mask>
              </defs>

              <text
                textAnchor="middle"
                x="50%"
                y="80"
                className="fill-white xl:text-[123px] md:text-[130px] text-[140px] sm:text-[140px] stroke-black stroke-[1px] font-bold transition-all duration-500"
                fontFamily="Arial"
                // style={{ fontSize: "140px" }}
                id="mainText"
              >
                <tspan x="30%" dy="40">Explore</tspan>
                <tspan x="46%" dy="130">Categories</tspan>
              </text>


              <text
                textAnchor="middle"
                x="50%"
                y="80"
                className="xl:text-[140px] md:text-[140px] sm:text-[140px] font-bold pointer-events-none"
                fontFamily="Arial"
                fill="white"
                mask="url(#light-mask)"
              >
                <tspan x="30%" dy="40">Explore</tspan>
                <tspan x="46%" dy="130">Categories</tspan>
              </text>
            </svg>
          </div>
          <div>


            <div className='absolute 
          xl:left-[27%] 
          xl:w-[72%]
          lg:left-[27%] 
          lg:w-[78%]
          md:left-[0%] 
          md:w-[99%]
          sm:left-[4%] left-[0%] 
          sm:w-full
          mt-7
          w-[99%]'>

              <SlickSliderComponent />
            </div>
          </div>
        </div>
      </div>

      <div className=" h-auto w-auto" >
        <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 grid-cols-2 ">
          <div data-aos="fade-right" >
            <b className='font-bold text-2xl'>Day of the <span className='text-them'> Deal </span> </b>
            <p className='text-text'>Don't wait. The time will never be just right.</p>
          </div>
          <div className='flex justify-end items-center me-1' data-aos="fade-left">
            <div className=' bg-[#F8F8FB] p-3 rounded-xl font-bold'>
              695
              <span className='text-text px-2' >
                Days
              </span>
              18:
              {formatTime()}
            </div>
          </div>
        </div>
        {
          products.length === 0 ? ("Product Not Found") :
            <>
              <div className='mt-5 overflow-hidden'>
                <Slider {...settings1}>
                  {products.map((el) => (
                    <div key={el.id} className="px-4" data-aos={el % 3 === 0 ? "fade-right" : el % 3 === 1 ? "fade-left" : "zoom-in"}>
                      <div className="relative group card w-full h-full flex flex-col justify-between rounded-2xl overflow-hidden shadow-md border hover:shadow-lg transition-all duration-300">
                        <div className="h-[240px] w-full relative overflow-hidden">
                          <span className="absolute z-10 top-3 left-2 group-hover:hidden" style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>
                            {el.tag}
                          </span>


                          <div className="relative h-full w-full overflow-hidden group">
                            {/* Front Image */}
                            <img
                              src={el.image[0]}
                              alt={el.name}
                              className="absolute z-10 h-full w-full object-cover transform transition-all duration-700 group-hover:-translate-x-full"
                            />

                            {/* Back Image */}
                            <img
                              src={el.image[1]}
                              alt={`${el.name} back`}
                              className="absolute z-0 h-full w-full object-cover transform translate-x-full scale-100 transition-all duration-700 group-hover:translate-x-0 group-hover:scale-110"
                            />

                            {/* Optional: Glass Shine Effect */}
                            <div className="absolute z-20 top-0 left-[-75%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 transition-all duration-700 group-hover:left-[100%] pointer-events-none" />
                          </div>



                          <div className="hidden group-hover:block absolute bottom-0 right-[4rem]">
                            <i className="fa-regular  fa-heart p-2 text-[#777] rounded-lg shadow-md border bg-white hover:bg-[#6c7fd8] hover:border-[#6c7fd8] m-1 hover:text-white"></i>
                            <i
                              className="bg-white text-[#777] hover:bg-[#6c7fd8] hover:border-[#6c7fd8] fa-regular fa-eye p-2 rounded-lg shadow-md border m-1 hover:text-white"
                              onClick={() => handleEye(el)}
                            ></i>
                            <i className="bg-white text-[#777] fa-solid fa-recycle p-2 rounded-lg shadow-md border hover:border-[#6c7fd8] hover:bg-[#6c7fd8] hover:text-white m-1"></i>
                            <i className="bg-white text-[#777] fa-solid fa-bag-shopping p-2 rounded-lg shadow-md border hover:bg-[#6c7fd8] hover:border-[#6c7fd8] m-1 hover:text-white"></i>
                          </div>
                        </div>

                        <div className="p-4 flex flex-col gap-2" onClick={() => handleSinglePage(el._id)}>
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold truncate">{el.name}</h3>
                            <div className="text-yellow-500 text-sm">
                              {'★'.repeat(Math.floor(el.rating || 0))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">{el.des}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-gray-800 font-bold">
                              ${el.price}
                              {el.strike && (
                                <span className="text-sm text-gray-400 ms-2 line-through">
                                  ${el.strike}
                                </span>
                              )}
                            </span>
                            <span className="text-sm text-gray-500">{el.weight}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>



            </>
        }

        <div className='grid 2xl:grid-cols-2 xl:grid-cols-2 h-auto justify-center items-start w-ful gap-5 mt-4'>
          <div className='h-full w-full flex justify-center' data-aos="fade-right">
            <div className="2xl:w-[85%] xl:w-[85%] w-full  relative grid grid-cols-1 md:grid-cols-2 group justify-center items-center bg-[#F4DAB4] rounded-2xl overflow-hidden">
              <div className='absolute top-0 left-1/2 -translate-x-[40%] h-full w-[60%] bg-[#FBF2E5] transform skew-x-[-30deg] z-0 transition-all duration-500 ease-in-out group-hover:w-[70%]'></div>
              <div className="relative z-10 flex justify-end items-start p-6">
                <img src="./one.png" alt="" className='h-[280px] w-[280px] object-cover' />
              </div>
              <div className='relative z-10 p-8 px-[56px]'>
                <h1 className='text-[25px] font-bold'>Tasty Snack & Fast Food</h1>
                <p className='text-text'>The flavour of something special</p>
                <button className="text-text mt-2 px-6 py-3 border border-black hover:bg-[#6c7fd8] hover:border-[#6c7fd8] hover:text-white transition duration-500 rounded-xl w-fit">
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          <div className='h-full w-full flex justify-center' data-aos="fade-left">
            <div className="2xl:w-[85%] xl:w-[85%] w-full relative grid grid-cols-1 md:grid-cols-2 group justify-center items-center bg-[#FFC6CE] rounded-2xl overflow-hidden">
              <div className='absolute top-0 left-1/2 -translate-x-[40%] h-full w-[60%] bg-[#FBF2E5] transform skew-x-[-30deg] z-0 transition-all duration-500 ease-in-out group-hover:w-[70%]'></div>
              <div className="relative z-10 flex justify-end items-start sm:p-6 p-6">
                <img src="./two.png" alt="" className='h-[280px] w-[280px] object-cover' />
              </div>


              <div className='relative z-10 p-8 px-[56px]'>
                <h1 className='text-[25px] font-bold'>Fresh Fruits & Vegetables</h1>
                <p className='text-text'>The flavour of something special</p>
                <button className="text-text mt-2 px-6 py-3 border border-black hover:bg-[#6c7fd8] hover:border-[#6c7fd8] hover:text-white transition duration-500 rounded-xl w-fit">
                  Shop Now
                </button>
              </div>
            </div>


          </div>

        </div >

      </div >
      {
        open &&
        <>
          <>
            <div className="fixed inset-0 bg-black opacity-40 z-50"></div>
            <div className="transition-all duration-700 fixed top-0 left-0 h-screen w-full z-50 flex justify-center items-center overflow-auto p-4 animate-fade-in">
              <div className="grid sm:grid-cols-2 grid-cols-1 bg-white rounded-xl shadow-2xl overflow-auto w-full max-w-4xl max-h-[95vh] relative ">
                <div className='absolute right-5 top-0 overflow-hidden p-4'>

                  <button className='text-[20px] hover:animate-ping mt-0' onClick={handleClose}>x</button>
                </div>

                <div className="h-full w-full flex justify-center items-center bg-gray-50 p-4">
                  <div className="h-64 w-64 sm:h-4/5 sm:w-4/5 group ">
                    <img
                      src={eye.image[0]}
                      alt={eye.name}
                      className="h-full w-full object-contain rounded-lg group-hover:hidden"
                    />
                    <img
                      src={eye.image[1]}
                      alt={eye.name}
                      className="h-full w-full object-contain rounded-lg hidden group-hover:block"
                    />
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between max-h-[95vh]">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">{eye.des}</h1>
                    <div className="text-yellow-500 text-lg mb-2">
                      {'★'.repeat(Math.floor(eye.rating || 0))}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1900s,
                    </p>
                  </div>

                  <div>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-800 font-bold text-xl">
                        ${eye.price}
                        <strike className="text-sm text-gray-400 ml-2">${eye.strike}</strike>
                      </span>
                      <span className="text-sm text-gray-500">{eye.weight}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">

                      {['250g', '500g', '1kg', '2kg'].map((size) => (
                        <button
                          key={size}
                          className="p-2 border hover:text-white rounded-lg hover:bg-[#6c7fd8] transition duration-500"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <div className='grid grid-cols-1 2xl:grid-cols-[auto_auto] mt-2 justify-start items-center gap-4'>
                      <div className='p-2 border w-fit h-auto flex justify-evenly rounded-lg items-center  '>
                        <span className='cursor-pointer px-2' onClick={() => handleMinus(eye._id)} >-</span>
                        <span>{quantity[eye._id] || 0}</span>
                        <span className='cursor-pointer px-2' onClick={() => handlePlus(eye._id)}>+</span>
                      </div>
                      <button className='p-2 border rounded-lg hover:bg-[#6c7fd8] hover:text-white duration-500' onClick={() => AddToCart(eye)}>
                        <i className="fa-solid fa-bag-shopping px-2 t"  ></i>
                        Add To Cart
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </>

        </>

      }


      {/* background image */}

      <div className="overflow-hidden h-screen sm:h-[90vh] bg-[url('/banner.jpg')] bg-center bg-no-repeat bg-cover mt-4 relative" data-aos="zoom-in">
        <div className="absolute bottom-0 right-4 sm:right-10 md:right-20 lg:right-28 xl:right-40 2xl:right-60 w-[90%] sm:w-[370px]">
          <div className="bg-white p-5 rounded-t-3xl relative h-[245px] ">
            <h1 className="text-[#6c7fd8] font-bold text-xl">25% Off</h1>
            <p className="text-2xl sm:text-3xl font-semibold">Fresh & Organic vegetables</p>
            <button className="mt-4 px-6 py-3 border border-black hover:bg-[#6c7fd8] hover:border-[#6c7fd8] hover:text-white transition duration-500 rounded-xl w-fit">
              Shop Now
            </button>
            <img src="/left-shape.png" alt="Left Decoration" className="absolute bottom-0 left-[-35px] lg:left-[-38px] md:left-[-38px] sm:left-[-29px] w-[40px] " />
            <img src="/right-shape.png" alt="Right Decoration" className="absolute bottom-0 right-[-35px]  lg:right-[-38px] md:right-[-38px] sm:right-[-29px] w-[40px] " />
          </div>
        </div>
      </div>
      {/* background image */}

      <div className='h-auto sm:p-9 p-0 mt-5 overflow-hidden'>
        <div className="grid 2xl:grid-cols-2 gap-4 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1  grid-cols-1  ">
          <div className='md:text-start  text-center' data-aos="fade-right">
            <b className='font-bold text-2xl'>New <span className='text-them'> Arrivals </span> </b>
            <p className='text-text'>Shop online for new arrivals and get free shipping!</p>
          </div>
          <div className='flex md:justify-end justify-center items-center me-1 text-center' data-aos="fade-left">
            <div>
              <button className={`px-3 text-xl relative ${activeTab === "All" && "text-them"}`} onClick={() => HandleCategoryes("All")}>All <span className=' absolute top-[8px] right-0 h-[13px] border-r-2 border-[rgb(108_127_216)] transform skew-x-[-22deg]'></span></button>
              <button className={`px-3 text-xl relative ${activeTab === "snack" && "text-them"}`} onClick={() => HandleCategoryes("snack")}>Snack & Spices <span className=' absolute top-[8px] right-0 h-[13px] border-r-2 border-[rgb(108_127_216)] transform skew-x-[-22deg]'></span></button>
              <button className={`px-3 text-xl relative ${activeTab === "fruit" && "text-them"}`} onClick={() => HandleCategoryes("fruit")}>Fruits <span className=' absolute top-[8px] right-0 h-[13px] border-r-2 border-[rgb(108_127_216)] transform skew-x-[-22deg]'></span></button>
              <button className={`px-3 text-xl relative ${activeTab === "vegetable" && "text-them"}`} onClick={() => HandleCategoryes("vegetable")}>Vegetables </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          {/* All Products Tab */}
          {activeTab === "All" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" data-aos="zoom-in">
              {filtered.map((el) => (
                <div key={el.id} className="px-2">
                  <div className="relative group card w-full h-full flex flex-col justify-between rounded-2xl overflow-hidden shadow-md border hover:shadow-lg transition-all duration-300">
                    <div className="h-[240px] w-full relative overflow-hidden">
                      <span className="absolute z-10 top-3 left-2 group-hover:hidden" style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>
                        {el.tag}
                      </span>


                      <div className="relative h-full w-full overflow-hidden group">
                        {/* Front Image */}
                        <img
                          src={el.image[0]}
                          alt={el.name}
                          className="absolute z-10 h-full w-full object-cover transform transition-all duration-700 group-hover:-translate-x-full"
                        />

                        {/* Back Image */}
                        <img
                          src={el.image[1]}
                          alt={`${el.name} back`}
                          className="absolute z-0 h-full w-full object-cover transform translate-x-full scale-100 transition-all duration-700 group-hover:translate-x-0 group-hover:scale-110"
                        />

                        {/* Optional: Glass Shine Effect */}
                        <div className="absolute z-20 top-0 left-[-75%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 transition-all duration-700 group-hover:left-[100%] pointer-events-none" />
                      </div>



                      <div className="hidden group-hover:block absolute bottom-0 right-[4rem]">
                        <i className="fa-regular  fa-heart p-2 text-[#777] rounded-lg shadow-md border bg-white hover:bg-[#6c7fd8] hover:border-[#6c7fd8] m-1 hover:text-white"></i>
                        <i
                          className="bg-white text-[#777] hover:bg-[#6c7fd8] hover:border-[#6c7fd8] fa-regular fa-eye p-2 rounded-lg shadow-md border m-1 hover:text-white"
                          onClick={() => handleEye(el)}
                        ></i>
                        <i className="bg-white text-[#777] fa-solid fa-recycle p-2 rounded-lg shadow-md border hover:border-[#6c7fd8] hover:bg-[#6c7fd8] hover:text-white m-1"></i>
                        <i className="bg-white text-[#777] fa-solid fa-bag-shopping p-2 rounded-lg shadow-md border hover:bg-[#6c7fd8] hover:border-[#6c7fd8] m-1 hover:text-white"></i>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col gap-2" onClick={() => handleSinglePage(el._id)}>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold truncate">{el.name}</h3>
                        <div className="text-yellow-500 text-sm">
                          {'★'.repeat(Math.floor(el.rating || 0))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{el.des}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-800 font-bold">
                          ${el.price}
                          {el.strike && (
                            <span className="text-sm text-gray-400 ms-2 line-through">
                              ${el.strike}
                            </span>
                          )}
                        </span>
                        <span className="text-sm text-gray-500">{el.weight}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(activeTab === "snack" || activeTab === "fruit" || activeTab === "vegetable") && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" data-aos="zoom-in">
              {filtered.map((el) => (
                <div key={el.id} className="px-2">
                  <div className="relative group card w-full h-full flex flex-col justify-between rounded-2xl overflow-hidden shadow-md border hover:shadow-lg transition-all duration-300">
                    <div className="h-[240px] w-full relative overflow-hidden">
                      <span className="absolute z-10 top-3 left-2 group-hover:hidden" style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>
                        {el.tag}
                      </span>


                      <div className="relative h-full w-full overflow-hidden group">
                        {/* Front Image */}
                        <img
                          src={el.image[0]}
                          alt={el.name}
                          className="absolute z-10 h-full w-full object-cover transform transition-all duration-700 group-hover:-translate-x-full"
                        />

                        {/* Back Image */}
                        <img
                          src={el.image[1]}
                          alt={`${el.name} back`}
                          className="absolute z-0 h-full w-full object-cover transform translate-x-full scale-100 transition-all duration-700 group-hover:translate-x-0 group-hover:scale-110"
                        />

                        {/* Optional: Glass Shine Effect */}
                        <div className="absolute z-20 top-0 left-[-75%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 transition-all duration-700 group-hover:left-[100%] pointer-events-none" />
                      </div>



                      <div className="hidden group-hover:block absolute bottom-0 right-[4rem]">
                        <i className="fa-regular  fa-heart p-2 text-[#777] rounded-lg shadow-md border bg-white hover:bg-[#6c7fd8] hover:border-[#6c7fd8] m-1 hover:text-white"></i>
                        <i
                          className="bg-white text-[#777] hover:bg-[#6c7fd8] hover:border-[#6c7fd8] fa-regular fa-eye p-2 rounded-lg shadow-md border m-1 hover:text-white"
                          onClick={() => handleEye(el)}
                        ></i>
                        <i className="bg-white text-[#777] fa-solid fa-recycle p-2 rounded-lg shadow-md border hover:border-[#6c7fd8] hover:bg-[#6c7fd8] hover:text-white m-1"></i>
                        <i className="bg-white text-[#777] fa-solid fa-bag-shopping p-2 rounded-lg shadow-md border hover:bg-[#6c7fd8] hover:border-[#6c7fd8] m-1 hover:text-white"></i>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col gap-2" onClick={() => handleSinglePage(el._id)}>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold truncate">{el.name}</h3>
                        <div className="text-yellow-500 text-sm">
                          {'★'.repeat(Math.floor(el.rating || 0))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{el.des}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-800 font-bold">
                          ${el.price}
                          {el.strike && (
                            <span className="text-sm text-gray-400 ms-2 line-through">
                              ${el.strike}
                            </span>
                          )}
                        </span>
                        <span className="text-sm text-gray-500">{el.weight}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="text-center py-16" data-aos="zoom-in">
              <div className="text-gray-300 text-5xl mb-4">
                <i className="fa-solid fa-box-open"></i>
              </div>
              <h3 className="text-xl font-medium text-gray-500">No products found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your filters or search</p>
            </div>
          )}
        </div>

      </div>


      <div className="px-4 sm:px-8 py-10  overflow-hidden">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="bg-white border rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow" data-aos="fade-right">
            <img src="./1.png" alt="Free Shipping" className="w-12 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Free Shipping</h2>
            <p className="text-gray-600 text-sm">Free shipping on all US orders above $200</p>
          </div>

          <div className="bg-white border rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow" data-aos="fade-top">
            <img src="./2.png" alt="24x7 Support" className="w-12 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">24x7 Support</h2>
            <p className="text-gray-600 text-sm">Contact us 24 hours a day, 7 days a week</p>
          </div>

          <div className="bg-white border rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow" data-aos="fade-top">
            <img src="./3.png" alt="30 Days Return" className="w-12 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">30 Days Return</h2>
            <p className="text-gray-600 text-sm">Simply return it within 30 days for an exchange</p>
          </div>

          <div className="bg-white border rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow" data-aos="fade-left">
            <img src="./4.png" alt="Payment Secure" className="w-12 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Payment Secure</h2>
            <p className="text-gray-600 text-sm">Your payment information is processed securely</p>
          </div>

        </div>
      </div>

      <div className="py-10">
        <div className="text-center px-4 py-6" data-aos="fade-top">
          <b className="text-3xl">
            Top <span className="text-them font-bold">Vendors</span>
          </b>
          <p className="text-text max-w-[26rem] mx-auto mt-2">
            Discover Our Trusted Partners: Excellence & Reliability in Every choice
          </p>
        </div>
        <div className="grid xl:grid-cols-2 gap-5 justify-center">
          <div className='flex xl:justify-end justify-center items-center xl:me-10 me-0'>
            {
              fashion === "Mira" &&
              <div className='relative' data-aos="fade-right">
                <img src="./newsletter.jpg" alt="" className='w-[33rem] rounded-2xl ' />
                <i className="fa-solid fa-arrow-up-right-from-square absolute top-5 hover:bg-[#000000cc] transition-all duration-200 text-white right-6 bg-[#00000080] p-2 rounded-lg"></i>
                <div className='bg-white relative w-full h-250px rounded-3xl z-auto'>
                  <img src="./vendor-1.jpg" alt="" className='rounded-tl-lg   absolute bottom-0 right-0 w-[6rem] z-auto' />
                  <img src="./left-shape.png" alt="" className='absolute top-[-125px] right-0 ' />
                  <img src="./left-shape.png" alt="" className='absolute top-[-30px] right-[95px]' />
                </div>
              </div>
            }
            {
              fashion === "Eelna" &&
              <div className='relative cursor-pointer' data-aos="fade-right">
                <img src="./img-2.jpg" alt="" className='w-[33rem] rounded-2xl ' />
                <i className="fa-solid fa-arrow-up-right-from-square absolute top-5 hover:bg-[#000000cc] transition-all duration-200 text-white right-6 bg-[#00000080] p-2 rounded-lg"></i>
                <div className='bg-white relative w-full h-250px rounded-3xl z-auto'>
                  <img src="./vendor-1.jpg" alt="" className='rounded-tl-lg   absolute bottom-0 right-0 w-[6rem] z-auto' />
                  <img src="./left-shape.png" alt="" className='absolute top-[-125px] right-0 ' />
                  <img src="./left-shape.png" alt="" className='absolute top-[-30px] right-[95px]' />
                </div>
              </div>
            }

            {
              fashion === "Mario" &&
              <div className='relative cursor-pointer' data-aos="fade-right">
                <img src="./img-3.jpg" alt="" className='w-[33rem] rounded-2xl ' />
                <i className="fa-solid fa-arrow-up-right-from-square absolute top-5 hover:bg-[#000000cc] transition-all duration-200 text-white right-6 bg-[#00000080] p-2 rounded-lg"></i>
                <div className='bg-white relative w-full h-250px rounded-3xl z-auto'>
                  <img src="./vendor-3.jpg" alt="" className='rounded-tl-lg   absolute bottom-0 right-0 w-[6rem] z-auto' />
                  <img src="./left-shape.png" alt="" className='absolute top-[-125px] right-0 ' />
                  <img src="./left-shape.png" alt="" className='absolute top-[-30px] right-[95px]' />
                </div>
              </div>
            }

            {
              fashion === "Maria" &&
              <div className='relative cursor-pointer' data-aos="fade-right">
                <img src="./img-4.jpg" alt="" className='w-[33rem] rounded-2xl ' />
                <i className="fa-solid fa-arrow-up-right-from-square absolute top-5 hover:bg-[#000000cc] transition-all duration-200 text-white right-6 bg-[#00000080] p-2 rounded-lg"></i>
                <div className='bg-white relative w-full h-250px rounded-3xl z-auto'>
                  <img src="./vendor-4.jpg" alt="" className='rounded-tl-lg   absolute bottom-0 right-0 w-[6rem] z-auto' />
                  <img src="./left-shape.png" alt="" className='absolute top-[-125px] right-0 ' />
                  <img src="./left-shape.png" alt="" className='absolute top-[-30px] right-[95px]' />
                </div>
              </div>
            }
          </div>
          <div>
            <div className=' flex flex-col md:justify-grid xl:grid-cols-2 gap-5' data-aos="fade-left">
              <div className={`p-6 max-w-[40rem] bg-[#f8f8fb] rounded-2xl border ${fashion === "Mira" ? 'border-1 border-them shadow-md' : ""}  `} onClick={() => setfashion("Mira")}>
                <div className="flex  justify-between items-center flex-wrap text-center">
                  <h1 className='text-them font-semibold text-xl'>Mira Fashion Pvt. Ltd.</h1>
                  <span className='text-text'>Sales - 587</span>
                </div>
                <div className='text-text mt-1'>Fruits (5) | Vegetables (30) | Snacks (09) </div>
              </div>

              <div className={`p-6 max-w-[40rem] bg-[#f8f8fb] rounded-2xl border ${fashion === "Eelna" ? 'border-1 border-them shadow-md' : ""}  `} onClick={() => setfashion("Eelna")}>
                <div className="flex  justify-between items-center flex-wrap text-center">
                  <h1 className='text-them font-semibold text-xl'>Eelna Fashion Pvt. Ltd.</h1>
                  <span className='text-text'>Sales - 1024</span>
                </div>
                <div className='text-text mt-1'>Fruits (8) | Vegetables (15) | Snacks (04)  </div>
              </div>

              <div className={`p-6 max-w-[40rem] bg-[#f8f8fb] rounded-2xl border ${fashion === "Mario" ? 'border-1 border-them shadow-md' : ""}  `} onClick={() => setfashion("Mario")}>
                <div className="flex  justify-between items-center flex-wrap text-center">
                  <h1 className='text-them font-semibold text-xl'>Mario Fashion Pvt. Ltd.</h1>
                  <span className='text-text'>Sales - 1024</span>
                </div>
                <div className='text-text mt-1'>Fruits (8) | Vegetables (15) | Snacks (04)  </div>
              </div>

              <div className={`p-6 max-w-[40rem] bg-[#f8f8fb] rounded-2xl border ${fashion === "Maria" ? 'border-1 border-them shadow-md' : ""}  `} onClick={() => setfashion("Maria")}>
                <div className="flex  justify-between items-center flex-wrap text-center">
                  <h1 className='text-them font-semibold text-xl'>Maria Fashion Pvt. Ltd.</h1>
                  <span className='text-text'>Sales - 999</span>
                </div>
                <div className='text-text mt-1'>Fruits (8) | Vegetables (15) | Snacks (04)  </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      <div className='min-h-[65vh] max-h-[130vh]  h-auto w-full flex justify-center items-center overflow-hidden ' data-aos="zoom-in">
        <div className='w-full max-w-6xl px-4 relative'>
          <img
            src="./img-1.png"
            alt=""
            className='rounded-xl size-16 absolute md:visible invisible -top-20 left-10 rotate-[-12deg]'
          />
          <img
            src="./img-2.png"
            alt=""
            className='rounded-xl size-16 absolute md:visible invisible bottom-10 right-10 rotate-[12deg] blur-[2px]'
          />

          <img
            src="./img-3.png"
            alt=""
            className='rounded-xl size-16 absolute md:visible invisible top-0 right-10 rotate-[12deg] '
          />

          <img
            src="./img-4.png"
            alt=""
            className='rounded-xl size-16 absolute md:visible invisible bottom-0 -left-20 rotate-[12deg] '
          />

          <img
            src="./img-5.png"
            alt=""
            className='rounded-xl size-16 absolute md:visible invisible top-10 -left-20 rotate-[12deg] blur-[2px] '
          />

          <img
            src="./img-6.png"
            alt=""
            className='rounded-xl size-16 absolute md:visible invisible -top-10 right-96 rotate-[12deg] blur-[2px] '
          />
          <h4 class="outlined-text md:visible invisible opacity-30 absolute -rotate-90 lg:left-[-6rem] md:left-[-4rem] -left-16 top-32 text-[42px] font-bold leading-[1.2] tracking-[0.03rem] max-[1399px]:text-[38px] max-[1199px]:text-[34px]">
            Testimonials
          </h4>


          <Slider {...settings2} >
            <div className="flex justify-center items-center w-full flex-wrap ">
              <div className="card grid md:grid-cols-2 grid-cols-1 gap-5 lg:w-[68%] w-full ">
                <div className="flex md:justify-end justify-center items-start">
                  <img src="./1.jpg" alt="" className="h-[290px] rounded-3xl" />
                </div>
                <div className="flex flex-col justify-end md:items-start text-center">
                  <h1 className="font-bold">Isabella Oliver</h1>
                  <p className="text-text mb-3">(Team Leader)</p>
                  <p className="rounded-2xl border p-4">
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
                    at sint eligendi possimus perspiciatis asperiores reiciendis hic
                    amet alias aut quaerat maiores blanditiis."
                  </p>
                </div>
              </div>
            </div>


            <div className="flex justify-center items-center w-full flex-wrap ">
              <div className="card grid md:grid-cols-2 grid-cols-1 gap-5 lg:w-[68%] w-full ">
                <div className="flex md:justify-end justify-center items-start">
                  <img src="./2.jpg" alt="" className="h-[290px] rounded-3xl" />
                </div>
                <div className="flex flex-col justify-end md:items-start text-center">
                  <h1 className="font-bold">Isabella Oliver</h1>
                  <p className="text-text mb-3">(Team Leader)</p>
                  <p className="rounded-2xl border p-4">
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
                    at sint eligendi possimus perspiciatis asperiores reiciendis hic
                    amet alias aut quaerat maiores blanditiis."
                  </p>
                </div>
              </div>
            </div>


            <div className="flex justify-center items-center w-full flex-wrap ">
              <div className="card grid md:grid-cols-2 grid-cols-1 gap-5 lg:w-[68%] w-full ">
                <div className="flex md:justify-end justify-center items-start">
                  <img src="./1.jpg" alt="" className="h-[290px] rounded-3xl" />
                </div>
                <div className="flex flex-col justify-end md:items-start text-center">
                  <h1 className="font-bold">Isabella Oliver</h1>
                  <p className="text-text mb-3">(Team Leader)</p>
                  <p className="rounded-2xl border p-4">
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
                    at sint eligendi possimus perspiciatis asperiores reiciendis hic
                    amet alias aut quaerat maiores blanditiis."
                  </p>
                </div>
              </div>
            </div>


            <div className="flex justify-center items-center w-full flex-wrap ">
              <div className="card grid md:grid-cols-2 grid-cols-1 gap-5 lg:w-[68%] w-full ">
                <div className="flex md:justify-end justify-center items-start">
                  <img src="./slider-img-1.jpg" alt="" className="h-[290px] rounded-3xl" />
                </div>
                <div className="flex flex-col justify-end md:items-start text-center">
                  <h1 className="font-bold">Isabella Oliver</h1>
                  <p className="text-text mb-3">(Team Leader)</p>
                  <p className="rounded-2xl border p-4">
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
                    at sint eligendi possimus perspiciatis asperiores reiciendis hic
                    amet alias aut quaerat maiores blanditiis."
                  </p>
                </div>
              </div>
            </div>

          </Slider>
        </div>
      </div>



      <div className="min-h-[50vh] m-auto h-auto py-1 " data-aos="zoom-in">
        <Slider {...settings3} className='m-auto overflow-hidden '>
          <div className='flex justify-center items-center gap-8' style={{ display: "flex" }}>
            <div className='flex xl:justify-center lg:justify-center  justify-center items-center gap-3 mx-1'>
              <div className="card w-[20rem] group rounded-2xl relative overflow-hidden duration-1000 transition">
                <img src="./7.jpg" alt="image" className='transition  duration-500  h-full w-full rounded-2xl group-hover:rotate-6 group-hover:scale-[1.1]' />
                <div className="body bg-[#ffffffe6] opacity-95 absolute bottom-2 group-hover:bg-white   left-3 w-[90%] text-start px-4 py-2 rounded-2xl">
                  <h4 className='text-text text-[15px]'>June 30,2024 - organic</h4>
                  <p className='text-[18px] font-medium'>Marketing Guide: 5 Steps to Success.</p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex justify-center items-center' style={{ display: "flex" }}>
            <div className='flex xl:justify-center lg:justify-center  justify-center items-center gap-3 mx-1'>
              <div className="card w-[20rem] group rounded-2xl relative overflow-hidden duration-1000 transition">
                <img src="./8 (1).jpg" alt="image" className='transition  duration-500  h-full w-full rounded-2xl group-hover:rotate-6 group-hover:scale-[1.1]' />
                <div className="body bg-[#ffffffe6] opacity-95 absolute bottom-2 group-hover:bg-white   left-3 w-[90%] text-start px-4 py-2 rounded-2xl">
                  <h4 className='text-text text-[15px]'>June 30,2024 - organic</h4>
                  <p className='text-[18px] font-medium'>Best way to solve business deal issue.</p>
                </div>
              </div>
            </div>
          </div>



          <div className='flex justify-center items-center' style={{ display: "flex" }}>
            <div className='flex xl:justify-center lg:justify-center  justify-center items-center gap-3 mx-1' >
              <div className="card w-[20rem] group rounded-2xl relative overflow-hidden duration-1000 transition">
                <img src="./9 (1).jpg" alt="image" className='transition  duration-500  h-full w-full rounded-2xl group-hover:rotate-6 group-hover:scale-[1.1]' />
                <div className="body bg-[#ffffffe6] opacity-95 absolute bottom-2 group-hover:bg-white   left-3 w-[90%] text-start px-4 py-2 rounded-2xl">
                  <h4 className='text-text text-[15px]'>June 30,2024 - organic</h4>
                  <p className='text-[18px] font-medium'>Best way to solve business deal issue.</p>
                </div>
              </div>
            </div>
          </div>



          <div className='flex justify-center items-center' style={{ display: "flex" }}>
            <div className='flex xl:justify-center lg:justify-center  justify-center items-center gap-3 mx-1'>
              <div className="card w-[20rem] group rounded-2xl relative overflow-hidden duration-1000 transition">
                <img src="./10 (1).jpg" alt="image" className='transition  duration-500  h-full w-full rounded-2xl group-hover:rotate-6 group-hover:scale-[1.1]' />
                <div className="body bg-[#ffffffe6] opacity-95 absolute bottom-2 group-hover:bg-white   left-3 w-[90%] text-start px-4 py-2 rounded-2xl">
                  <h4 className='text-text text-[15px]'>June 30,2024 - organic</h4>
                  <p className='text-[18px] font-medium'>Best way to solve business deal issue.</p>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>

      {/* insta */}
      <div className="grid 2xl:grid-cols-6 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-3 relative justify-items-center items-center">
        <div className="absolute top-14 lg:right-[42%] right-[45%] z-50 bg-white lg:block hidden py-4 px-12 rounded-3xl text-3xl font-bold" data-aos="zoom-in">#insta</div>
        <div className="w-[200px] rounded-2xl group relative overflow-hidden flex justify-center items-center" data-aos="fade-right">
          <img src="./1 (1).jpg" alt="" className="h-full w-full object-cover rounded-2xl" />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl"></div>
          <i className="fa-brands fa-instagram absolute text-white text-3xl opacity-0  group-hover:opacity-100 transform scale-[5.1] rotate-12 group-hover:scale-100 group-hover:rotate-0 transition-all duration-500"></i>
        </div>

        <div className="w-[200px] rounded-2xl group relative overflow-hidden flex justify-center items-center" data-aos="fade-top">
          <img src="./2 (1).jpg" alt="" className="h-full w-full object-cover rounded-2xl" />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl"></div>
          <i className="fa-brands fa-instagram absolute text-white text-3xl opacity-0  group-hover:opacity-100 transform scale-[5.1] rotate-12 group-hover:scale-100 group-hover:rotate-0 transition-all duration-500"></i>
        </div>

        <div className="w-[200px] rounded-2xl group relative overflow-hidden flex justify-center items-center" data-aos="fade-top">
          <img src="./5.jpg" alt="" className="h-full w-full object-cover rounded-2xl" />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl"></div>
          <i className="fa-brands fa-instagram absolute text-white text-3xl opacity-0  group-hover:opacity-100 transform scale-[5.1] rotate-12 group-hover:scale-100 group-hover:rotate-0 transition-all duration-500"></i>
        </div>

        <div className="w-[200px] rounded-2xl group relative overflow-hidden flex justify-center items-center" data-aos="fade-top">
          <img src="./4.jpg" alt="" className="h-full w-full object-cover rounded-2xl" />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl"></div>
          <i className="fa-brands fa-instagram absolute text-white text-3xl opacity-0  group-hover:opacity-100 transform scale-[5.1] rotate-12 group-hover:scale-100 group-hover:rotate-0 transition-all duration-500"></i>
        </div>


        <div className="w-[200px] rounded-2xl group relative overflow-hidden flex justify-center items-center" data-aos="fade-top">
          <img src="./5.jpg" alt="" className="h-full w-full object-cover rounded-2xl" />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl"></div>
          <i className="fa-brands fa-instagram absolute text-white text-3xl opacity-0  group-hover:opacity-100 transform scale-[5.1] rotate-12 group-hover:scale-100 group-hover:rotate-0 transition-all duration-500"></i>
        </div>


        <div className="w-[200px] rounded-2xl group relative overflow-hidden flex justify-center items-center" data-aos="fade-left">
          <img src="./2 (1).jpg" alt="" className="h-full w-full object-cover rounded-2xl" />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl"></div>
          <i className="fa-brands fa-instagram absolute text-white text-3xl opacity-0  group-hover:opacity-100 transform scale-[5.1] rotate-12 group-hover:scale-100 group-hover:rotate-0 transition-all duration-500"></i>
        </div>
      </div>
      {/* insta */}

      <Footer />
    </>
  )
}

export default Home
