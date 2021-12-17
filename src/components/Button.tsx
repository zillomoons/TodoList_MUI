import { Button } from "@mui/material";
import React from "react";
import {FilterValues} from "../state/todoListsReducer";

type PropsType={
    name: string
    callback: ()=>void
    filter?: FilterValues
}

export const MyButton = React.memo(({name, callback, ...props}:PropsType) =>{
    return <>
        <Button size={'small'} variant={ props.filter === name? 'outlined' : 'text'} onClick={callback}>{name}</Button>
    </>
})