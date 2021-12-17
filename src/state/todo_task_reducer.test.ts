import {tasksReducer, TasksType} from "./tasksReducer";
import {addTodoAC, todoListsReducer, TodoListEntityType} from "./todoListsReducer";

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodoListEntityType> = [];

    const action = addTodoAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoID);
    expect(idFromTodolists).toBe(action.todoID);
});
