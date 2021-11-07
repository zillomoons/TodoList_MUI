import {TextField} from "@mui/material";
import React, {ChangeEvent,KeyboardEvent, useState} from "react";

type PropsType = {
    title: string
    callback: (value: string)=>void
}

export const SpanWithEditMode = ({title, callback}: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState('')

    const activateEditMode = () =>{
        setEditMode(true)
        setValue(title)
    }
    const deactivateEditMode = () =>{
        setEditMode(false)
        value.trim() && callback(value)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>)=>{
        setValue(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>)=>{
        e.key === 'Enter' && deactivateEditMode();
    }

    return editMode
        ? <TextField variant="standard" value={value} onChange={onChangeTitle}
                     onKeyPress={onKeyPressHandler} onBlur={deactivateEditMode}
                     autoFocus size="small"/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
}