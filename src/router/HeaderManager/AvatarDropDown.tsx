import React from 'react';
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/user/user.selector";
import {
    Typography,
    Avatar
} from '@material-ui/core';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import DropDown, {Item} from "../../components/DropDown/DropDown";

type IProps = {
    items:Array<Item>;
}

const style = (theme) => createStyles({
    avatar: {
      backgroundColor: theme.palette.secondary.main,
      "&:hover": {
        cursor: "pointer",
      },
    },
});

const AvatarDropDown = (props:IProps) => {
    const {items} = props;
    const classes = makeStyles(style)();

    const user = useSelector(selectUserInfo);

    const handleItemClick = (index) => {
      items[index].onClick();
    };
  
    return (
      <DropDown
        icon={
          <Avatar className={classes.avatar}>
            <Typography variant="h6">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : " "}
            </Typography>
          </Avatar>
        }
        dropdownItems={items}
        onItemClicked={handleItemClick}
      />
    );
};

export default AvatarDropDown;