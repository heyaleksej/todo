import {FilterValuesType} from "./App";
import React, {ChangeEvent} from "react";
import s from './Todolist.module.css'
import {TodoMap} from "./TodoMap";
import { AddItemForm } from "./AddItemForm";

export type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string, todolistID: string) => void
    addTasks: (title: string, todolistID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    changeStatus: (isDone: boolean, id: string, todolistID: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void

}


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export function Todolist(props: PropsType) {


    const onClickFilterHandler = (todolistID: string, value: FilterValuesType) => {
        props.changeFilter(todolistID, value)
    }

    const removeTaskHandler = (id: string, todolistID: string) => {
        props.removeTasks(id, todolistID)
    }

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>, id: string, todolistID: string) => {
        props.changeStatus(e.currentTarget.checked, id, todolistID)
    }
    const removeTodolistHandler = (todolistID: string) => {
        props.removeTodolist(todolistID)
    }

    const addTaskObertka =(title:string)=>{
        props.addTasks(title, props.todolistID)
    }


    return (

        <div>


            <h3>{props.title}
                <button onClick={() => {
                    removeTodolistHandler(props.todolistID)
                }}>x
                </button>

            </h3>
            <AddItemForm addItem={addTaskObertka}/>
            <TodoMap tasks={props.tasks} onChangeStatusHandler={onChangeStatusHandler}
                     removeTaskHandler={removeTaskHandler} todolistID={props.todolistID}
            />
            <div>
                <button className={props.filter === 'all' ? s.activeFilter : ''} onClick={() => {
                    onClickFilterHandler(props.todolistID, 'all')
                }}>All
                </button>
                <button className={props.filter === 'active' ? s.activeFilter : ''} onClick={() => {
                    onClickFilterHandler(props.todolistID, 'active')
                }}>Active
                </button>
                <button className={props.filter === 'completed' ? s.activeFilter : ''} onClick={() => {
                    onClickFilterHandler(props.todolistID, 'completed')
                }}>Completed
                </button>
            </div>
        </div>
    )
}

