import React from 'react';
import TPDialog from "../components/TPDialog/TPDialog";

export const CreateDialog = (
    title:string,
    content:React.ReactNode,
    maxWidth:string='lg',
    footers:Array<React.ReactNode>=Array<React.ReactNode>(),
    onClose:()=>void = ()=>{},
    )=>(

    <TPDialog
    title={title}
    isOpen={true}
    fullWidth={true}
    maxWidth={maxWidth}
    footers={footers}
    onClose={onClose}
    >
    {content}
    </TPDialog>
);
