
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useQuery } from '@tanstack/react-query';
import { sanityClient } from '../utils/client';
import { urlForImage } from '../utils/image';
import { useState } from 'react';

export const settings = {
 dots: true,
 infinite: true,
 speed: 2000,
 slidesToShow: 1,
 slidesToScroll: 1,
 autoplay: true,
 autoplaySpeed: 3000, 
 cssEase: 'ease-in-out' 
};
const AwardsCarousel = () => {
  const carouselImages = useQuery({
    queryKey: ['carouselImages'],
    queryFn: async () => {
      const res = await sanityClient.fetch(`
      *[_type == "carouselImage"]{
        image
        }
        `)
        return res
      }
  })
 const [hovered,setHovered] = useState<boolean>(false)
  return (
    <div>
      <Slider {...settings}>
        { carouselImages.isSuccess &&  carouselImages.data.map((obj:any, index:number) => (
          <div  onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)} key={index}>
            <img src={urlForImage(obj.image)} alt={`Slide ${index}`} />
            <div   className={`absolute flex flex-col gap-8 justify-center inset-0 bg-black transition-opacity duration-1000 ${hovered ? 'opacity-10' : 'opacity-0'}`}></div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AwardsCarousel;
