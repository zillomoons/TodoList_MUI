import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasksReducer";
import {todoListsReducer} from "../state/todoListsReducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
})

export const store = createStore(rootReducer);


export type AppRootState = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
