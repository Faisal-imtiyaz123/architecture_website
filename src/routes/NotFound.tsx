import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"


export default function NotFound() {
  const navigate = useNavigate()
  const handleReturn=()=>{
    navigate(-1)
  }
  return (
    <div className="w-screen  justify-center flex h-screen">
        <div className="">
            <div className="text-[5rem] mt-[30vh] font-bold blue-gradient-text">
              404 Not Found!
            </div>
            <div className="flex justify-center gap-2 items-center tracking-wider">
           <div>
           The requested resource is not available. Please
            </div>  
            <Button onClick={handleReturn} className="blue-gradient">GO BACK</Button>
            </div>
        </div>
        
    </div>
  )
}
