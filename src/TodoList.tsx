import {AddTitleInput} from "./components/AddTitleInput";
import {TodoTitle} from "./components/TodoTitle";
import {FilterBlock} from "./components/FilterBlock";
import {Task} from "./components/Task";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store/store";
import {FilterValues, TasksType} from "./App";
import {AddNewTaskAC, ChangeStatusAC, RemoveTaskAC, UpdateTaskAC} from "./state/tasksReducer";

type PropsType = {
    todoID: string
    title: string
    removeTodoList: () => void
    editTodoTitle: (title: string) => void
    filter: FilterValues
}
export const TodoList = ({
                            todoID, title, filter, removeTodoList, editTodoTitle
                         }: PropsType) => {

    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasks);
    let tasksForTodo = tasks[todoID];
    if (filter === 'active') {
        tasksForTodo = tasksForTodo.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodo = tasksForTodo.filter(t => t.isDone)
    }
    const removeTask = (taskID: string) => {
        dispatch(RemoveTaskAC(todoID, taskID));
    }
    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        dispatch(ChangeStatusAC(todoID, taskID, isDone));
    }
    const addNewTask = (title: string) => {
        dispatch(AddNewTaskAC(todoID, title));
    }
    const editTaskTitle = (taskID: string, title: string) => {
        dispatch(UpdateTaskAC(todoID, taskID, title));
    }

    const mappedTasks = tasksForTodo.map(t=> <Task key={t.id}
                                            changeTaskStatus={(isDone)=>changeTaskStatus(t.id, isDone)}
                                            editTaskTitle={(title)=>editTaskTitle(t.id, title)}
                                            removeTask={()=>removeTask(t.id)}
                                            isDone={t.isDone} title={t.title} />)
    return (
        <div>
            <TodoTitle title={title} editTodoTitle={editTodoTitle} removeTodoList={removeTodoList} />
            <AddTitleInput callback={addNewTask}/>
            <div>
                {mappedTasks}
            </div>
            <FilterBlock filter={filter} todoID={todoID} />
        </div>
    )
}