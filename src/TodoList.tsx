import {AddTitleInput} from "./components/AddTitleInput";
import {TodoTitle} from "./components/TodoTitle";
import {FilterBlock} from "./components/FilterBlock";
import {Task} from "./components/Task";
import {useDispatch} from "react-redux";
import {FilterValues, TaskType} from "./App";
import {AddNewTaskAC, ChangeStatusAC, RemoveTaskAC, UpdateTaskAC} from "./state/tasksReducer";
import React, {useCallback} from "react";

type PropsType = {
    tasks: TaskType[]
    todoID: string
    title: string
    removeTodoList: () => void
    editTodoTitle: (title: string) => void
    filter: FilterValues
}
export const TodoList = React.memo(({
                                        tasks, todoID, title, filter, removeTodoList, editTodoTitle
                                    }: PropsType) => {
    console.log(`todoList ${title} was rendered`)
    const dispatch = useDispatch();
    let tasksForTodo = tasks;
    if (filter === 'active') {
        tasksForTodo = tasksForTodo.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodo = tasksForTodo.filter(t => t.isDone)
    }
    const removeTask = useCallback((taskID: string) => {
        dispatch(RemoveTaskAC(todoID, taskID));
    }, [dispatch, todoID])
    const changeTaskStatus = useCallback((taskID: string, isDone: boolean) => {
        dispatch(ChangeStatusAC(todoID, taskID, isDone));
    }, [dispatch, todoID])
    const addNewTask = useCallback((title: string) => {
        dispatch(AddNewTaskAC(todoID, title));
    }, [dispatch, todoID])
    const editTaskTitle = useCallback((taskID: string, title: string) => {
        dispatch(UpdateTaskAC(todoID, taskID, title));
    }, [dispatch, todoID])

    const mappedTasks = tasksForTodo.map(t=> <Task key={t.id}
                                                   changeTaskStatus={(isDone)=>changeTaskStatus(t.id, isDone)}
                                                   editTaskTitle={(title)=>editTaskTitle(t.id, title)}
                                                   removeTask={()=>removeTask(t.id)}
                                                   isDone={t.isDone} title={t.title} />)
    return (
        <div>
            <TodoTitle title={title} editTodoTitle={editTodoTitle} removeTodoList={removeTodoList} />
            <AddTitleInput callback={addNewTask}/>
            <div>
                {mappedTasks}
            </div>
            <FilterBlock filter={filter} todoID={todoID} />
        </div>
    )
})