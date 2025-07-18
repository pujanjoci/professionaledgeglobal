import React, { useEffect, useState } from 'react';
import heroBg from '../assets/bg-1.jpg';
import heroBg3 from '../assets/bg-3.jpg';
import heroBg4 from '../assets/bg-4.jpg';
import about from '../assets/About.png';
import './hero.css';

const HEADER_HEIGHT = 50;
const backgrounds = [heroBg, about, heroBg3, heroBg4];

const Hero = () => {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const marqueeItems = [
    "🚀 New Training Classes have opened! Connect with us to Join Now",
    "📈 Limited-time offer: Get 20% off on all consulting services this month",
    "💼 Exclusive webinar: Digital Transformation Strategies on July 25th"
  ];

  return (
    <section className="hero-section">
      <div className="hero-header">
        <h1 className="hero-title">
          Let's Unlock Your Business Edge – Connect Now
        </h1>
        <div className="hero-marquee-container">
          <div className="hero-marquee-wrapper">
            <div className="hero-marquee-content">
              {marqueeItems.map((item, index) => (
                <span key={index} className="hero-marquee-item">{item}</span>
              ))}
              {/* Duplicate the items for seamless looping */}
              {marqueeItems.map((item, index) => (
                <span key={`duplicate-${index}`} className="hero-marquee-item">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="hero-image-container">
        <img src={backgrounds[bgIndex]} alt="Hero" className="hero-image" />
      </div>
    </section>
  );
};

export default Hero;