
import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "../utils/client";
import { urlForImage } from "../utils/image";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Publication() {
  const publicationHomeImgQuery = useQuery({
    queryKey: ["publicationHomeImage"],
    queryFn: async () => {
      const res = await sanityClient.fetch(`
       *[_type == "publicationImages" && type == "mainImage"]{
  image
}

      `);
      return res;
    },
  });
  const publicationImagesQuery = useQuery({
    queryKey: ["publicationImages"],
    queryFn: async () => {
      const res = await sanityClient.fetch(`
       *[_type == "publicationImages" && type == "publicationImage"]{
        image,
        description
        }`)
        return res
      }
    })
  if (publicationHomeImgQuery.isLoading || !publicationHomeImgQuery.isSuccess || publicationImagesQuery.isLoading || !publicationImagesQuery.isSuccess)
    return <LoadingSpinner />;

  return (
    <div className="h-screen w-screen">
      <img className="w-screen" src={urlForImage(publicationHomeImgQuery?.data?.[0].image[0])} />
      <div className="grid lg:p-16 sm:p-8 md:p-12 grid-cols-2 gap-8">
        {publicationImagesQuery?.data?.[0].image?.map((projectImage:any, index: number) => 
        <div className="relative w-full h-[25rem] border group" key={index}>
          <img className="w-full h-full object-cover" src={urlForImage(projectImage)} />
          <div className="absolute flex justify-center items-center inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100  transition-opacity duration-200 ">
           {publicationImagesQuery?.data?.[0].description &&
            <span className="text-white">
             {publicationImagesQuery?.data?.[0].description }
            </span>
            }
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
