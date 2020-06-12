import React from "react";

import Hero from '../components/Hero/Hero';
import Section from '../components/Section/Section';
import FTypography from '../components/FTypography/FTypography';

import {
  Grid
} from '@material-ui/core';

import {ReactComponent as Plans} from '../assets/images/Landing/travel-plans.svg';
import heroImageUrl from '../assets/images/Landing/hero-img.png';

const getIntro = ()=>(
  `
Plan itinerary ahead has never been an easy task for majority of people. Have a list of places you want to visit but don’t know where to begin with?  Spend too much time on planning for a trip that you can enjoy and never forgot?

Trip planner is here to assist and help you to create a itinerary easily. Trip planner can help you to

- Manage your trips
- Orginize places
- Schedule for each day
  `
)

const Landing = () => {
  return( 
    <div>
      <Hero imageUrl={heroImageUrl} title='Plan your journey'/>
      <Section title='Organize trip & Start your adventure' content={
        <Grid container spacing={4}>
            <Grid item md={12} lg={6}>
                <div>
                    <FTypography text={getIntro()} variant='body1' />
                </div>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
                <div style={{textAlign:'center'}}>
                    <Plans />
                </div>
            </Grid>
        </Grid>
      } /> 
    </div>
  );
};

export default Landing;
