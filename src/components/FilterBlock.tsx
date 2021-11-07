import {MyButton} from "./Button";
import {Grid} from "@mui/material";
import { FilterValues } from "../App";
import {ChangeFilterAC} from "../state/todoListsReducer";
import {useDispatch} from "react-redux";

type PropsType={
    filter: FilterValues
    todoID: string
}

export const FilterBlock = ({filter, todoID}: PropsType) => {
    const dispatch = useDispatch();
    const changeFilter = (filter: FilterValues) => {
        dispatch(ChangeFilterAC(todoID, filter));
    }
    return (
        <Grid container style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <MyButton name={'all'} filter={filter} callback={() => changeFilter('all')}/>
            <MyButton name={'active'} filter={filter} callback={() => changeFilter('active')}/>
            <MyButton name={'completed'} filter={filter} callback={() => changeFilter('completed')}/>
        </Grid>
    )
}