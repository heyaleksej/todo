import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'active' | 'completed'

type todolistsType = {
    id: string;
    title: string
    filter: FilterValuesType
}




function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'active'},
    ])

    let [tasksObj, setTasks] = useState({
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
    const addTasks = (newTaskTitle: string, todolistID: string) => {
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
        console.log('changeStatus work')

    }

    const removeTodolist =(todolistID: string)=> {
        let newTodolists = todolists.filter(t => t.id !== todolistID);
        setTodolists(newTodolists)
        delete tasksObj[todolistID]


    }


    return (
        <div className="App">
            <input/> <button>+</button>

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
                        addTasks={addTasks}
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
