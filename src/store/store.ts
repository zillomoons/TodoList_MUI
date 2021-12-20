import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasksReducer";
import {todoListsReducer} from "../state/todoListsReducer";
import thunkMiddleware from 'redux-thunk';
import {appReducer} from "../state/app-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootState = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
