import React, { useEffect, useState } from 'react';

import heroBg from '../assets/bg-1.jpg';
import heroBg3 from '../assets/bg-3.jpg';
import heroBg4 from '../assets/bg-4.jpg';
import about from '../assets/About.png';

const HEADER_HEIGHT = 50;

const backgrounds = [heroBg, about, heroBg3, heroBg4];

const Hero = () => {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="w-full font-poppins text-white"
      style={{
        marginTop: `${HEADER_HEIGHT}px`,
      }}
    >
      {/* Top Section: Title and Subtitle */}
      <div className="w-full bg-blue-900 text-center pt-7 px-4 py-2">
        <h1 className="text-xl md:text-2xl pt-2 font-bold">
          Let's Unlock Your Business Edge – Connect Now
        </h1>
      </div>

      {/* Bottom Section: Rotating Background */}
      <div className="w-full flex justify-center items-center relative overflow-hidden">
        <img
          src={backgrounds[bgIndex]}
          alt="Hero"
          className="w-full h-auto max-h-[calc(100vh-50px)] md:max-h-none shadow-lg transition-all duration-1000 object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
