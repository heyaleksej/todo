import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@material-ui/core/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from './state/store'


export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string;
    title: string
    filter: FilterValuesType
}

export type  TasksTodolistType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    console.log('app is called')


    //вводим useselector вместо usereducer

    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksTodolistType>(state => state.tasks)
    const dispatch = useDispatch()


    const removeTasks = useCallback((id: string, todolistID: string) => {
        dispatch(removeTaskAC(id, todolistID))
    }, [dispatch])
    const addItem = useCallback((newTaskTitle: string, todolistID: string) => {
        dispatch(addTaskAC(newTaskTitle, todolistID))
    }, [dispatch])

    const changeFilter = useCallback((todolistID: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, value))
    }, [dispatch])
    const changeStatus = useCallback((todolistID: string, id: string, isDone: boolean ) => {
        dispatch(changeTaskStatusAC(todolistID, id, isDone))
    }, [dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        let action = removeTodolistAC(todolistID)
        dispatch(action)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistID: string, id: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, id, newTitle))
    }, [dispatch])

    const changeTodolistTitle=useCallback((todolistID: string, newTitle: string)=> {
        dispatch(changeTodolistTitleAC(todolistID, newTitle))

    },[dispatch])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={10}>
                    {todolists.map(t => {

                        let allTodolistTasks = tasks[t.id];
                        let tasksForTodolist = allTodolistTasks

                        return (<Grid item key={t.id}>
                                <Paper style={{padding: '20px'}}>


                                    <Todolist
                                        key={t.id}
                                        todolistID={t.id}
                                        title={t.title}
                                        tasks={tasksForTodolist}
                                        removeTasks={removeTasks}
                                        addItem={addItem}
                                        changeFilter={changeFilter}
                                        changeStatus={changeStatus}
                                        filter={t.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
