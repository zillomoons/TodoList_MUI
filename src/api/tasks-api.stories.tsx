import { useState} from "react";
import {tasksAPI} from "./tasks-api";

export default {
    title: 'API/tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState('')

    const getTasks = () => {
        tasksAPI.getTasks(value).then(res=>setState(res.data))
    }
    return <>
        <div>
            <input placeholder='todoID' value={value} onChange={e=>setValue(e.target.value)}/>
            <button onClick={getTasks}>get tasks</button>
        </div>
        {JSON.stringify(state)}
    </>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState('')
    const [taskID, setTaskID] = useState('')

    const deleteTask = () => {
        tasksAPI.deleteTask(todoID, taskID).then(res=>setState(res.data))
    }
    return <>
        <div>
            <input placeholder='todoID' value={todoID} onChange={e=>setTodoID(e.target.value)}/>
            <input placeholder='taskID' value={taskID} onChange={e=>setTaskID(e.target.value)}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
        {JSON.stringify(state)}
    </>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState('')
    const [title, setTitle] = useState('')

    const createTask = () => {
        tasksAPI.createTask(todoID, title).then(res=>setState(res.data))
    }
    return <>
        <div>
            <input placeholder='todoID' value={todoID} onChange={e=>setTodoID(e.target.value)}/>
            <input placeholder='title' value={title} onChange={e=>setTitle(e.target.value)}/>
            <button onClick={createTask}>create task</button>
        </div>
        {JSON.stringify(state)}
    </>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState('')
    const [taskID, setTaskID] = useState('')
    const [title, setTitle] = useState('')

    const updateTask = () => {
        tasksAPI.updateTask(todoID, taskID, {
            title: title,
            description: '',
            status: 0,
            priority: 0,
            startDate: '',
            deadline: ''
        }).then(res=>setState(res.data))
    }
    return <>
        <div>
            <input placeholder='todoID' value={todoID} onChange={e=>setTodoID(e.target.value)}/>
            <input placeholder='taskID' value={taskID} onChange={e=>setTaskID(e.target.value)}/>
            <input placeholder='title' value={title} onChange={e=>setTitle(e.target.value)}/>
            <button onClick={updateTask}>update task</button>
        </div>
        {JSON.stringify(state)}
    </>
}