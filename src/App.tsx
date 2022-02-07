import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

// let task2=[
//     {id:1, title: "kalmar", isDone: true},
//     {id:2, title: "prada", isDone: true},
//     {id:3, title: "duna", isDone: false}
// ]

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "Node", isDone: false},
        {id: v1(), title: "c", isDone: true}
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')

    let taskForTDL = tasks
    if (filter === 'active') {
        taskForTDL = tasks.filter(f => !f.isDone)
    }
    if (filter === 'completed') {
        taskForTDL = tasks.filter(f => f.isDone)
    }

    const removeTasks = (id: string) => {
        let filteredTasks = tasks.filter(t => id !== t.id);
        setTasks(filteredTasks)
    }
    const addTasks = (newTaskTitle: string) => {

        let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)

    }


    const changeFilter = (value: FilterValuesType) => {
        console.log(value)
        setFilter(value)
    }
    const changeStatus = (isDone:boolean, id:string) => {
        console.log('changeStatus work')
        // let newTasks = [tasks, isDone=!isDone]
        // setTasks(newTasks)

        // let currentString = tasks.find(f=>f.id === id)
        // if (currentString){
        //     currentString.isDone = isDone
        //     setTasks([...tasks])
        // }

        setTasks(tasks.map(m=>m.id===id? {...m,isDone:isDone}:m))

    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={taskForTDL}
                      removeTasks={removeTasks}
                      addTasks={addTasks}
                      // onChangeTaskTitle={onChangeTaskTitle}
                      changeFilter={changeFilter}
                      // newTaskTitle={newTaskTitle}
                      // onKeyPress={onKeyPress}
                      changeStatus={changeStatus}



            />
            {/*<Todolist title="Movies" />*/}
        </div>
    );
}

export default App;
