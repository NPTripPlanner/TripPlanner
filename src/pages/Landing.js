import React from "react";

import Hero from '../components/Hero/Hero';
import Section from '../components/Section/Section';
import FTypography from '../components/FTypography/FTypography';
import TPStepper from '../components/TPStepper/TPStepper';
import Connector from '../components/TPStepper/Connector/Connector';
import SVGStepIcon from '../components/TPStepper/SVGStepIcon/SVGStepIcon';
import TPMobileStepper from '../components/TPMobileStepper/TPMobileStepper';

import {ReactComponent as Create} from '../assets/images/Landing/create-journey.svg';
import {ReactComponent as Plan} from '../assets/images/Landing/organize-locations.svg';
import {ReactComponent as Travel} from '../assets/images/Landing/start-journey.svg';

import {
  Grid,
  Button,
  Typography,
  Hidden
} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';

import style from './Landing.style';

import {ReactComponent as Plans} from '../assets/images/Landing/travel-plans.svg';
import heroImageUrl from '../assets/images/Landing/hero-img.png';

const getIntro = ()=>(
`Plan itinerary ahead has never been an easy task for majority of people. Have a list of places you want to visit but don’t know where to begin with?  Spend too much time on planning for a trip that you can enjoy and never forgot?

Trip planner is here to assist and help you to create a itinerary easily. Trip planner can help you to

- Manage your trips
- Orginize places
- Schedule for each day
`
)

const steps = [
  {
      label:'Create',
      icon:<Create />
  },
  {
      label:'Plan',
      icon:<Plan />
  },
  {
      label:'Travel',
      icon:<Travel />
  },
]

const Landing = () => {
  const classes = makeStyles(style)();

  return( 
    <div>
      <Hero imageUrl={heroImageUrl} title='Plan your journey'/>
      <Section title='Organize trip & Start your adventure' content={
        <Grid container spacing={0}>
            <Grid item sm={12} md={6}>
                <div>
                    <FTypography text={getIntro()} variant='body1' />
                </div>
            </Grid>
            <Grid item xs={12} md={6}>
                <div className={classes.hCenter}>
                    <Plans />
                </div>
            </Grid>
            <Grid item xs={12}>
                <div className={classes.hCenter}>
                    <Button variant='contained' color='secondary' size='large'>
                      <Typography variant='h6'>Get Started</Typography>
                    </Button>
                </div>
            </Grid>
        </Grid>
      } /> 
      <Section title='How does it work' content={
        <div>
          <Hidden mdDown>
            <TPStepper steps={steps} connector={<Connector />} stepIcon={SVGStepIcon} />
          </Hidden>
          <Hidden lgUp>
            <TPMobileStepper steps={steps} />
          </Hidden>
        </div>
      } />
    </div>
  );
  
};

export default Landing;
