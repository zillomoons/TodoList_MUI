import {
    AddNewTodoAC,
    ChangeFilterAC,
    RemoveTodoListAC,
    todoListsReducer, UpdateTodoListAC,
} from "./todoListsReducer";
import {v1} from "uuid";
import {TodoListType} from "../App";

export const todoListID_1 = v1();
export const todoListID_2 = v1();

let startState: TodoListType[];
beforeEach(()=> {
    startState = [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ]
})

test('todolist reducer should remove correct todolist', ()=>{

    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListID_1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID_2)
})
test('todolist reducer should update title of correct todolist', ()=>{
    const newTitle = 'Technologies stack'

    const endState = todoListsReducer(startState, UpdateTodoListAC(todoListID_1, newTitle))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe('What to buy')
})
test('todolist reducer should add new todolist with correct title', ()=>{
    const newTitle = 'Favourite food'
    const newTodoID = v1();

    const endState = todoListsReducer(startState, AddNewTodoAC(newTodoID, newTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('Favourite food')
    expect(endState[0].filter).toBe('all')
    expect(endState[1].title).toBe('What to learn')
})
test('todolist reducer should change filter in correct todolist', ()=>{
    const filterValue = 'active'

    const endState = todoListsReducer(startState, ChangeFilterAC(todoListID_1, filterValue))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe(filterValue)
    expect(endState[1].filter).toBe('all')
})
