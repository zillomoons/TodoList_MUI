import * as React from 'react';
import {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton, Paper} from "@mui/material";
import {SpanWithEditMode} from "../../../components/SpanWithEditMode";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteTask, updateTask} from "../../../state/tasksReducer";
import {useDispatch} from "react-redux";
import {TaskStatuses} from "../../../api/tasks-api";

type PropsType = {
    todoID: string
    taskID: string
    status: TaskStatuses
    title: string
}

export const Task = React.memo(({ todoID, taskID, status, title}: PropsType) => {
    const dispatch = useDispatch();

    const removeTask = () => {
        dispatch(deleteTask(todoID, taskID));
    }
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTask(todoID, taskID, {status: e.target.checked ? TaskStatuses.Completed : TaskStatuses.New}));
    }
    const editTaskTitle = useCallback(( title: string) => {
        dispatch(updateTask(todoID, taskID, {title}));
    }, [dispatch, todoID, taskID])


    return (
        <Paper className={status === TaskStatuses.Completed ? 'is-done' : ''}
               style={{margin: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Checkbox onChange={onChangeStatus} checked={status === TaskStatuses.Completed}/>
            <SpanWithEditMode title={title} callback={editTaskTitle}/>
            <IconButton onClick={removeTask} aria-label="delete" size="small">
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </Paper>
    );
})