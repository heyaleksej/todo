import {FilterValuesType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export type PropsType = {
    title: string
    // newTaskTitle: string
    tasks: Array<TaskType>
    removeTasks: (id: string) => void
    addTasks: (title: string) => void
    // onChangeTaskTitle: (e: ChangeEvent<HTMLInputElement>) => void
    changeFilter: (value: FilterValuesType) => void
    // onKeyPress:(e:KeyboardEvent<HTMLInputElement>)=>void
    changeStatus:(isDone:boolean, id:string)=>void

}


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}




export function Todolist(props: PropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState('')

    const oNAllClickHandler=()=>props.changeFilter('all')
    const oNActiveClickHandler=()=>props.changeFilter('active')
    const oNCompletedClickHandler=()=>props.changeFilter('completed')

    const addTaskHandler=()=>{
        props.addTasks(newTaskTitle)
    }

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)

    }
    const onKeyPress = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTasks(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const onKeyPressHandler=(e:KeyboardEvent<HTMLInputElement>)=>{onKeyPress(e
    )   }

    const onChangeStatusHandler=(e:ChangeEvent<HTMLInputElement>, id:string)=>{props.changeStatus(e.currentTarget.checked, id)}


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={onChangeTaskTitle} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map((t) => {


                    return <li key={t.id}><input type="checkbox" checked={t.isDone} onChange={(e)=>onChangeStatusHandler(e,t.id)}/>
                        <span>{t.title}</span>
                        <button onClick={() => {
                            props.removeTasks(t.id)
                        }}>x
                        </button>
                    </li>
                })
                }
            </ul>
            <div>
                <button onClick={oNAllClickHandler}>ALL</button>
                <button onClick={oNActiveClickHandler}>Active</button>
                <button onClick={oNCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}