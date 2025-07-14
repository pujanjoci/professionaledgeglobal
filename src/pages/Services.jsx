import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import servicesData from '../json/services.json';
import { 
  FiPieChart, FiBriefcase, FiSettings, FiDollarSign, 
  FiUsers, FiFileText, FiHeadphones, FiActivity, FiArrowRight 
} from 'react-icons/fi';

// Import all div images
import div1 from '../assets/div-1.png';
import div2 from '../assets/div-2.png';
import div3 from '../assets/div-3.png';
import div4 from '../assets/div-4.png';
import div5 from '../assets/div-5.png';
import div6 from '../assets/div-6.png';
import div7 from '../assets/div-7.png';
import div8 from '../assets/div-8.png';

// Create an image map using the image_name as key
const imageMap = {
  'div_1': div1,
  'div_2': div2,
  'div_3': div3,
  'div_4': div4,
  'div_5': div5,
  'div_6': div6,
  'div_7': div7,
  'div_8': div8
};

const iconComponents = {
  FiPieChart,
  FiBriefcase,
  FiSettings,
  FiDollarSign,
  FiUsers,
  FiFileText,
  FiHeadphones,
  FiActivity
};

const getIconComponent = (iconName) => {
  const Icon = iconComponents[iconName];
  return <Icon className="text-blue-900 group-hover:rotate-30 transition-transform duration-300" size={20} />;
};

export default function Services() {
  const { id } = useParams();

  // Scroll to top when component mounts or when id changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [id]);

  // If ID exists, show single service, otherwise show all
  const selectedService = id 
    ? servicesData.find(service => service.id === id)
    : null;

  if (selectedService) {
    const IconComponent = iconComponents[selectedService.icon];
    const serviceImage = imageMap[selectedService.image_name];
    
    return (
      <div className="min-h-screen mt-4 bg-gray-50">
        {/* Image section - full width, 50% height */}
        <div className="w-full h-[50vh] overflow-hidden border-b-4 border-blue-700 relative">
          <img 
            src={serviceImage} 
            alt={selectedService.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content section */}
       <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="mb-10">
            {/* Title + Icon */}
            <div className="flex items-center gap-4 mb-4">
              <IconComponent className="h-10 w-10 text-blue-600" />
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {selectedService.title}
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600">
              {selectedService.description}
            </p>

            {/* Sub-description */}
            {selectedService.subDescription && (
              <p className="mt-3 text-base sm:text-lg text-gray-500">
                {selectedService.subDescription}
              </p>
            )}
          </div>

          {/* Back to services link */}
          <div>
            <Link
              to="/services"
              className="text-blue-600 hover:text-blue-800 hover:underline transition"
            >
              ← Back to all services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show all services if no ID or service not found
  return (
    <div className="min-h-screen mt-8 bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-blue-600 mb-2">Our Services</p>
          <h1 className="text-2xl md:text-3xl text-gray-800">
            Our professional services meet your financial needs.
          </h1>
        </div>
         
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service) => (
            <div key={service.id} className="relative group">
              {/* White icon box in top-right corner */}
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-sm shadow-md flex items-center justify-center z-10">
                {getIconComponent(service.icon)}
              </div>
              
              {/* Main service card with cut-out */}
              <div className="bg-white border border-gray-200 shadow-md rounded-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col relative">
                {/* Image container with constrained height */}
                <div className="h-40 overflow-hidden">
                  <img 
                    src={imageMap[service.image_name]} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Triangular cut-out effect */}
                <div className="absolute top-[80px] right-[10px] w-100 h-22 bg-white transform rotate-45 origin-top-right translate-x-1/4 -translate-y-1/4 z-0" />
              
                {/* Service content */}
                <div className="p-6 pt-4 flex-grow flex flex-col">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                  </div>
                  <div className="mt-auto">
                    <Link
                      to={`/services/${service.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center group relative pb-1"
                    >
                      LEARN MORE
                      <FiArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                      {/* Animated underline with line drawing effect */}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full origin-left"></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}