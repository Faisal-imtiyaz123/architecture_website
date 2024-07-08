import { useQuery } from "@tanstack/react-query"
import { sanityClient } from "../utils/client"
import { urlForImage } from "../utils/image"
import Carousel from "../components/Carousel"
import { Button, Spinner} from "@nextui-org/react"
import { Link } from "react-router-dom"
import { Suspense } from "react"

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
  if(homeImageQuery.isLoading) return (
    <div className="w-[100vw] flex items-center justify-center h-[100vh]">
     <Spinner size="lg" color="danger"/>
    </div>
  )
  return (
    homeImageQuery.isSuccess &&
    <div className="">
      <Suspense fallback={<Spinner/>}>
     <img className="w-[100vw]" src={urlForImage(homeImageQuery.data[0].image)}/>
      </Suspense>
     <div className="lg:p-16 sm:p-8 md:p-12">
     <div className="">
      <Carousel/>
     </div>
     <div className="flex mt-16 ">
      <div className=" flex items-center text-white text-[7rem] bg-gradient-to-tr from-pink-600 to-yellow-400 sm:text-[5rem] md:text-[6rem] basis-[50%] border-r flex-col font-bold">
      <span className="">
        WHO
        </span>
        <span>
          ARE
        </span>
         <span>
          WE?
        </span> 
      </div>
      <p className="flex  items-center justify-center basis-[50%] w-full">
      blah blah blah blah blah 
      </p>
     </div>
      <div className="mt-8 sm:gap-[3rem] flex md:gap-[5rem]" >
      <img className="h-[45vw] w-[45vw]" src="../../public/c.jpg" alt="" />
      <div className="flex flex-col md:gap-2 lg:gap-4 sm:gap-4 sm:mt-[4rem] md:mt-[5rem] lg:mt-[8rem] shrink-0"> 
       <p className="text-gray-500 text-[3rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] ">Want to work? </p>  
          <Link to="/careers">
        <div className="flex justify-center">
        <Button radius="full" className="bg-gradient-to-tr sm:px-8 sm:p-6  md:px-16 md:p-8 s sm:text-lg text-2xl from-pink-500 to-yellow-300 text-white shadow-lg">
         Apply here
        </Button>
        </div>
          </Link>
        </div>
      </div>
     </div>
    </div>
  )
}
