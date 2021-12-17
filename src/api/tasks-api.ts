import axios from "axios";

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY as string,
    }
})

export const tasksAPI = {
    getTasks(todoID: string) {
        return instanse.get<GetTasksResType>(`${todoID}/tasks`)
    },
    deleteTask(todoID: string, taskID: string){
        return instanse.delete<ResponseType>(`${todoID}/tasks/${taskID}`)
    },
    createTask(todoID: string, title: string) {
        return instanse.post<ResponseType<{item: TaskType}>>(`${todoID}/tasks`, {title})
    },
    updateTask(todoID: string, taskID: string, model: UpdateTaskModelType){
        return instanse.put(`${todoID}/tasks/${taskID}`, model)
    }
}
type GetTasksResType = {
    items: TaskType[]
    totalCount: number
    error: any
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: D
}
export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
