import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "../utils/client";
import LoadingSpinner from "../components/LoadingSpinner";
import { urlForImage } from "../utils/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "../components/Carousel";
import { useState } from "react";
import ClientCarousel from "../components/ClientCarousel";
import AwardsCarousel from "../components/AwardsCarousel";

export default function About() {
  const [, setHovered] = useState<boolean>(false);
  const aboutUsMainImagQuery = useQuery({
    queryKey: ["aboutUsMainImage"],
    queryFn: async () => {
      const res = await sanityClient.fetch(`
        *[_type == "aboutUsImages" && type == "mainImage"]{
          image
        }
        `);
      return res;
    },
  });
  const foundMembersImgQuery = useQuery({
    queryKey: ["aboutUsFoundingMembers"],
    queryFn: async () => {
      const res = await sanityClient.fetch(`
        *[_type == "aboutUsImages" && type == "foundingMemberImage"]{
          image
        }
        `);
      return res;
    },
  });
  const showOff = [
    { label: "200", value: "projects" },
    { label: "20", value: "years" },
    { label: "5", value: "awards" },
    { label: "30", value: "locations" },
  ];
  const teamCarouselImagesQuery = useQuery({
    queryKey: ["teamCarouselImages"],
    queryFn: async () => {
      const res = await sanityClient.fetch(`
        *[_type == "aboutUsCarouselImages" && type == "team"]{
          images
        }
        `);
      return res;
    },
  });
  const locations = [
    { title: "Delhi", address: "loreum ipsum blah blah blah" },
    { title: "Noida", address: "loreum ipsum blah blah blah" },
    { title: "Bhopal", address: "loreum ipsum blah blah blah" },
  ];
  if (
    aboutUsMainImagQuery.isLoading ||
    foundMembersImgQuery.isLoading ||
    teamCarouselImagesQuery.isLoading
  )
    return <LoadingSpinner />;

  return (
    <div className="py-2">
      <img
        src={urlForImage(aboutUsMainImagQuery?.data?.[0].image)}
        alt="about us main image"
        className="h-[90vh] w-full"
      />
      <div className="p-16 mt-16 ">
        <div className="grid grid-cols-2 gap-8 self-center">
          {showOff.map((item, index) => (
            <div key={index} className="flex h-[12rem] rounded-lg gap-16 ">
              <div className="w-2 blue-gradient h-[8rem]"></div>
              <div>
                <h1 className="text-[3rem] blue-gradient-text font-bold">
                  {item.label} +
                </h1>
                <p className="text-xl uppercase tracking-widest">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-8 mt-32">
          <div className="flex gap-8">
            <div className="w-2 blue-gradient h-[5rem]"></div>
            <span className="text-[3rem] blue-gradient-text tracking-widest">
              Founding Members
            </span>
          </div>
          <div className="grid grid-cols-2 gap-16">
            {foundMembersImgQuery?.data?.map((image: any, index: number) => (
              <img
                key={index}
                src={urlForImage(image.image)}
                alt="founding member"
                className="]"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-8 mt-32">
          <div className="flex gap-8">
            <div className="w-2 blue-gradient h-[5rem]"></div>
            <span className="text-[3rem] blue-gradient-text tracking-widest">
              Team
            </span>
          </div>
          <Slider {...settings}>
            {teamCarouselImagesQuery?.data?.[0]?.images?.map(
              (imageObj: any, index: number) => (
                <div
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  key={index}
                >
                  <img
                    className="h-[45rem] w-full"
                    src={urlForImage(imageObj.image)}
                    alt={`Slide ${index}`}
                  />
                  
                </div>
              )
            )}
          </Slider>
        </div>
        <div className="flex flex-col mt-40 gap-16">
          <div className="flex gap-8">
            <div className="w-2 blue-gradient h-[5rem]"></div>
            <span className="text-[3rem] blue-gradient-text tracking-widest">
              Locations
            </span>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {locations.map((location, i) => (
              <div key={i} className="flex gap-16 ">
                <div className="rounded-full w-1 bg-blue-600"></div>
                <div className="flex flex-col gap-4">
                  <span className="text-[2rem] blue-gradient-text tracking-widest">
                    {location.title}
                  </span>
                <p className="text-sm">{location.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-40 gap-16">
        <div className="flex gap-8">
            <div className="w-2 blue-gradient h-[5rem]"></div>
            <span className="text-[3rem] blue-gradient-text tracking-widest">
              Our Valuable Clients
            </span>
          </div>
          <ClientCarousel/>
        </div>
        <div className="flex flex-col mt-40 gap-16">
        <div className="flex gap-8">
            <div className="w-2 blue-gradient h-[5rem]"></div>
            <span className="text-[3rem] blue-gradient-text tracking-widest">
              Our Awards
            </span>
          </div>
          <AwardsCarousel/>
        </div>

      </div>
      
    </div>
  );
}
