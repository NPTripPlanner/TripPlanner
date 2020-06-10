import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography:{
        fontFamily:[
            'Open Sans,sans-serif',
            'Merienda,cursive',
            'Merienda One,cursive'
        ].join(','),
        h4:{
            fontFamily:'Merienda,cursive',
            '@media (max-width:430px)': {
                fontSize: '1.3rem',
            }
        }
    },
    palette:{
        primary:{
            main:'#bbded6'
        }
    },
    overrides:{
        MuiAvatar:{
            colorDefault:{
                backgroundColor:'transparent'
            }
        }
    }
});


export default responsiveFontSizes(theme);