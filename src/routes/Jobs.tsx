import { useQuery } from "@tanstack/react-query"
import { sanityClient } from "../utils/client"
import {Card, CardHeader, CardBody, CardFooter, Divider, Button} from "@nextui-org/react";
import { useState } from "react";
import Careers from "./Careers";

export default function Jobs() {
  const [jobIndex, setJobIndex] = useState<number|null>(null)
  const jobsQuery = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const response = await sanityClient.fetch(`
        *[_type == "jobs"]{
          title,
            jobCardDescription,
            location,
            requirements,
            description,
        }
        `)
      return response
    }
  })
  return jobIndex===null? <div className="h-[100vh]">
        <div className="grid lg:p-16 sm:p-8 md:p-12 grid-cols-3 gap-8">
            {jobsQuery.data?.map((job: any, index: number) => (
             <Card className="max-w-[400px]">
             <CardHeader className="text-2xl p-4 ">
              {job.title}
             </CardHeader>
             <Divider/>
             <CardBody className="flex flex-col gap-4">
             <p>
                {job.jobCardDescription}
              </p>
               <span className="text-sm"> {job.location?.[0].toUpperCase() + job.location?.slice(1)}</span>
             </CardBody>
             <Divider/>
             <CardFooter>
                <Button onClick={()=>setJobIndex(index)} className="blue-gradient">
                    Apply 
                </Button>
             </CardFooter>
           </Card>
            ))}
        </div>
    </div>
    :
<div className="mt-[-3rem]">
<Careers requirements={jobsQuery?.data?.[jobIndex].requirements} description={jobsQuery?.data?.[jobIndex].description}/>
</div>
  
}
