import { useQuery } from "@tanstack/react-query"
import { sanityClient } from "../utils/client"
import { urlForImage } from "../utils/image"
import Carousel from "../components/Carousel"
import {Spinner} from "@nextui-org/react"
import { Suspense } from "react"
import LoadingSpinner from "../components/LoadingSpinner"
import dmc from "../../public/Darbhanga Medical College.jpg"
import gh from "../../public/Guyana, Hospital.jpg"
import iitg from "../../public/IIT, Guwhati.jpg"
import rch from "../../public/Ranchi High Court.gif"
import sec from "../../public/Secretariat, Puducherry.jpg"
import vsg from "../../public/Vidhan Sabha, Gandhinagar.jpg"


export default function Home() {
  const homeImageQuery = useQuery({
    queryKey: ['homeImage'],
    queryFn: async () => {
      const res = await sanityClient.fetch(`
      *[_type == "homeImage"]{
        image,
        heading
        }
        `)
        return res
      }
  })

  if(homeImageQuery.isLoading ) return <LoadingSpinner/>
  const imageUrls = [dmc,gh,iitg,rch,sec,vsg]
 
  
  return (
    homeImageQuery.isSuccess &&
    <div className="">
      <Suspense fallback={<Spinner color="primary"/>}>
     <img className="w-[100vw]" src={urlForImage(homeImageQuery.data[0].image)}/>
      </Suspense>
     <div className="lg:p-16 sm:p-8 md:p-12">
     <div className="">
      <Carousel/>
     </div>
       <div className="grid grid-cols-2 gap-8 mt-32">
        {imageUrls.map((imageUrl, index) => 
        <div className="relative w-full h-[25rem] border group" key={index}>
          <img className="w-full h-full object-cover" src={imageUrl} />
          <div className="absolute flex justify-center items-center inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100  transition-opacity duration-200 ">
          </div>
        </div>
        )}
    </div>
     </div>
    </div>
  )
}
