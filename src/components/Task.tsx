import * as React from 'react';
import {Checkbox, IconButton, Paper} from "@mui/material";
import {SpanWithEditMode} from "./SpanWithEditMode";
import DeleteIcon from "@mui/icons-material/Delete";
import {ChangeEvent, useCallback} from "react";

type PropsType = {
    changeTaskStatus: (isDone: boolean) => void
    editTaskTitle: (title: string) => void
    removeTask: () => void
    isDone: boolean
    title: string
}

export const Task = React.memo(({editTaskTitle, changeTaskStatus, removeTask, isDone, title}: PropsType) => {
    const onChangeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(e.currentTarget.checked)
    }, [changeTaskStatus]) ;
    return (
        <Paper className={isDone ? 'is-done' : ''}
               style={{margin: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Checkbox onChange={onChangeStatus} checked={isDone}/>
            <SpanWithEditMode title={title} callback={editTaskTitle}/>
            <IconButton onClick={removeTask} aria-label="delete" size="small">
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </Paper>
    );
})