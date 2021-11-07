import {FilterValues, TodoListType} from "../App";


type ActionsType = ReturnType<typeof RemoveTodoListAC> | ReturnType<typeof UpdateTodoListAC>
    | ReturnType<typeof AddNewTodoAC> | ReturnType<typeof ChangeFilterAC>

const initialState: TodoListType[] = [];

export const todoListsReducer = (state = initialState, action: ActionsType): TodoListType[] => {
    switch(action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter( todo => todo.id !== action.todoID);
        case 'UPDATE-TODOLIST-TITLE':
            return state.map(todo => todo.id === action.todoID ? {...todo, title: action.title} : todo)
        case 'ADD-NEW-TODOLIST':
            return [{id: action.todoID, title: action.title, filter: 'all' }, ...state];
        case 'CHANGE-FILTER':
            return state.map(todo => todo.id === action.todoID ? {...todo, filter: action.filter} : todo)
        default:
            return state;
    }
}
export const RemoveTodoListAC = (todoID: string) => {
    return {type: "REMOVE-TODOLIST", todoID} as const;
}
export const UpdateTodoListAC = (todoID: string, title: string) => {
    return {type: "UPDATE-TODOLIST-TITLE", todoID, title} as const;
}
export const AddNewTodoAC = (todoID: string, title: string) => {
    return {type: "ADD-NEW-TODOLIST", todoID, title} as const;
}
export const ChangeFilterAC = (todoID: string, filter: FilterValues) => {
    return {type: "CHANGE-FILTER", todoID, filter} as const;
}
