"use client"
import {useRef, useState } from "react";
import {  Navbar as NavbarNextUI,  NavbarContent,   NavbarItem,NavbarBrand,    NavbarMenu,  NavbarMenuItem} from "@nextui-org/navbar";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react"
import {Link, useNavigate} from "react-router-dom";
import { Plane, Building, Gavel, Briefcase, Train, HeartPulse, Instagram, Linkedin, Mail, Home, Palette } from 'lucide-react';


export default function Navbar() {
const navigate = useNavigate()
const [activeLink,setActiveLink]  = useState<number>(0)
const [showArchitectureDropdown,setArchitectureDropdown] = useState<boolean>(false)
// const [triggerClicked, setTriggerClicked] = useState<boolean>(false)
const ref = useRef<HTMLDivElement| null>(null)
const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />
  };

 const navLinks =[
    {
     name:'Projects',
     url:'/sectors',
     dropdown:true
    },
    {
    name:'About Us',
     url:'/about'
    },
    {
    name:'Careers',
    url:'/careers'
    },
    {
    name:'Publication',
    url:'/publication'
    }
]

 
const size = 20;
const mainDropdown=[
  {label: "Interiors", icon: <Home size={size} color="#ff6f61" /> },
  {label:"Architecture", icon: <Palette size={size} color="#ff6f61" />}

]
const sectorDropDown = [

  { label: "Airports", icon: <Plane size={size} color="#007bff" /> }, // Blue
  { label: "Health Care", icon: <HeartPulse size={size} color="#dc3545" /> }, // Red
  { label: "Institutional", icon: <Building size={size} color="#6c757d" /> }, // Gray
  { label: "Judiciary", icon: <Gavel size={size} color="#28a745" /> }, // Green
  { label: "Work Spaces", icon: <Briefcase size={size} color="#ffc107" /> }, // Yellow
  { label: "Railways", icon: <Train size={size} color="#17a2b8" /> } // Teal
];
const iconClassName = "hover:scale-110 cursor-pointer transition duration-200"
const isLinkActive=(i:number)=> activeLink-1===i
const activeLinkStyle = "bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-2xl p-2"


  return (
  <div className="fixed top-2 items-center justify-center flex w-[100vw] z-[100] ">
    <NavbarNextUI className="flex border gap-8 shadow-lg  rounded-3xl max-w-[59vw]"  >
    <NavbarContent  justify="center">
        <NavbarBrand>
          <p onClick={()=>{setActiveLink(0)
            navigate('/')}} className="text-3xl hover:scale-110 bg-gradient-to-r bg-clip-text text-transparent transition duration-200 cursor-pointer font-bold from-blue-600 to-blue-400 tracking-widest ">ENARCH</p>
        </NavbarBrand>
    </NavbarContent>
        <NavbarContent className="flex">
        {
            navLinks.map((navLink,i)=> {
            return(
            navLink.dropdown?
        <Dropdown>
          <NavbarItem  key={i}>
            <DropdownTrigger >
              <Button
                disableRipple
                className={`hover:scale-110 text-sm  bg-transparent data-[hover=true]:bg-transparent `}
                radius="none"
                endContent={icons.chevron}
              >
                {navLink.name}
              </Button>
            </DropdownTrigger>
          </NavbarItem>
        { <DropdownMenu
          >
            { mainDropdown.map((link,index)=>
            <DropdownItem startContent={link.icon} color="primary" variant="light" key={index}>
                { 
                  link.label==="Architecture"?
                  <div ref={ref} onMouseEnter={()=>setArchitectureDropdown(true)} className="px-3 flex items-center gap-2 p-2">
                    {link.label}
                    {icons.chevron}
                    {showArchitectureDropdown && 
                      <div className="absolute top-[3.8rem] px-2 p-1 rounded-xl flex flex-col bg-white "> 
                        {sectorDropDown.map((link,index)=>
                            <Link onClick={()=>{setArchitectureDropdown(false)
                            }} key={index} className="p-3 hover:text-blue-600 text-black flex gap-4" to={`/sectors/${link.label.toLowerCase().replace(/\s/g, "")}`}>
                            {link.icon}
                            {link.label}
                            </Link>

                        )}
                      </div>
                    }
                  </div>
                  :
                <Link className="p-3 " to={`/sectors/${link.label.toLowerCase().replace(/\s/g, "")}`}>
                 {link.label}
                </Link>
                }
            </DropdownItem>
            )}
            </DropdownMenu>}
          </Dropdown>:
          
            <NavbarItem className={`hover:scale-110 transiton duration-200 ${isLinkActive(i) ?activeLinkStyle:" text-gray-600"} `}  key={i}>
             <Link  onClick={()=>setActiveLink(i+1)}  className="p-6  text-sm" to={navLink.url}>{navLink.name}</Link>
            </NavbarItem>
                )
            }
            )
        }
         <Link target="_blank" to={"https://www.instagram.com/enarch.consultants/"}>
          <Instagram  className={iconClassName}/>
         </Link>
         <Link target="_blank" to={"https://www.linkedin.com/company/enarch-consultant-private-limited/?originalSubdomain=in"}>
         <Linkedin  className={iconClassName} fill="black"/>
         </Link>
         <Link target="_blank" to={"mailto:enarchindia@rediffmail.com"} >
         <Mail className={iconClassName}/>
         </Link>
         
         
        </NavbarContent>
       
        <NavbarMenu>
        {navLinks.map((navLink, index) =>  {
            return(
          <NavbarMenuItem className="flex flex-col" key={index}>
            { navLink.dropdown?
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                
                disableRipple
                className="text-sm ml-[-0.4rem] text-gray-700 bg-transparent data-[hover=true]:bg-transparent"
                radius="none"
                endContent={icons.chevron}
              >
                {navLink.name}
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            className=""
          >
            {sectorDropDown.map((link,index)=>
            <DropdownItem startContent={link.icon} color="danger" variant="light" key={index}>
                <Link className="p-3 " to={`/sectors/${link.label.toLowerCase().replace(/\s/g, "")}`}>
                 {link.label}
                </Link>
            </DropdownItem>
            )}
            </DropdownMenu>
          </Dropdown>: 
          <Link className="text-sm text-gray-700 p-3" to={navLink.url}>
              {navLink.name}
            </Link>}
          </NavbarMenuItem>
            )
        }
        )}
      </NavbarMenu>
       
     </NavbarNextUI>
  </div>
    
  )
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChevronDown = ({fill, size, height, width, ...props}:any) => {
    return (
      <svg
        fill="none"
        height={size || height || 24}
        viewBox="0 0 24 24"
        width={size || width || 24}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={1.5}
        />
      </svg>
    );
  };