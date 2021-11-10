import {tasksReducer} from "./tasksReducer";
import {TasksType, TodoListType} from "../App";
import {AddNewTodoAC, todoListsReducer} from "./todoListsReducer";

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = AddNewTodoAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoID);
    expect(idFromTodolists).toBe(action.todoID);
});
