
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { sanityClient } from "../utils/client"
import { urlForImage } from "../utils/image"
import { Button } from "@nextui-org/react"
import LoadingSpinner from "../components/LoadingSpinner"

export default function Sector() {
  const navigate = useNavigate()
  const params= useParams()
  const projectHomeImagesQuery =useQuery({
      queryKey: ['projectHomeImage', params.sector],
      enabled:!!params.sector,
      queryFn: async () => {
          const res = await sanityClient.fetch(`
            *[_type == "projectHomeImages" && sector == $sector]{
                image,
                mainDescription
                }
                `, {sector: params?.sector})
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
                    `, {sector: params?.sector})
                    return res
                }
        
  })
 if(projectHomeImagesQuery.isLoading || projectImagesQuery.isLoading || !params || !projectHomeImagesQuery.data) return <LoadingSpinner/>
  return (
    <div className="h-screen w-screen">
    <img className="w-screen" src={urlForImage(projectHomeImagesQuery.data[0].image)} />
    <div className="grid lg:p-16 sm:p-8 md:p-12 grid-cols-2 gap-8">
      {projectImagesQuery.data[0].images.map((projectImage:any, index: number) => {
        return (
        <div className="relative w-full h-[25rem] border group" key={index}>
           <img className="w-full h-full object-cover" src={urlForImage(projectImage)} />
           <div className="absolute flex justify-center items-center inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100  transition-opacity duration-200 ">
             <Button onClick={()=>navigate(`/${index}`)} className="blue-gradient" size="lg" variant="bordered">
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

