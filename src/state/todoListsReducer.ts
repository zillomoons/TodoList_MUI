import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

const initialState: TodoListEntityType[] = [];

export const todoListsReducer = (state = initialState, action: ActionsType): TodoListEntityType[] => {
    switch(action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter( todo => todo.id !== action.todoID);
        case 'UPDATE-TODOLIST-TITLE':
            return state.map(todo => todo.id === action.todoID ? {...todo, title: action.title} : todo)
        case 'ADD-NEW-TODOLIST':
            return [{...action.todo, filter: 'all' }, ...state];
        case 'CHANGE-FILTER':
            return state.map(todo => todo.id === action.todoID ? {...todo, filter: action.filter} : todo);
        case "SET-TODOLISTS":
            return action.todolists.map(todo => ({...todo, filter: 'all' as FilterValues}) );
        default:
            return state;
    }
}
//Action creators
export const removeTodoAC = (todoID: string) => {
    return {type: "REMOVE-TODOLIST", todoID} as const;
}
export const updateTodoAC = (todoID: string, title: string) => {
    return {type: "UPDATE-TODOLIST-TITLE", todoID, title} as const;
}
export const addTodoAC = (todo: TodolistType) => {
    return {type: "ADD-NEW-TODOLIST", todo} as const;
}
export const changeFilterAC = (todoID: string, filter: FilterValues) => {
    return {type: "CHANGE-FILTER", todoID, filter} as const;
}
export const setTodolists = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const);

// ThunkCreators
export const getTodolists = () => async (dispatch: Dispatch) => {
    const { data } = await todolistAPI.getTodolists();
    dispatch(setTodolists(data));
}
export const deleteTodolist = (todoID: string) => async (dispatch: Dispatch) => {
    const { data } = await todolistAPI.deleteTodolist(todoID);
    if (data.resultCode === 0){
        dispatch(removeTodoAC(todoID));
    }
}
export const createTodolist = (title: string) => async (dispatch: Dispatch) => {
    const {data} = await todolistAPI.createTodolist(title);
    if (data.resultCode === 0) {
        dispatch(addTodoAC(data.data.item))
    }
}
export const updateTodolist = (todoID: string, title: string) => async (dispatch: Dispatch) => {
    const { data } = await todolistAPI.updateTodolist(todoID, title);
    if (data.resultCode === 0){
        dispatch(updateTodoAC(todoID, title));
    }
}

//Types
export type FilterValues = 'all' | 'active' | 'completed' ;

export type TodoListEntityType = TodolistType & { filter: FilterValues };

type ActionsType = ReturnType<typeof removeTodoAC>
    | ReturnType<typeof updateTodoAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof setTodolists>
