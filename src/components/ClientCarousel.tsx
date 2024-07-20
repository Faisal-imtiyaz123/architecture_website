
import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import { sanityClient } from "../utils/client";
import { urlForImage } from "../utils/image";
import LoadingSpinner from "./LoadingSpinner";

const ClientCarousel = () => {
    const clientLogosQuery = useQuery({
        queryKey: ["clientLogos"],
        queryFn: async () => {
          const res = await sanityClient.fetch(`
            *[_type == "aboutUsCarouselImages" && type == "clients"]{
              images
            }
            `);
          return res;
        },
      });

    if(clientLogosQuery.isLoading || !clientLogosQuery.isSuccess) return <LoadingSpinner/>
    
    const computeLogosGap=()=>{
        const clientLogosLength = clientLogosQuery.data?.[0]?.images.length
        if(clientLogosLength==3) return "px-8"
        if(clientLogosLength==2) return "px-16"
        if(clientLogosLength==4) return "px-4"
        return ""
    }
    return(
        <Marquee className={computeLogosGap()}>
            {clientLogosQuery.data?.[0]?.images.map((image:any, index:number) => (
            <div className="px-16">
                <img
                  key={index}
                  src={urlForImage(image)}
                  alt="client logo"
                  className="h-[20rem]"
                />
            </div>
              ))}
        </Marquee>
      


    )
}
  


export default ClientCarousel;