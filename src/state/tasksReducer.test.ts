import {addNewTaskAC, removeTaskAC, tasksReducer, TasksType, updateTaskAC} from "./tasksReducer";
import {addTodoAC, removeTodoAC} from "./todoListsReducer";
import {todoListID_1, todoListID_2} from "./todoListsReducer.test";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";

let startState: TasksType;

beforeEach(() => {
    startState = {
        [todoListID_1]: [
            {
                id: '1',
                title: 'HTML',
                status: TaskStatuses.Completed,
                todoListId: todoListID_1,
                order: 0,
                description: '',
                addedDate: '',
                priority: TaskPriorities.Low,
                deadline: '',
                startDate: ''
            },
            {
                id: '2',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: todoListID_1,
                order: 0,
                description: '',
                addedDate: '',
                priority: TaskPriorities.Low,
                deadline: '',
                startDate: ''
            }
        ],
        [todoListID_2]: [
            {
                id: '11',
                title: 'Milk',
                status: TaskStatuses.New,
                todoListId: todoListID_2,
                order: 0,
                description: '',
                addedDate: '',
                priority: TaskPriorities.Low,
                deadline: '',
                startDate: ''
            },
            {
                id: '12',
                title: 'Bread',
                status: TaskStatuses.New,
                todoListId: todoListID_2,
                order: 0,
                description: '',
                addedDate: '',
                priority: TaskPriorities.Low,
                deadline: '',
                startDate: ''
            }
        ],
    }
})

test('task reducer should remove correct task', () => {

    let id: string = '1'
    let endState = tasksReducer(startState, removeTaskAC(todoListID_1, id))

    expect(endState[todoListID_1].length).toBe(1)
    expect(endState[todoListID_1][0].title).toBe('CSS')
})
test('task reducer should update correct task', () => {

    let id = '2';
    let newTitle = 'Vanilla JS'
    let endState = tasksReducer(startState, updateTaskAC(todoListID_1, id, {title: newTitle}))

    expect(endState[todoListID_1].length).toBe(2)
    expect(endState[todoListID_1][1].title).toBe(newTitle)
    expect(endState[todoListID_1][0].title).toBe('HTML')
})
test('task reducer should add task with correct title', () => {

    let newTitle = 'Redux'
    let newTask = {
        id: '3',
        title: 'Redux',
        status: TaskStatuses.New,
        todoListId: todoListID_1,
        order: 0,
        description: '',
        addedDate: '',
        priority: TaskPriorities.Low,
        deadline: '',
        startDate: ''
    }
    let endState = tasksReducer(startState, addNewTaskAC(newTask))

    expect(endState[todoListID_1].length).toBe(3)
    expect(endState[todoListID_2].length).toBe(2)
    expect(endState[todoListID_1][0].title).toBe(newTitle)
})
test('task reducer should change status in correct task', () => {

    let id = '12';
    let endState = tasksReducer(startState, updateTaskAC(todoListID_2, id, {status: TaskStatuses.Completed}))

    expect(endState[todoListID_2].length).toBe(2)
    expect(endState[todoListID_2][0].status).toBe(TaskStatuses.New)
    expect(endState[todoListID_2][1].status).toBe(TaskStatuses.Completed)
})
test('property with todoID should be deleted from Tasks state', () => {

    const action = removeTodoAC(todoListID_2);
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoListID_2]).not.toBeDefined()
})
test('new array should be added when new todolist is added', () => {

    const todoTitle = 'Morozko';

    const endState = tasksReducer(startState, addTodoAC(todoTitle))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != todoListID_1 && k != todoListID_2);
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
