import React from 'react';

import TPDialog from './TPDialog';

import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../../themes/defaultTheme';
import { Button, Link } from '@material-ui/core';

export default {
    title:'TPDialog'
}

export const Default = ()=>{
    const [open, setOpen] = React.useState(false);
    const toggleDialog = ()=>setOpen(!open);

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Button onClick={toggleDialog}>Open</Button>
            </div>
            <TPDialog title='Dialog' 
            open={open} 
            fullWidth={true} 
            maxWidth='lg' 
            onClose={toggleDialog}
            footers={[
                <Link variant='h6' href='#'>This is a long link text</Link>,
                <Link variant='h6' href='#'>Short link text</Link>,
            ]}
            >
            this is content of Dialog
            </TPDialog>
        </ThemeProvider>
    )
}