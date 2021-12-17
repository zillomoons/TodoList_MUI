import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Grid, Icon, TextField} from "@mui/material";
import {AddCircle} from "@mui/icons-material";

type PropsType = {
    callback: (value: string) => void
}

export const AddTitleInput = React.memo(({callback}: PropsType) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState(false)
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const addTask = () => {
        if (newTitle.trim()) {
            callback(newTitle)
            setNewTitle('')
        } else {
            setError(true)
        }
    }
    const addWithEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        e.key === 'Enter' && addTask()
    }
    return (
        <Grid container style={{display: 'flex', justifyContent: 'space-evenly',
            alignItems: 'center', marginBottom: '15px'}}>
            <TextField variant="outlined" value={newTitle}
                       label="Title" error={error}
                       size="small" helperText={error ? 'Title is required' : ''}
                       onChange={onChangeTitle}
                       onKeyPress={addWithEnter}/>
            <Icon onClick={addTask} color="primary"><AddCircle /></Icon>
        </Grid>
    )
})