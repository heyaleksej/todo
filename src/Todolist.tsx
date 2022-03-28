import {FilterValuesType} from "./App";
import React, {ChangeEvent} from "react";
import s from './Todolist.module.css'
import {TodoMap} from "./TodoMap";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {red} from "@material-ui/core/colors";

export type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string, todolistID: string) => void
    addTasks: (title: string, todolistID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    changeStatus: (id: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (todolistID: string, id: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (todolistID: string, newTitle: string) => void

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


    const removeTodolistHandler = (todolistID: string) => {
        props.removeTodolist(todolistID)
    }

    const onChangeStatusHandler = (id: string, e: ChangeEvent<HTMLInputElement>, todolistID: string) => {
        props.changeStatus(id, e.currentTarget.checked, todolistID)
    }

    const onChangeTaskTitleObertka = (id: string, newTitle: string) => {
        props.changeTaskTitle(props.todolistID, id, newTitle)
    }


    const onChangeTodolistTitleObertka = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistID, newTitle)
    }

    const addTaskObertka = (title: string) => {
        props.addTasks(title,props.todolistID)
    }


    return (


        <div>


            <h3>
                <EditableSpan title={props.title} onChange={onChangeTodolistTitleObertka}/>

                <IconButton onClick={() => {
                    removeTodolistHandler(props.todolistID)
                }}>
                    <Delete/>
                </IconButton>

            </h3>
            <div>
            <AddItemForm addItem={addTaskObertka}/>
            </div>
            <TodoMap tasks={props.tasks}
                     onChangeTaskTitleObertka={onChangeTaskTitleObertka}
                     removeTaskHandler={removeTaskHandler}
                     todolistID={props.todolistID}
                     onChangeStatusHandler={onChangeStatusHandler}
            />
            <div style={{paddingTop:'10px'}}>
                <Button color="primary" variant={props.filter === 'all' ? 'contained' : 'text'} onClick={() => {
                    onClickFilterHandler(props.todolistID, 'all')
                }}>All
                </Button>
                <Button color="secondary" variant={props.filter === 'active' ? 'contained' : 'text'} onClick={() => {
                    onClickFilterHandler(props.todolistID, 'active')
                }}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'contained' : 'text'} onClick={() => {
                    onClickFilterHandler(props.todolistID, 'completed')
                }}>Completed
                </Button>
            </div>
        </div>
    )
}

