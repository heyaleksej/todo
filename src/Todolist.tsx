import {FilterValuesType} from "./AppWithRedux";
import React, {ChangeEvent, useCallback} from "react";
import {Task} from "./Task";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string, todolistID: string) => void
    addItem: (title: string, todolistID: string) => void
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


export const Todolist = React.memo((props: PropsType) => {
    console.log('todo is called')


    const onClickFilterHandler = useCallback((todolistID: string, value: FilterValuesType) => {
        props.changeFilter(todolistID, value)
    }, [props.changeFilter])


    const removeTodolistHandler = useCallback((todolistID: string) => {
        props.removeTodolist(todolistID)
    }, [props.removeTodolist])


    const onChangeTodolistTitleObertka = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolistID, newTitle)
    }, [props.changeTodolistTitle, props.todolistID])

    const addTaskObertka = useCallback((title: string) => {
        props.addItem(title, props.todolistID)
    }, [props.addItem])


    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
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
            <div>
                {tasksForTodolist.map((t) => {
                    return <Task
                        todolistID={props.todolistID}
                        task={t}
                        changeTaskTitle={props.changeTaskTitle}
                        changeStatus={props.changeStatus}
                        removeTasks={props.removeTasks}
                        key={t.id}
                    />
                })
                }
            </div>
            <div style={{paddingTop: '10px'}}>
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
})

