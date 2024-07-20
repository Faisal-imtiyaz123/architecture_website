import { useQuery } from "@tanstack/react-query"
import { sanityClient } from "../utils/client"
import { urlForImage } from "../utils/image"
import Carousel from "../components/Carousel"
import {Spinner} from "@nextui-org/react"
import { Suspense } from "react"
import LoadingSpinner from "../components/LoadingSpinner"


export default function Home() {
  const mainHomeImageQuery = useQuery({
    queryKey: ['homeImage'],
    queryFn: async () => {
      const res = await sanityClient.fetch(`
      *[_type == "homeImages" && type=="mainImage"]{
        images,
        }
        `)
        return res
      }
  })
  const otherHomeImagesQuery = useQuery({
    queryKey: ['otherHomeImages'],
    queryFn: async () => {
      const res = await sanityClient.fetch(`
      *[_type == "homeImages" && type=="otherImages"]{
        images,
        }
        `)
        return res
      }
  })
  if(mainHomeImageQuery.isLoading || !mainHomeImageQuery.isSuccess) return <LoadingSpinner/>
 
  
  return (
    mainHomeImageQuery.isSuccess &&
    <div className="">
      <Suspense fallback={<Spinner color="primary"/>}>
     <img className="w-[100vw]" src={urlForImage(mainHomeImageQuery?.data?.[0]?.images[0])}/>
      </Suspense>
     <div className="lg:p-16 sm:p-8 md:p-12">
     <div className="">
      <Carousel/>
     </div>
       <div className="grid grid-cols-2 gap-8 mt-32">
          {otherHomeImagesQuery?.data?.[0]?.images?.map((image:any,index:number)=>
          <div key={index} className="relative w-full h-[25rem] group">
            <img className="w-full h-full object-cover" src={urlForImage(image)} />
          </div>
          )}
       
      </div>
     </div>
    </div>
  )
}
