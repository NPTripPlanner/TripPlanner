import {StepConnector} from '@material-ui/core';
import {withStyles, createStyles} from '@material-ui/core/styles';

const style = (theme)=>createStyles({
    alternativeLabel: {
        top: '50%',
        left: 'calc(-50% + 110px)',
        right: 'calc(50% + 110px)',
    },
    active: {
        '& $line': {
            visibility:'visible',
            backgroundColor:theme.palette.primary.main,
            width:'0%'
        },
    },
    completed: {
        '& $line': {
            visibility:'visible',
            backgroundColor:theme.palette.primary.main,
            width:'100%',
            transition: 'width 1s ease-in-out'
        },
    },
    line: {
        visibility:'hidden',
        height: 3,
        border: 0,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 1,
    },
});
export default withStyles(style)(StepConnector);