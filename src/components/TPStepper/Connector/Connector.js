import {StepConnector} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

export default withStyles({
    alternativeLabel: {
        top: '50%',
        left: 'calc(-50% + 110px)',
        right: 'calc(50% + 110px)',
    },
    active: {
        '& $line': {
            visibility:'visible',
            backgroundColor:'black',
            width:'0%'
        },
    },
    completed: {
        '& $line': {
            visibility:'visible',
            backgroundColor:'black',
            width:'100%',
            transition: 'width 1s ease-in-out'
        },
    },
    line: {
        visibility:'hidden',
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);