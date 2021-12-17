import axios from "axios";

const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY as string,

    }
})
export const todolistAPI = {
    getTodolists() {
        return instanse.get<TodolistType[]>('todo-lists')
    },
    deleteTodolist(todoID: string) {
        return instanse.delete<ResponseType>(`todo-lists/${todoID}`)
    },
    createTodolist(title: string) {
        return instanse.post<ResponseType< {item: TodolistType} >>(`todo-lists`, {title})
    },
    updateTodolist(todoID: string, title: string){
        return instanse.put<ResponseType>(`todo-lists/${todoID}`, {title})
    }

}
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: D
}