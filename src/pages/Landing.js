import React from "react";

import Hero from '../components/Hero/Hero';

import heroImageUrl from '../assets/images/Landing/hero-img.png';

const Landing = () => {
  return( 
    <div>
      <Hero imageUrl={heroImageUrl} title='Plan your journey'/> 
    </div>
  );
};

export default Landing;
