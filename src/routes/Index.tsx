import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";


export default function Index() {
  return (
    <div>
        <Navbar/>
    <div className="h-screen w-screen">
        <Outlet/>
    </div>
    </div>
  )
}
