import React from 'react';

import {addPropsToComponent} from '../../utils/react.utils';

import {
    Popover,
    Paper,
    MenuList,
    MenuItem
} from '@material-ui/core';

const DropDown = React.forwardRef(({
    icon,
    dropdownItems
},ref) => {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event)=>{
        setOpen(true);
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
    }

    return (
        <div ref={ref}>
            {addPropsToComponent(icon, {onClick:handleClick})}
            <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            >
                <Paper>
                    <MenuList>
                        <MenuItem>Item 1</MenuItem>
                    </MenuList>
                </Paper>
            </Popover>
        </div>
    );
});

export default DropDown;