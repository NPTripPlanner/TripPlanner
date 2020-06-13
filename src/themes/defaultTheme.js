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
            main:'#bbded6',
            light:'#fff'
        },
        secondary:{
            main:'#6C63FF'
        }
    },
    overrides:{
        MuiAvatar:{
            colorDefault:{
                backgroundColor:'transparent'
            }
        },
        MuiButton:{
            root:{
                borderRadius:100
            }
        },
        MuiStepLabel:{
            iconContainer:{
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            },
        },
    }
});


export default responsiveFontSizes(theme);