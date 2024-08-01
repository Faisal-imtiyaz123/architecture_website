
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { sanityClient } from "../utils/client"
import { urlForImage } from "../utils/image"
import LoadingSpinner from "../components/LoadingSpinner"
import { useEffect } from "react"


export default function SectorProject() {
  const params= useParams()
  const navigate = useNavigate()
  const projectImagesQuery =useQuery({
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


 useEffect(()=>{
  if(individulaProjectImagesQuery.isError || Number(params?.id) >projectImagesQuery.data?.[0]?.images.length){
    navigate('/*')
  }
 },[individulaProjectImagesQuery.isError,projectImagesQuery.data,navigate,params?.id])
 if(projectImagesQuery.isLoading || individulaProjectImagesQuery.isLoading || !params || !projectImagesQuery.isSuccess || !individulaProjectImagesQuery.isSuccess) return <LoadingSpinner/>
  return (
    <div>
    <img className="py-2 max-h-[88vh] w-full" src={urlForImage(projectImagesQuery?.data?.[0].images[Number(params?.id)-1])} />
    <div className="px-16 mt-4 tracking-wider text-sm text-gray-600">
      {individulaProjectImagesQuery?.data?.[0].mainDescription}
    </div>
    <div className="grid py-16 grid-cols-2 gap-8">
      {individulaProjectImagesQuery?.data?.[0].images.map((projectImage:any, index: number) => {
        return (
          <div className="relative w-full max-h-[25rem] border group" key={index}>
          <img className="w-full h-full object-cover" src={urlForImage(projectImage.image)} />
          <div className="absolute flex justify-center items-center px-6 inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100  transition-opacity duration-200 ">
           {projectImage.description &&
            <span className="text-white">
             {projectImage.description }
            </span>
            }
          </div>
        </div>
        )
      }

      )}
    </div>
  </div>
  )
}

