import React from 'react';

import {makeStyles, createStyles} from '@material-ui/core/styles';
import InputField from "../../components/InputField/InputField";
import { Search } from "@material-ui/icons";
import classNames from 'classnames';

type IProps = {
    onSearchChanged?:(keyword:string)=>void;
    leftToolButtons?:Array<React.ReactNode>;
    rightToolButtons?:Array<React.ReactNode>;
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

const renderToolButtons = (buttons:React.ReactNode[], left:boolean)=>{
    const classes = makeStyles(style)();
    const cls = classNames(
        left?classes.rPadding:classes.lPadding
    )
    return buttons.map((btn,i)=>{
        return (<div className={cls} key={i}>{btn}</div>);
    });
}

const ManagerTool = React.forwardRef<Ref, IProps>((props, ref) => {

    const {
        onSearchChanged,
        leftToolButtons=Array<React.ReactNode>(),
        rightToolButtons=Array<React.ReactNode>(),
    } = props
    const classes = makeStyles(style)();

    const handleInputChange = (evt)=>{
        if(onSearchChanged) onSearchChanged(evt.target.value);
    }

    return (
        <div ref={ref} className={classes.tool}>
            <div className={classes.toolArea}>
                <div className={classes.leftTool}>
                    {renderToolButtons(leftToolButtons, true)}
                </div>
                <div className={classes.centerTool}>
                    <InputField
                    placeholder="Trip name"
                    variant="outlined"
                    labelBgColor="rgba(0,0,0,0)"
                    startAdornment={<Search />}
                    onChange={handleInputChange}
                    />
            </div>
            <div className={classes.rightTool}>
                {renderToolButtons(rightToolButtons, false)}
            </div>
          </div>
        </div>
    );
});

export default ManagerTool;