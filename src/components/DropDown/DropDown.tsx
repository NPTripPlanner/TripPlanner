import React from "react";

import { addPropsToComponent } from "../../utils/react.utils";

import {
  Popover,
  Paper,
  MenuList,
  MenuItem,
  Typography,
} from "@material-ui/core";

export interface Item {
  title: string;
  onClick: ()=>void;
}

type IProps = {
  icon: any;
  dropdownItems?: Array<Item>;
  onItemClicked?: (i:number)=>void;
}

const DropDown = (props:IProps) => {
    const {
      icon,
      dropdownItems = Array<Item>(),
      onItemClicked = null,
    } = props;

    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setOpen(true);
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setOpen(false);
      setAnchorEl(null);
    };

    const handleItemClick = (index) => {
      handleClose();
      if (onItemClicked) onItemClicked(index);
    };

    return (
      <div>
        {addPropsToComponent(icon, { onClick: handleClick })}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Paper>
            <MenuList>
              {dropdownItems.map((item, i) => {
                return (
                  <MenuItem key={i} onClick={() => handleItemClick(i)}>
                    <Typography variant="h6">{item.title}</Typography>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Paper>
        </Popover>
      </div>
    );
};

export default DropDown;
