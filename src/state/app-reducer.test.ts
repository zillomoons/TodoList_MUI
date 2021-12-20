import {AppInitialStateType, appReducer, setError, setStatus} from "./app-reducer";

let startState: AppInitialStateType;

beforeEach(()=>{
    startState = {
        status: "idle",
        error: 'some error'
    }
})
test('app reducer should set error', ()=> {
    const endState = appReducer(startState, setError(null) )
    const newError = 'ooops, smth went wrong'
    const endState2 = appReducer(startState, setError(newError))

    expect(endState.error).toBe(null)
    expect(endState2.error).toBe(newError)
})

test('app reducer should set correct status', () => {
    const endState = appReducer(startState, setStatus('loading'))

    expect(endState.status).toBe('loading')
})