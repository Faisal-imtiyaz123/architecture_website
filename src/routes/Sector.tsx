
import { useQuery } from "@tanstack/react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { sanityClient } from "../utils/client"
import { urlForImage } from "../utils/image"
import { Button } from "@nextui-org/react"
import LoadingSpinner from "../components/LoadingSpinner"

export default function Sector() {
  const navigate = useNavigate()
  const location = useLocation()
  const params= useParams()
  const projectHomeImagesQuery =useQuery({
      queryKey: ['projectHomeImage', params.sector],
      enabled:!!params.sector,
      queryFn: async () => {
          const res = await sanityClient.fetch(`
            *[_type == "projectHomeImages" && sector == $sector]{
                image
                }
                `, {sector: params?.sector==="healthcare"?"h":params?.sector })
                return res
            }
        })
  const projectImagesQuery = useQuery({
        queryKey: ['projectImages', params.sector],
        enabled:!!params.sector,
        queryFn: async () => {
            const res = await sanityClient.fetch(`
                *[_type == "projectImages" && sector == $sector]{
                    images,
                    }
                    `, {sector: params?.sector==="healthcare"?"h":params?.sector})
                    return res
                }
        
  })
 if(projectHomeImagesQuery.isLoading || projectImagesQuery.isLoading || !params || !projectHomeImagesQuery.data || !projectImagesQuery.data ) return <LoadingSpinner/>

  return (
    <div>
    <div className="py-2 "> 
    <div className="relative">
    <img
          className="w-full h-full object-cover max-h-[88vh]"
          src={urlForImage(projectHomeImagesQuery?.data?.[0]?.image)}
        />
         <div className="absolute tracking-wider inset-0 flex pl-[5rem] items-center bg-black bg-opacity-30 text-white text-5xl">
         {(params?.sector?.[0].toUpperCase() ??'' )+ params?.sector?.slice(1) }
        </div>
    </div>
    
    </div>
   
    <div className="grid py-32 grid-cols-2 gap-8">
      {projectImagesQuery?.data?.[0]?.images.map((projectImage:any, index: number) => {
        return (
        <div className="relative w-full max-h-[25rem] border group" key={index}>
           <img className="w-full h-full object-cover" src={urlForImage(projectImage)} />
           <div className="absolute flex justify-center items-center inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100  transition-opacity duration-200 ">
             <Button onClick={()=>navigate(`${location.pathname}/${index+1}`)} radius="none" className="text-white" size="lg" variant="bordered">
                 Learn More
             </Button>
           </div>
         </div>
        )
      }

      )}
    </div>
  </div>
  )
}

