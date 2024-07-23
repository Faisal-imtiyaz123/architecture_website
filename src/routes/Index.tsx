import { Outlet, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { useEffect } from "react";


export default function Index() {
  const sectors = ['airports','healthcare','institutional','judiciary','workspaces','railways','interiors']
  const params = useParams()
  const navigate = useNavigate()
  useEffect(()=>{
   if( params?.sector && !sectors.includes(params?.sector)){
     navigate('/*')
   }
  },[params?.sector,navigate])
  return (
    <div>
        <Navbar/>
    <div className="h-screen w-screen">
        <Outlet/>
    </div>
    </div>
  )
}
