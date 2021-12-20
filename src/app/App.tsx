import React, {useCallback, useEffect} from "react";
import './App.css';
import {TodoList} from "../features/todolist/TodoList";
import {AddTitleInput} from "../components/AddTitleInput";
import {Header} from "../components/Header";
import {Container, Grid, Paper} from "@mui/material";
import {createTodolist, getTodolists, TodoListEntityType} from "../state/todoListsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../store/store";
import {TasksType} from "../state/tasksReducer";
import {ErrorSnackbar} from "../components/errorSnackbar/ErrorSnackbar";


export const App = React.memo(() => {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, TodoListEntityType[]>(state => state.todoLists);
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasks);
    useEffect(()=>{
        dispatch(getTodolists());
    }, [dispatch])

    const addNewTodoList = useCallback((title: string) => {
        dispatch(createTodolist(title));
    }, [dispatch])


    const mappedTodoLists = todoLists.map(todo => {
            return <Grid item  key={todo.id}>
                <Paper style={{padding: '20px'}}>
                    <TodoList title={todo.title}
                              tasks={tasks[todo.id]}
                              todoID={todo.id}
                              filter={todo.filter}
                    />
                </Paper>
            </Grid>
        }
    )
    return (
        <div className={'App'}>
            <ErrorSnackbar />
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