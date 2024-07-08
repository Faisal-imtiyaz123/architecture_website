"use client"
import { useState } from "react";
import {  Navbar as NavbarNextUI,  NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/navbar";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react"
import {Link} from "react-router-dom";
import { Plane, Building, Gavel, Briefcase, Train, HeartPulse, Instagram, Linkedin, Mail } from 'lucide-react';

export default function Navbar() {
const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
const [activeLink,setActiveLink]  = useState<number>(0)
const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />
  };

 const navLinks =[
    {
     name:'Our Projects',
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
const activeLinkStyle = "bg-gradient-to-tr from-pink-600 to-yellow-400 text-white rounded-2xl p-2"
  return (
  <div className="fixed top-2 flex w-[100vw] z-[100] justify-center">
    <NavbarNextUI className="flex border justify-center shadow-lg  rounded-3xl w-[43rem]"  onMenuOpenChange={setIsMenuOpen} >
      {/* <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
      </NavbarContent> */}
        <NavbarContent className="flex">
        {
            navLinks.map((navLink,i)=> {
            return(
            navLink.dropdown?
        <Dropdown>
          <NavbarItem  key={i}>
            <DropdownTrigger>
              <Button
                onClick={()=>setActiveLink(i+1)} 
                disableRipple
                className={`hover:scale-110 text-sm  bg-transparent data-[hover=true]:bg-transparent ${isLinkActive(i) ? activeLinkStyle:" text-gray-600"}`}
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
                <Link className="p-3  " to={`/sectors/${link.label.toLowerCase().replace(/\s/g, "")}`}>
                 {link.label}
                </Link>
            </DropdownItem>
            )}
            </DropdownMenu>
          </Dropdown>:
          
            <NavbarItem className={`hover:scale-110 transiton duration-200 ${isLinkActive(i) ?activeLinkStyle:" text-gray-600"} `}  key={i}>
             <Link onClick={()=>setActiveLink(i+1)}  className="p-6  text-sm" to={navLink.url}>{navLink.name}</Link>
            </NavbarItem>
                )
            }
            )
        }
          <Instagram className={iconClassName}/>
          <Linkedin className={iconClassName} fill="black"/>
          <Mail className={iconClassName}/>
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