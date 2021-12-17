import {useEffect, useState} from "react";
import {todolistAPI} from "./todolist-api";

export default {
    title: 'API/todolist'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(()=> {
       todolistAPI.getTodolists().then(res=> setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)} </div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')

    const createTodo = () => {
        todolistAPI.createTodolist(title).then(res=> setState(res.data))
    }
    return (
        <>
            <div>
                <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                <button onClick={createTodo}>create todolist</button>
            </div>
            {JSON.stringify(state)}
        </>
    )
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState('')
    const deleteTodo = () => {
        todolistAPI.deleteTodolist(value).then(res=>setState(res.data))
    }
    return (
        <>
            <div>
                <input placeholder={'todoID'} value={value} onChange={e=>setValue(e.target.value)}/>
                <button onClick={deleteTodo}>delete todolist</button>
            </div>
            {JSON.stringify(state)}
        </>
    )
}
export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState('')
    const [title, setTitle] = useState('')
    const updateTodo = () => {
        todolistAPI.updateTodolist(value, title).then(res=>setState(res.data))
    }
    return (
        <>
            <div>
                <input placeholder={'todoID'} value={value} onChange={e=>setValue(e.target.value)}/>
                <input placeholder={'new title'} value={title} onChange={e=>setTitle(e.target.value)}/>
                <button onClick={updateTodo}>update todolist</button>
            </div>
            {JSON.stringify(state)}
        </>
    )
}