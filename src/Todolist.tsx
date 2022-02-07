import {FilterValuesType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {v1} from "uuid";

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

    // const oNAllClickHandler=()=>changeFilter('all')
    // const oNActiveClickHandler=()=>changeFilter('active')
    // const oNCompletedClickHandler=()=>changeFilter('completed')
    //
    const onClickFilterHandler =(value: FilterValuesType)=>{
        props.changeFilter(value)
    }

    const addTaskHandler=()=>{
        props.addTasks(newTaskTitle)
        setNewTaskTitle('')

    }

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)

    }
    const onKeyPress = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
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
                <button onClick={()=>{onClickFilterHandler('all')}}>ALL</button>
                <button onClick={()=>{onClickFilterHandler('active')}}>Active</button>
                <button onClick={()=>{onClickFilterHandler('completed')}}>Completed</button>
            </div>
        </div>
    )
}