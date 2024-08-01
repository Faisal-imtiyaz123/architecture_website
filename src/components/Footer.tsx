import { useNavigate } from 'react-router-dom';
import FooterImage from "../assets/Footer-Image.jpeg"

export default function Footer() {
  const navigate = useNavigate();

  const projects = ['Interiors'];
  const architecture = ['Airports', 'HealthCare', 'Institutional', 'Judiciary', 'Workspaces', 'Railways'];
  const sections = ['About Us', 'Careers', 'Publication'];

  const handleNavigation = (sector: string) => {
    window.scrollTo(0, 0); 
    navigate(`/sectors/${sector.toLowerCase()}`);
  };

  return (
    <div className="flex w-full mt-8 gap-16 text-sm border-t py-16">
      <div className=' h-full basis-[40%] overflow-hidden'>
        <img className='object-cover' src={FooterImage} alt="" />
      </div>
    <div className='flex flex-1  justify-end gap-20'>
    <div className="flex flex-col gap-8">
        <span className="font-bold tracking-wider">Projects</span>
        {projects.map((project) => (
          <span
            key={project}
            onClick={() => handleNavigation(project)}
            className="cursor-pointer tracking-wider hover:text-blue-500 transform transition-transform duration-300 "
          >
            {project}
          </span>
        ))}
        <span className="font-bold tracking-wider">Architecture</span>
        <div className="flex flex-col gap-8 text-gray-600">
          {architecture.map((item) => (
            <span
              key={item}
              onClick={() => handleNavigation(item)}
              className="cursor-pointer tracking-wider hover:text-blue-500 transform transition-transform duration-300 "
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {sections.map((section) => (
        <div
          key={section}
          onClick={() => handleNavigation(section)}
          className="font-bold  cursor-pointer tracking-wider hover:text-blue-500 transform transition-transform duration-300 "
        >
          {section}
        </div>
      ))}

    </div>
     
     
    </div>
  );
}