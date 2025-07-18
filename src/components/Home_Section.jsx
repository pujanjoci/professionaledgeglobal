// src/components/Home_Section.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Changed from <a> to <Link>
import quotes from "../json/qoute.json";
import services from "../json/services.json";
// Import all div images
import div1 from "../assets/div-1.png";
import div2 from "../assets/div-2.png";
import div3 from "../assets/div-3.png";
import div4 from "../assets/div-4.png";
import div5 from "../assets/div-5.png";
import div6 from "../assets/div-6.png";
import div7 from "../assets/div-7.png";
import div8 from "../assets/div-8.png";

import { 
  FiPieChart, 
  FiBriefcase, 
  FiSettings, 
  FiDollarSign,
  FiUsers,
  FiFileText,
  FiHeadphones,
  FiActivity
} from "react-icons/fi";

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

// Array of all div images
const divImages = [div1, div2, div3, div4, div5, div6, div7, div8];

const Home_Section = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const { quote, author } = quotes[quoteIndex];

  const getIconComponent = (iconName) => {
    const Icon = iconComponents[iconName];
    return <Icon className="text-blue-900" size={20} />;
  };

  return (
    <>
      {/* Quote Section */}
      <section className="bg-gray-100 py-12 px-6 text-center transition-all duration-1000">
        <div className="max-w-3xl mx-auto">
          <blockquote className="text-xl italic text-gray-600">"{quote}"</blockquote>
          <p className="mt-4 text-gray-500">- {author}</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-16 px-4" aria-labelledby="service-label">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-blue-600 mb-2" id="service-label">What We Do?</p>
          <h2 className="text-2xl md:text-3xl text-center mb-12 text-gray-800">
            Our professional services meet your financial needs.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.slice(0, 4).map((service, index) => (
              <div key={service.id} className="relative">
                {/* White icon box in top-right corner */}
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-sm shadow-md flex items-center justify-center z-10">
                  {getIconComponent(service.icon)}
                </div>
                
                {/* Main service card with cut-out */}
                <div className="bg-white border border-gray-200 shadow-md rounded-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col relative">
                  {/* Image container with constrained height */}
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={divImages[index]} 
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
                        className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                      >
                        LEARN MORE
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 ml-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7" 
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home_Section;