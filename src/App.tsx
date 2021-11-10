import React from "react";
import './App.css'
import {v1} from "uuid";
import {TodoList} from "./TodoList";
import {AddTitleInput} from "./components/AddTitleInput";
import {Header} from "./components/Header";
import {Container, Grid, Paper} from "@mui/material";
import {
    AddNewTodoAC,
    RemoveTodoListAC,
    UpdateTodoListAC
} from "./state/todoListsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store/store";


export type FilterValues = 'all' | 'active' | 'completed'

export type TaskType = { id: string, title: string, isDone: boolean }
export type TasksType = {
    [key: string]: TaskType[]
}
export type TodoListType = { id: string, title: string, filter: FilterValues }

export const App = () => {

    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, TodoListType[]>(state => state.todoLists);

    //function for todoLists
    const removeTodoList = (todoID: string) => {
        dispatch(RemoveTodoListAC(todoID));
    }
    const addNewTodoList = (title: string) => {
        dispatch(AddNewTodoAC(title));
    }
    const editTodoTitle = (todoID: string, title: string) => {
        dispatch(UpdateTodoListAC(todoID, title));
    }

    const mappedTodoLists = todoLists.map(todo => {
            return <Grid item  key={todo.id}>
                <Paper style={{padding: '20px'}}>
                    <TodoList title={todo.title}
                              todoID={todo.id}
                              removeTodoList={() => removeTodoList(todo.id)}
                              editTodoTitle={(title) => editTodoTitle(todo.id, title)}
                              filter={todo.filter}
                    />
                </Paper>
            </Grid>
        }
    )
    return (
        <div className={'App'}>
            <Header/>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddTitleInput callback={addNewTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {mappedTodoLists}
                </Grid>
            </Container>
        </div>
    )
}