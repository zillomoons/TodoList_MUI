import {userReducer} from "./userReducer";

test('user reducer should increment only age', ()=>{
    const startState = {age: 28, childrenCount: 1, name: 'Alex'};

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(29)
    expect(endState.childrenCount).toBe(1)
})
test('user reducer should increment only childrenCount', ()=>{
    const startState = {age: 28, childrenCount: 1, name: 'Alex'};

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(28)
    expect(endState.childrenCount).toBe(2)
})
test('user reducer should change name of user', ()=>{
    const startState = {age: 28, childrenCount: 1, name: 'Alex'};
    const newName = 'Alexandra'

    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe(newName)
    expect(endState.age).toBe(28)
    expect(endState.childrenCount).toBe(1)
})
