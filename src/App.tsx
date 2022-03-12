import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";


export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistsType = {
    id: string;
    title: string
    filter: FilterValuesType
}

type  TasksTodolistType={
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
        setTodolists(todolists.map(m=> m.id===todolistID ? {...m,filter:value}:m))

    }
    const changeStatus = (isDone: boolean, id: string, todolistID: string) => {
        let tasks = tasksObj[todolistID]
        let task = tasks.find(f=>f.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }



    }

    const removeTodolist =(todolistID: string)=> {
        let newTodolists = todolists.filter(t => t.id !== todolistID);
        setTodolists(newTodolists)
        delete tasksObj[todolistID]


    }

    function addTodolist(title:string){
        let newTodolist: TodolistsType=
                {id: v1(), title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasksObj,[newTodolist.id]:[]})
    }



    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>

            {todolists.map(t => {
                let tasksForTodolist = tasksObj[t.id];

                if (t.filter === "active") {
                    tasksForTodolist = tasksObj[t.id].filter(t => !t.isDone);
                }
                if (t.filter === "completed") {
                    tasksForTodolist = tasksObj[t.id].filter(t => t.isDone);
                }

                return (
                    <Todolist
                        key = {t.id}
                        todolistID ={t.id}
                        title={t.title}
                        tasks={tasksForTodolist}
                        removeTasks={removeTasks}
                        addTasks={addItem}
                        changeFilter={changeFilter}
                        changeStatus={changeStatus}
                        filter={t.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
