import React, { useEffect } from 'react'
import Hero from "./Hero";
import Home_Section from '../components/Home_Section';

const Home = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  

  return (
    <div>
      <Hero />
      <Home_Section />
    </div>
  )
}

export default Home