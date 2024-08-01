import { useQuery } from "@tanstack/react-query"
import { sanityClient } from "../utils/client"
import { urlForImage } from "../utils/image"
import Carousel from "../components/Carousel"
import LoadingSpinner from "../components/LoadingSpinner"


export default function Home() {
  const otherHomeImagesQuery = useQuery({
    queryKey: ['otherHomeImages'],
    queryFn: async () => {
      const res = await sanityClient.fetch(`
      *[_type == "homeImages" && type=="otherImages"]{
        images
        }
        `)
        return res
      }
  })
  if(otherHomeImagesQuery.isLoading ) return <LoadingSpinner/>

  return (
     <div className="py-2">
      <Carousel/>
       <div className="grid grid-cols-2 gap-8 mt-32">
          {otherHomeImagesQuery?.data?.[0]?.images?.map((image:any,index:number)=>
           <div className="relative border group max-h-[25rem]" key={index}>
           <img className="h-full w-full object-cover" src={urlForImage(image.image)} />
           <div className="absolute flex justify-center items-center px-6 inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100  transition-opacity duration-200 ">
            {image.description &&
             <span className="text-white">
              {image.description }
             </span>
             }
           </div>
         </div>
          )}
       
      </div>
     </div>
  )
}
