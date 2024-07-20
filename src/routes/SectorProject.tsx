
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { sanityClient } from "../utils/client"
import { urlForImage } from "../utils/image"
import { Button } from "@nextui-org/react"
import LoadingSpinner from "../components/LoadingSpinner"

export default function SectorProject() {
  const params= useParams()
  console.log(params)
  const projectHomeImagesQuery =useQuery({
      queryKey: ['projectHomeImage', params.sector],
      enabled:!!params.sector,
      queryFn: async () => {
          const res = await sanityClient.fetch(`
            *[_type == "projectHomeImages" && sector == $sector]{
                image,
                }
                `, {sector: params?.sector})
                return res
            }
        })
  const individulaProjectImagesQuery = useQuery({
        queryKey: ['projectImages', params.id],
        enabled:!!params.sector,
        queryFn: async () => {
            const res = await sanityClient.fetch(`
                *[_type == "individualProject" && projectNumber == $id]{
                    images,
                    mainDescription,
                    }
                    `, {id: params?.id})
                    return res
                }
        
  })
 if(projectHomeImagesQuery.isLoading || individulaProjectImagesQuery.isLoading || !params || !projectHomeImagesQuery.data || !individulaProjectImagesQuery.data) return <LoadingSpinner/>
  return (
    <div className="h-screen w-screen">
    <img className="w-screen" src={urlForImage(projectHomeImagesQuery.data[0].image)} />
    <div className="px-16 mt-4 tracking-wider text-sm text-gray-600">
      {individulaProjectImagesQuery.data[0].mainDescription}
    </div>
    <div className="grid lg:p-16 sm:p-8 md:p-12 grid-cols-2 gap-8">
      {individulaProjectImagesQuery.data[0].images.map((projectImage:any, index: number) => {
        return (
        <div className="relative w-full h-[25rem] border group" key={index}>
           <img className="w-full h-full object-cover" src={urlForImage(projectImage.image)} />
           <div className="tracking-wider text-sm text-gray-600 mt-2" >
                    {projectImage.description}
                </div>
         </div>
        )
      }

      )}
    </div>
  </div>
  )
}
