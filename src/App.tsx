import React, {useCallback} from "react";
import './App.css';
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

export const App = React.memo(() => {
    console.log('App rendered')
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, TodoListType[]>(state => state.todoLists);
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasks);

    //function for todoLists
    const removeTodoList = useCallback((todoID: string) => {
        dispatch(RemoveTodoListAC(todoID));
    }, [dispatch])
    const addNewTodoList = useCallback((title: string) => {
        dispatch(AddNewTodoAC(title));
    }, [dispatch])
    const editTodoTitle = useCallback((todoID: string, title: string) => {
        dispatch(UpdateTodoListAC(todoID, title));
    }, [dispatch])

    const mappedTodoLists = todoLists.map(todo => {
            return <Grid item  key={todo.id}>
                <Paper style={{padding: '20px'}}>
                    <TodoList title={todo.title}
                              tasks={tasks[todo.id]}
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
})