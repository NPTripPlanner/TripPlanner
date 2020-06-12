import React from 'react';

import {
    Grid,
    Typography
} from '@material-ui/core';
import Section from './Section';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../../themes/defaultTheme';
import {ReactComponent as Plans} from '../../assets/images/Landing/travel-plans.svg';

export default{
    title:'Section'
}

export const Default = ()=>{
    return(
        <ThemeProvider theme={theme}>
            <Section title='Section title' content='content is here' />
        </ThemeProvider>
    )
}

export const Content = ()=>{

    const getText = ()=>(
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Dictum non consectetur a erat nam at. Porttitor leo a diam sollicitudin tempor. Eu ultrices vitae auctor eu augue ut. In fermentum posuere urna nec tincidunt praesent semper feugiat. Quis imperdiet massa tincidunt nunc pulvinar. Amet dictum sit amet justo donec enim. Bibendum neque egestas congue quisque egestas diam in. Cursus eget nunc scelerisque viverra mauris. Aliquam eleifend mi in nulla posuere sollicitudin aliquam. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris. In est ante in nibh mauris cursus mattis molestie a. Sollicitudin nibh sit amet commodo nulla. Tristique senectus et netus et malesuada fames ac turpis egestas.
         
        In cursus turpis massa tincidunt. Neque gravida in fermentum et. Lobortis mattis aliquam faucibus purus in massa tempor nec. Morbi quis commodo odio aenean. Molestie ac feugiat sed lectus vestibulum. Risus nullam eget felis eget nunc lobortis. Erat imperdiet sed euismod nisi porta lorem mollis aliquam. Quam id leo in vitae turpis massa sed. Nullam eget felis eget nunc lobortis mattis aliquam. Tellus id interdum velit laoreet id donec. Ultricies lacus sed turpis tincidunt. In dictum non consectetur a erat. In eu mi bibendum neque egestas. A cras semper auctor neque vitae tempus quam pellentesque nec.
        
        Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Non quam lacus suspendisse faucibus interdum posuere lorem. Aenean euismod elementum nisi quis eleifend quam adipiscing. Id neque aliquam vestibulum morbi blandit cursus risus at ultrices. Vestibulum mattis ullamcorper velit sed ullamcorper. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Elementum tempus egestas sed sed risus pretium quam. Odio aenean sed adipiscing diam donec adipiscing. Orci ac auctor augue mauris augue neque gravida in fermentum. Feugiat in ante metus dictum at. Donec massa sapien faucibus et molestie. Eget lorem dolor sed viverra ipsum. Bibendum enim facilisis gravida neque convallis a. Sit amet cursus sit amet dictum. Tellus cras adipiscing enim eu turpis egestas pretium aenean. Sagittis nisl rhoncus mattis rhoncus urna. Dignissim sodales ut eu sem integer vitae justo. Et leo duis ut diam quam nulla porttitor massa.
        
        Mi eget mauris pharetra et ultrices neque ornare aenean. Feugiat in fermentum posuere urna nec tincidunt praesent semper. Sit amet justo donec enim. Metus vulputate eu scelerisque felis. Eu facilisis sed odio morbi quis. Et tortor at risus viverra adipiscing at in tellus integer. Pulvinar pellentesque habitant morbi tristique senectus et. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Nibh praesent tristique magna sit amet purus gravida quis blandit. Suspendisse in est ante in. A diam sollicitudin tempor id eu nisl nunc. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Et malesuada fames ac turpis.
        
        Gravida neque convallis a cras. Pellentesque elit eget gravida cum sociis. Lorem ipsum dolor sit amet consectetur adipiscing elit ut. Fames ac turpis egestas integer eget aliquet nibh. Nunc mattis enim ut tellus elementum sagittis vitae. Commodo ullamcorper a lacus vestibulum sed arcu non odio. Lacinia quis vel eros donec ac odio tempor orci. Et magnis dis parturient montes nascetur. Id leo in vitae turpis. Augue neque gravida in fermentum et. Ullamcorper malesuada proin libero nunc. Sit amet mauris commodo quis imperdiet massa tincidunt nunc. Volutpat sed cras ornare arcu dui vivamus arcu. Tellus orci ac auctor augue mauris augue neque gravida in. Tempus imperdiet nulla malesuada pellentesque. Turpis egestas integer eget aliquet nibh praesent.`
    )
    const getContent = ()=>{
       return( 
        <Grid container spacing={4}>
            <Grid item md={12} lg={6}>
                <div>
                    <pre style={{whiteSpace:'pre-wrap', margin:'0 0'}}><Typography variant='body1'>{getText()}</Typography></pre>
                </div>
            </Grid>
            <Grid item  md={12} lg={6}>
                <div style={{textAlign:'center'}}>
                    <Plans />
                </div>
            </Grid>
        </Grid>
       )
    }

    return(
        <ThemeProvider theme={theme}>
            <Section title='Section title' content={getContent()} />
        </ThemeProvider>
    )
}