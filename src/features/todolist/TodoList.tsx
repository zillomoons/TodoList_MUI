import {AddTitleInput} from "../../components/AddTitleInput";
import {TodoTitle} from "../../components/TodoTitle";
import {FilterBlock} from "../../components/FilterBlock";
import {Task} from "./task/Task";
import {useDispatch} from "react-redux";
import { createTask, getTasks} from "../../state/tasksReducer";
import React, {useCallback, useEffect} from "react";
import {FilterValues} from "../../state/todoListsReducer";
import {TaskStatuses, TaskType} from "../../api/tasks-api";

type PropsType = {
    tasks: TaskType[]
    todoID: string
    title: string
    filter: FilterValues
}

export const TodoList = React.memo(({tasks, todoID, title, filter}: PropsType) => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getTasks(todoID));

    }, [dispatch, todoID])

    let tasksForTodo = tasks;
    if (filter === 'active') {
        tasksForTodo = tasksForTodo.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodo = tasksForTodo.filter(t => t.status === TaskStatuses.Completed)
    }

    const addNewTask = useCallback((title: string) => {
        dispatch(createTask(todoID, title));
    }, [dispatch, todoID])

    const mappedTasks = tasksForTodo.map(t=> <Task key={t.id} taskID={t.id} todoID={todoID} status={t.status} title={t.title} />)
    return (
        <div>
            <TodoTitle title={title} todoID={todoID}/>
            <AddTitleInput callback={addNewTask}/>
            <div>
                {mappedTasks}
            </div>
            <FilterBlock filter={filter} todoID={todoID} />
        </div>
    )
})