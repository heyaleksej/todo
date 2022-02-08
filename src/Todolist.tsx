import {FilterValuesType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './Todolist.module.css'
import {TodoMap} from "./TodoMap";

export type PropsType = {
    title: string
    // newTaskTitle: string
    tasks: Array<TaskType>
    removeTasks: (id: string) => void
    addTasks: (title: string) => void
    // onChangeTaskTitle: (e: ChangeEvent<HTMLInputElement>) => void
    changeFilter: (value: FilterValuesType) => void
    // onKeyPress:(e:KeyboardEvent<HTMLInputElement>)=>void
    changeStatus: (isDone: boolean, id: string) => void
    filter: FilterValuesType

}


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export function Todolist(props: PropsType) {


    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState(false)

    // const oNAllClickHandler=()=>changeFilter('all')
    // const oNActiveClickHandler=()=>changeFilter('active')
    // const oNCompletedClickHandler=()=>changeFilter('completed')
    //
    const onClickFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTasks(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError(true)
        }
    }

    const removeTaskHandler = (tID: string) => {
        props.removeTasks(tID)
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

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        props.changeStatus(e.currentTarget.checked, id)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeTaskTitle}
                       onKeyPress={onKeyPressHandler}
                       className={error ? s.error : ''}

                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={s.errorMessage}>Title is requared!</div>}
            </div>
            <TodoMap tasks={props.tasks} onChangeStatusHandler={onChangeStatusHandler} removeTaskHandler={removeTaskHandler}/>
            <div>
                <button className={props.filter === 'all' ? s.activeFilter : ''} onClick={() => {
                    onClickFilterHandler('all')
                }}>ALL
                </button>
                <button className={props.filter === 'active' ? s.activeFilter : ''} onClick={() => {
                    onClickFilterHandler('active')
                }}>Active
                </button>
                <button className={props.filter === 'completed' ? s.activeFilter : ''} onClick={() => {
                    onClickFilterHandler('completed')
                }}>Completed
                </button>
            </div>
        </div>
    )
}