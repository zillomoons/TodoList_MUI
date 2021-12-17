import {TaskPriorities, tasksAPI, TaskStatuses, TaskType} from "../api/tasks-api";
import {addTodoAC, removeTodoAC, setTodolists} from "./todoListsReducer";
import {Dispatch} from "redux";
import {AppRootState} from "../store/store";


const initialState: TasksType = {};

export const tasksReducer = (state = initialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoID]: state[action.todoID].filter(t => t.id !== action.taskID)};
        case 'UPDATE-TASK':
            return {
                ...state, [action.todoID]: state[action.todoID].map(t => t.id === action.taskID
                    ? {...t, ...action.model} : t)
            }
        case 'ADD-NEW-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case 'ADD-NEW-TODOLIST':
            return {...state, [action.todo.id]: []}
        case "REMOVE-TODOLIST":
            let newState = {...state};
            delete newState[action.todoID]
            return newState;
        case "SET-TODOLISTS":
            let copy = {...state};
            action.todolists.forEach(todo => {
                return copy[todo.id] = []
            })
            return copy;
        case "SET-TASKS":
            return {...state, [action.todoID]: action.tasks};
        default:
            return state;
    }
}
// Action creators
export const removeTaskAC = (todoID: string, taskID: string) => {
    return {type: "REMOVE-TASK", todoID, taskID} as const
}
export const updateTaskAC = (todoID: string, taskID: string, model: UpdateTaskEntityModelType) => {
    return {type: "UPDATE-TASK", todoID, taskID, model} as const
}
export const addNewTaskAC = (task: TaskType) => {
    return {type: "ADD-NEW-TASK", task} as const
}
export const setTasks = (todoID: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todoID, tasks} as const);

// Thunk creators
export const getTasks = (todoID: string) => async (dispatch: Dispatch) => {
    const { data } = await tasksAPI.getTasks(todoID);
    dispatch(setTasks(todoID, data.items));
}
export const deleteTask = (todoID: string, taskID: string) => async (dispatch: Dispatch) => {
    const { data } = await tasksAPI.deleteTask(todoID, taskID);

    if (data.resultCode === 0) {
        dispatch(removeTaskAC(todoID, taskID));
    }
}
export const createTask = (todoID: string, title: string) => async (dispatch: Dispatch) => {
    const {data} = await tasksAPI.createTask(todoID, title);

    if (data.resultCode === 0) {
        dispatch(addNewTaskAC(data.data.item));
    }
}
export const updateTask = (todoID: string, taskID: string, model: UpdateTaskEntityModelType) => async (dispatch: Dispatch, getState: () => AppRootState) => {
    let tasks = getState().tasks
    let task = tasks[todoID].find(t => t.id === taskID);

    if (task){
        const { data } = await tasksAPI.updateTask(todoID, taskID, {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...model,
        });
        if (data.resultCode === 0){
            dispatch(updateTaskAC(todoID, taskID, model));
        }
    }
}
//Types
export type TasksType = {
    [key: string]: TaskType[]
}
type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addNewTaskAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof removeTodoAC>
    | ReturnType<typeof setTodolists>
    | ReturnType<typeof setTasks>

type UpdateTaskEntityModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}