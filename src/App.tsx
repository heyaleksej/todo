import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@material-ui/core/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';


export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string;
    title: string
    filter: FilterValuesType
}

export type  TasksTodolistType = {
    [key: string]: Array<TaskType>
}


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    let [tasksObj, setTasks] = useState<TasksTodolistType>({
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
        let tasks = tasksObj[todolistID]
        let filteredTasks = tasks.filter(t => id !== t.id);
        tasksObj[todolistID] = filteredTasks
        setTasks({...tasksObj})
    }
    const addItem = (newTaskTitle: string, todolistID: string) => {
        let tasks = tasksObj[todolistID]
        let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistID] = newTasks
        setTasks({...tasksObj}) //why copy

    }
    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, filter: value} : m))

    }
    const changeStatus = ( todolistID: string, id: string, isDone: boolean) => {
        let tasks = tasksObj[todolistID]
        let task = tasks.find(f => f.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }


        // setTasks({...tasksObj,tasksObj[todolistID].find(f => f.id === id ? {...f, isDone:isDone}:f)})





    }
    const removeTodolist = (todolistID: string) => {
        let newTodolists = todolists.filter(t => t.id !== todolistID);
        setTodolists(newTodolists)
        delete tasksObj[todolistID]


    }

    function addTodolist(title: string) {
        let newTodolist: TodolistsType =
            {id: v1(), title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasksObj, [newTodolist.id]: []})
    }

    const changeTaskTitle = (todolistID: string, id: string, newTitle: string) => {
        // let tasks = tasksObj[todolistID]
        // let task = tasks.find(f=>f.id === id)
        // if (task) {
        //     task.title = newTitle
        //     setTasks({...tasksObj})
        // }
        let title = newTitle
        setTasks({...tasksObj, [todolistID]: tasksObj[todolistID].map(m => m.id === id ? {...m, title} : m)})


    }

    function changeTodolistTitle(todolistID: string, newTitle: string) {
        // const todolist = todolists.find(t => t.id === todolistID)
        // if (todolist) {
        //     todolist.title = newTitle
        // }
        // setTodolists([...todolists])
        let title = newTitle
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, title} : m))


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
                <Grid container style={{padding:'20px'}}>
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
                                <Paper style={{padding:'20px'}}>
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

