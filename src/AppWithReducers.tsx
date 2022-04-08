import React, {ChangeEvent, KeyboardEvent, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@material-ui/core/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string;
    title: string
    filter: FilterValuesType
}

export type  TasksTodolistType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {

     let todolistID1 = v1()
     let todolistID2 = v1()

    let [todolists, dispatchTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    let [tasksObj, dispatchTasksReducer] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Food", isDone: false},
            {id: v1(), title: "xxx", isDone: false},
            {id: v1(), title: "glasses", isDone: false},
        ]
    });

    const removeTasks = (id: string, todolistID: string) => {
        dispatchTasksReducer(removeTaskAC(id, todolistID))
    }
    const addItem = (newTaskTitle: string, todolistID: string) => {
        dispatchTasksReducer(addTaskAC(newTaskTitle, todolistID))


    }
    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        dispatchTodolistsReducer(changeFilterAC(todolistID, value))
    }
    const changeStatus = (id: string, isDone: boolean, todolistID: string) => {
        dispatchTasksReducer(changeTaskStatusAC(id, isDone, todolistID))


    }
    const removeTodolist = (todolistID: string) => {
        let action = removeTodolistAC(todolistID)
        dispatchTodolistsReducer(action)
        dispatchTasksReducer(action)


    }

    function addTodolist(title: string) {
        let action = addTodolistAC(title)
        dispatchTasksReducer(action)
        dispatchTodolistsReducer(action)


    }

    const changeTaskTitle = (todolistID: string, id: string, newTitle: string) => {
        dispatchTasksReducer(changeTaskTitleAC(todolistID, id, newTitle))
    }

    function changeTodolistTitle(todolistID: string, newTitle: string) {
       dispatchTodolistsReducer(changeTodolistTitleAC(todolistID,newTitle))

    }


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
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={10}>
                    {todolists.map(t => {
                        let tasksForTodolist = tasksObj[t.id];
                        if (t.filter === "active") {
                            tasksForTodolist = tasksObj[t.id].filter(t => !t.isDone);
                        }
                        if (t.filter === "completed") {
                            tasksForTodolist = tasksObj[t.id].filter(t => t.isDone);
                        }
                        return (<Grid item>
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

export default AppWithReducers;
