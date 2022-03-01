import {FilterValuesType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './Todolist.module.css'
import {TodoMap} from "./TodoMap";

export type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string, todolistID: string) => void
    addTasks: (title: string, todolistID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    changeStatus: (isDone: boolean, id: string, todolistID: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID:string) => void

}


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export function Todolist(props: PropsType) {


    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState(false)

    const onClickFilterHandler = (todolistID: string, value: FilterValuesType) => {
        props.changeFilter(todolistID,value)
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTasks(newTaskTitle.trim(), props.todolistID)
            setNewTaskTitle('')
        } else {
            setError(true)
        }
    }

    const removeTaskHandler = (id: string, todolistID: string) => {
        props.removeTasks(id, todolistID)
    }

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTaskTitle(e.currentTarget.value)

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>, id: string, todolistID: string) => {
        props.changeStatus(e.currentTarget.checked, id, todolistID)
    }
    const removeTodolistHandler = (todolistID: string) => {
        props.removeTodolist(todolistID)
    }


    return (

        <div>


            <h3>{props.title} <button onClick={()=>{removeTodolistHandler(props.todolistID)}}>x</button> </h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeTaskTitle}
                       onKeyPress={onKeyPressHandler}
                       className={error ? s.error : ''}

                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={s.errorMessage}>Title is requared!</div>}
            </div>
            <TodoMap tasks={props.tasks} onChangeStatusHandler={onChangeStatusHandler}
                     removeTaskHandler={removeTaskHandler} todolistID ={props.todolistID}
            />
            <div>
                <button className={props.filter === 'all' ? s.activeFilter : ''} onClick={() => {
                    onClickFilterHandler(props.todolistID,'all')
                }}>ALL
                </button>
                <button className={props.filter === 'active' ? s.activeFilter : ''} onClick={() => {
                    onClickFilterHandler(props.todolistID,'active')
                }}>Active
                </button>
                <button className={props.filter === 'completed' ? s.activeFilter : ''} onClick={() => {
                    onClickFilterHandler(props.todolistID,'completed')
                }}>Completed
                </button>
            </div>
        </div>
    )
}