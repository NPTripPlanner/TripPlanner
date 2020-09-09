import React from 'react';

import {makeStyles, createStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

type IProps = {
    leftTools?:Array<React.ReactNode>;
    centerTools:Array<React.ReactNode>;
    rightTools?:Array<React.ReactNode>;
}
type Ref = HTMLDivElement;

const style = createStyles({
    tool: {
        width:'100%',
        display: "flex",
        flexDirection:'column',
        justifyContent: "center",
        alignItems: "center",
        padding:'2%',
        paddingTop:0,
    },
    lPadding:{
        paddingLeft:'2%',
    },
    rPadding:{
        paddingRight:'2%',
    },
    toolArea:{
        width:'100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    centerTool:{
        width:'calc(100%/3)',
        textAlign:'center',
    },
    leftTool:{
        width:'calc(100%/3)',
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    rightTool:{
        width:'calc(100%/3)',
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
    },
});

const renderTools = (buttons:React.ReactNode[], padding:'left'|'right'|'both')=>{
    const classes = makeStyles(style)();
    const padBoth = classNames(classes.lPadding, classes.rPadding);

    return buttons.map((btn,i)=>{
        switch(padding){
            case 'left':{
                return (<div className={classes.lPadding} key={i}>{btn}</div>);
            }
            case 'right':{
                return (<div className={classes.rPadding} key={i}>{btn}</div>);
            }
            default:{
                return (<div className={padBoth} key={i}>{btn}</div>);
            }
        }
        
    });
}

const LayoutTool = React.forwardRef<Ref, IProps>((props, ref) => {

    const {
        leftTools=Array<React.ReactNode>(),
        centerTools,
        rightTools=Array<React.ReactNode>(),
    } = props
    const classes = makeStyles(style)();

    return (
        <div ref={ref} className={classes.tool}>
            <div className={classes.toolArea}>
                <div className={classes.leftTool}>
                    {renderTools(leftTools, 'right')}
                </div>
                <div className={classes.centerTool}>
                {renderTools(centerTools, 'both')}
                </div>
                <div className={classes.rightTool}>
                    {renderTools(rightTools, 'left')}
                </div>
          </div>
        </div>
    );
});

export default LayoutTool;