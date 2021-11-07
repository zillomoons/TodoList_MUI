import {v1} from "uuid";
import {AddNewTodoAC, RemoveTodoListAC} from "./todoListsReducer";
import {TasksType} from "../App";


type ActionsType = ReturnType<typeof RemoveTaskAC> | ReturnType<typeof UpdateTaskAC> |
    ReturnType<typeof AddNewTaskAC> | ReturnType<typeof ChangeStatusAC> | ReturnType<typeof AddNewTodoAC>
    | ReturnType<typeof RemoveTodoListAC>

const initialState: TasksType = {};

export const tasksReducer = (state = initialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoID]: state[action.todoID].filter(t => t.id !== action.taskID)};
        case 'UPDATE-TASK-TITLE':
            return {
                ...state, [action.todoID]: state[action.todoID].map(t => t.id === action.taskID
                    ? {...t, title: action.title} : t)
            }
        case 'ADD-NEW-TASK':
            return {
                ...state,
                [action.todoID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoID]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todoID]: state[action.todoID].map(t => t.id === action.taskID
                    ? {...t, isDone: action.isDone} : t)
            }
        case 'ADD-NEW-TODOLIST':
            return {...state, [action.todoID]: []}
        case "REMOVE-TODOLIST":
            let newState = {...state};
            delete newState[action.todoID]
            return newState;
        default:
            return state;
    }
}

export const RemoveTaskAC = (todoID: string, taskID: string) => {
    return {type: "REMOVE-TASK", todoID, taskID} as const
}
export const UpdateTaskAC = (todoID: string, taskID: string, title: string) => {
    return {type: "UPDATE-TASK-TITLE", todoID, taskID, title} as const
}
export const AddNewTaskAC = (todoID: string, title: string) => {
    return {type: "ADD-NEW-TASK", todoID, title} as const
}
export const ChangeStatusAC = (todoID: string, taskID: string, isDone: boolean) => {
    return {type: "CHANGE-TASK-STATUS", todoID, taskID, isDone} as const
}