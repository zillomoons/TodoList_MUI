import {SpanWithEditMode} from "./SpanWithEditMode";
import {Grid, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useCallback} from "react";

type PropsType = {
    title: string
    editTodoTitle: (title: string) => void
    removeTodoList: () => void
}

export const TodoTitle = React.memo(({title, editTodoTitle, removeTodoList}: PropsType) => {
    return <Grid container style={{display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', fontSize: '28px', fontWeight: 'bold', marginBottom: '15px'}}>
        <SpanWithEditMode title={title} callback={useCallback(editTodoTitle, [editTodoTitle])}/>
        <IconButton onClick={removeTodoList} aria-label="delete">
            <DeleteIcon fontSize="small"/>
        </IconButton>
    </Grid>

})