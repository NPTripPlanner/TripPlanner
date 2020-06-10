import {createMuiTheme} from '@material-ui/core/styles';

export default createMuiTheme({
    typography:{
        fontFamily:[
            'Open Sans,sans-serif',
            'Merienda,cursive',
            'Merienda One,cursive'].join(','),
        h3:{
            fontFamily:'Merienda,cursive',
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