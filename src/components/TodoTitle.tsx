import {SpanWithEditMode} from "./SpanWithEditMode";
import {Grid, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useCallback} from "react";
import {deleteTodolist, updateTodoAC} from "../state/todoListsReducer";
import {useDispatch} from "react-redux";

type PropsType = {
    title: string
    todoID: string
}

export const TodoTitle = React.memo(({title, todoID}: PropsType) => {
    const dispatch = useDispatch();

    const removeTodoList = () => {
        dispatch(deleteTodolist(todoID));
    }

    const editTodoTitle = useCallback((title: string) => {
        dispatch(updateTodoAC(todoID, title));
    }, [dispatch, todoID])

    return <Grid container style={{display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', fontSize: '28px', fontWeight: 'bold', marginBottom: '15px'}}>
        <SpanWithEditMode title={title} callback={editTodoTitle}/>
        <IconButton onClick={removeTodoList} aria-label="delete">
            <DeleteIcon fontSize="small"/>
        </IconButton>
    </Grid>

})