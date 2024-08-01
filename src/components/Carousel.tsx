
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "../utils/client";
import { urlForImage } from "../utils/image";
import { useState } from "react";
import Slider from "react-slick";
import LoadingSpinner from "./LoadingSpinner";


export const settings = {
  dots: true,
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "ease-in-out",
};
const Carousel = () => {
  const carouselImages = useQuery({
    queryKey: ["carouselImages"],
    queryFn: async () => {
      const res = await sanityClient.fetch(`
      *[_type == "homeImages" && type=="carouselImages"]{
      images,
      }
        `);
      return res;
    },
  });
  const [hovered, setHovered] = useState<boolean>(false);
  if(carouselImages.isLoading) return <LoadingSpinner/>
  console.log(carouselImages.data)
  return carouselImages.isSuccess && <div>
      <Slider {...settings}>
        {carouselImages.isSuccess &&
          carouselImages.data?.[0]?.images?.map(
            (imageObj: any, index: number) => (
              <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                key={index}
              >
                <div className="relative">
                <img
                  className="max-h-[88vh] w-full"
                  src={urlForImage(imageObj.image)}
                  alt={`Slide Image`}
                />
                <div
                  className={`p-2 absolute text-white text-xl tracking-wide flex gap-8 justify-center items-center inset-0 bg-black transition-opacity duration-1000 ${hovered ? "opacity-80" : "opacity-0"}`}
                >
                  {imageObj.description}
                </div>
                </div>
               
              </div>
            )
          )}
      </Slider>
    </div>
  
};

export default Carousel;
