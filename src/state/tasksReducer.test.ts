import {v1} from "uuid";
import {AddNewTaskAC, ChangeStatusAC, RemoveTaskAC, tasksReducer, UpdateTaskAC} from "./tasksReducer";
import {RemoveTodoListAC} from "./todoListsReducer";
import {TasksType} from "../App";
import {todoListID_1, todoListID_2} from "./todoListsReducer.test";

let startState: TasksType;

beforeEach(()=> {
    startState = {
        [todoListID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Honey', isDone: false},
            {id: v1(), title: 'Cookies', isDone: false},
        ],
    }
})

test('task reducer should remove correct task', () => {

    let id: string = startState[todoListID_1][0].id
    let endState = tasksReducer(startState, RemoveTaskAC(todoListID_1, id))
    // let endState = tasksReducer(startState, {type: 'REMOVE-TASK', todoID: todoListID_1, taskID: id})

    expect(endState[todoListID_1].length).toBe(3)
    expect(endState[todoListID_1][0].title).toBe('CSS')
})
test('task reducer should update correct task', () => {

    let id: string = startState[todoListID_1][2].id;
    let newTitle = 'Vanilla JS'
    let endState = tasksReducer(startState, UpdateTaskAC(todoListID_1, id, newTitle))
    //let endState = tasksReducer(startState, {type: 'UPDATE-TASK-TITLE', todoID: todoListID_1, taskID: id, title: newTitle})

    expect(endState[todoListID_1].length).toBe(4)
    expect(endState[todoListID_1][2].title).toBe(newTitle)
    expect(endState[todoListID_1][2].isDone).toBe(false)
    expect(endState[todoListID_1][0].title).toBe('HTML')
})
test('task reducer should add task with correct title', () => {

    // let id: string = startState[todoListID_1][2].id;
    let newTitle = 'Redux'
    let endState = tasksReducer(startState, AddNewTaskAC(todoListID_1, newTitle))
    //let endState = tasksReducer(startState, {type: 'ADD-NEW-TASK', todoID: todoListID_1, title: newTitle})

    expect(endState[todoListID_1].length).toBe(5)
    expect(endState[todoListID_1][0].title).toBe(newTitle)
    expect(endState[todoListID_1][1].isDone).toBe(true)
    expect(endState[todoListID_1][1].title).toBe('HTML')
})
test('task reducer should change status in correct task', () => {

    let id: string = startState[todoListID_2][2].id;
    // let newTitle = 'Redux'
    let endState = tasksReducer(startState, ChangeStatusAC(todoListID_2, id, true))
    //let endState = tasksReducer(startState, {type: 'CHANGE-TASK-STATUS', todoID: todoListID_2, taskID: id, isDone: true})

    expect(endState[todoListID_2].length).toBe(4)
    expect(endState[todoListID_2][0].isDone).toBe(true)
    expect(endState[todoListID_2][1].isDone).toBe(true)
    expect(endState[todoListID_2][2].isDone).toBe(true)
    expect(endState[todoListID_2][2].title).toBe('Honey')
    expect(endState[todoListID_2][3].isDone).toBe(false)
})
test('property with todoID should be deleted from Tasks state', ()=>{
    const startState: TasksType = {
        'todoListID1' : [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'JS', isDone: false},
        ],
        'todoListID2' : [
            {id: '1', title: 'Bread', isDone: true},
            {id: '2', title: 'Milk', isDone: false},
            {id: '3', title: 'Meat', isDone: false},
        ],
    }
    const action = RemoveTodoListAC('todoListID2');
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListID2']).not.toBeDefined()
})
