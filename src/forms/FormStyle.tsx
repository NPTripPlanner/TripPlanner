import { createStyles } from "@material-ui/core";

export default theme=>createStyles({
    form:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
    },
    error:{
      color: 'red',
      textAlign:'center',
    },
    buttonGroup:{
      display:'flex',
      wrap:'wrap',
      justifyContent: 'center',
      alignItems:'center',
    },
    deleteButton:{
        backgroundColor: theme.palette.error.main,
    },
    centerText:{
      textAlign:'center'
    },
    marginHorizontal:{
      marginLeft:'1%',
      marginRight: '1%',
    }
});