import { Outlet, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { useEffect } from "react";
import Footer from "../components/Footer";
import AppErrorBoundary from "../components/ErrorBoundary";


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
    <>
    <AppErrorBoundary>
    <Navbar/>
    <div className="lg:px-12 overflow-x-hidden sm:px-6 md:px-10">
    <Outlet/>
    <Footer/>
    </div>
    </AppErrorBoundary>
    
    </>
    
  )
}
