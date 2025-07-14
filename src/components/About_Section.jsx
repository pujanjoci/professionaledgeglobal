// AboutSection.jsx
import React from 'react';
import { staffMembers, aboutContent } from './data';

const AboutSection = () => {
  const renderSection = (section, reverse = false) => {
    return (
      <div className="mb-12">
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-12">{section.title}</h3>
        <div className={`grid md:grid-cols-2 gap-8 items-center ${reverse ? 'flex-col-reverse md:flex-row' : ''}`}>
          <div className={reverse ? 'order-1 md:order-2' : ''}>
            <img 
              src={section.image} 
              alt={section.title} 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className={`${reverse ? 'order-2 md:order-1' : ''} ${section.title === 'Our Mission' ? 'text-right' : ''}`}>
            <ul className="space-y-4 text-gray-700">
              {section.points.map((point, index) => (
                <li key={index} className={`flex items-start ${section.title === 'Our Mission' ? 'flex-row-reverse' : ''}`}>
                  <span className={`${getBulletColor(section.title)} ${section.title === 'Our Mission' ? 'ml-2' : 'mr-2'} text-xl`}>
                    {getBulletSymbol(section.title)}
                  </span>
                  <span className={section.title === 'Our Mission' ? 'text-right' : ''}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const getBulletColor = (title) => {
    switch(title) {
      case 'Our Vision': return 'text-blue-500';
      case 'Our Mission': return 'text-green-500';
      case 'Our Goals': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  const getBulletSymbol = (title) => {
    switch(title) {
      case 'Our Vision': return '•';
      case 'Our Mission': return '•';
      case 'Our Goals': return '✓';
      default: return '•';
    }
  };

  return (
    <div className="py-6 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* About Header */}
        <div className="text-center mb-16">
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are dedicated to delivering innovative solutions that transform businesses and empower people.
          </p>
        </div>

        {/* Vision Section */}
        {renderSection(aboutContent.vision)}

        {/* Mission Section */}
        {renderSection(aboutContent.mission, true)}

        {/* Goals Section */}
        {renderSection(aboutContent.goals)}

      </div>
    </div>
  );
};

export default AboutSection;