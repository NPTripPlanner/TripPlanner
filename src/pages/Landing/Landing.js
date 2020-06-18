import React from "react";

import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import FTypography from '../../components/FTypography/FTypography';
import TPStepper from '../../components/TPStepper/TPStepper';
import Connector from '../../components/TPStepper/Connector/Connector';
import SVGStepIcon from '../../components/TPStepper/SVGStepIcon/SVGStepIcon';
import TPMobileStepper from '../../components/TPMobileStepper/TPMobileStepper';
import TPDialog from '../../components/TPDialog/TPDialog';
import LoginForm from '../../Forms/LoginForm';
import SignupForm from '../../Forms/SignupForm';
import ForgotPassForm from '../../Forms/ForgotPassForm';

import steps  from './Steps';
import dialogId from './DialogId';

import heroImageUrl from '../../assets/images/Landing/hero-img.png';
import {ReactComponent as Plans} from '../../assets/images/Landing/travel-plans.svg';

import {
  Grid,
  Button,
  Typography,
  Hidden,
  Link
} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';

import style from './Landing.style';


const getIntro = ()=>(
`Plan itinerary ahead has never been an easy task for majority of people. Have a list of places you want to visit but don’t know where to begin with?  Spend too much time on planning for a trip that you can enjoy and never forgot?

Trip planner is here to assist and help you to create a itinerary easily. Trip planner can help you to

- Manage your trips
- Orginize places
- Schedule for each day
`
)

const Landing = () => {
  const classes = makeStyles(style)();

  const [presentDialog, setPresentDialog] = React.useState('');

  const handleDialog = (id, title, content, links)=>(presentId)=>(
    <TPDialog title={title} 
    open={id===presentId} 
    fullWidth={true} 
    maxWidth='lg' 
    footers={links}
    onClose={()=>setPresentDialog('')}
    >
    {content}
    </TPDialog>
  )

  const handleLogin = ()=>setPresentDialog(dialogId.login);

  return(
    <React.Fragment> 
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
                    <Button variant='contained' color='secondary' size='large' onClick={handleLogin}>
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
    {
      handleDialog(dialogId.login, 'Login', <LoginForm />, [
        <Link key='1' onClick={()=>setPresentDialog(dialogId.signup)}>I dont have an account</Link>,
        <Link key='2' onClick={()=>setPresentDialog(dialogId.forgotPass)}>Forgot password?</Link>,
      ])(presentDialog)
    }
    {
      handleDialog(dialogId.signup, 'Signup', <SignupForm />, [
        <Link key='1' onClick={()=>setPresentDialog(dialogId.login)}>I have an account</Link>,
      ])(presentDialog)
    }
    {
      handleDialog(dialogId.forgotPass, 'Forgot Password', <ForgotPassForm />, [
        <Link key='1' onClick={()=>setPresentDialog(dialogId.login)}>I have an account</Link>,
        <Link key='2' onClick={()=>setPresentDialog(dialogId.signup)}>I dont have an account</Link>,
      ])(presentDialog)
    }
    </React.Fragment>
  );
  
};

export default Landing;
