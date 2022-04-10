import {FilterValuesType} from "./AppWithRedux";
import React, {useCallback} from "react";
import {Task} from "./Task";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string, todolistID: string) => void
    addItem: (title: string, todolistID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    changeStatus: (todolistID: string, id: string, isDone: boolean ) => void
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


export const Todolist = React.memo(({changeFilter,removeTodolist, changeTodolistTitle, addItem, filter,...props}: PropsType) => {
    console.log('todo is called')


    const onClickFilterHandler = useCallback((todolistID: string, value: FilterValuesType) => {
        changeFilter(todolistID, value)
    }, [changeFilter])


    const removeTodolistHandler = useCallback(() => {
        removeTodolist(props.todolistID)
    }, [removeTodolist, props.todolistID])


    const onChangeTodolistTitleObertka = useCallback((newTitle: string) => {
        changeTodolistTitle(props.todolistID, newTitle)
    }, [changeTodolistTitle, props.todolistID])

    const addTaskObertka = useCallback((title: string) => {
        addItem(title, props.todolistID)
    }, [addItem, props.todolistID])


    let tasksForTodolist = props.tasks;

    if (filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={onChangeTodolistTitleObertka}/>

                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>

            </h3>
            <div>
                <AddItemForm addItem={addTaskObertka}/>
            </div>
            <div>
                {
                    tasksForTodolist.map((t) => <Task
                        todolistID={props.todolistID}
                        t={t}
                        changeTaskTitle={props.changeTaskTitle}
                        changeStatus={props.changeStatus}
                        removeTasks={props.removeTasks}
                        key={t.id}
                    />
                )
                }
            </div>
            <div style={{paddingTop: '10px'}}>
                <Button color="primary" variant={filter === 'all' ? 'contained' : 'text'} onClick={() => {
                    onClickFilterHandler(props.todolistID, 'all')
                }}>All
                </Button>
                <Button color="secondary" variant={filter === 'active' ? 'contained' : 'text'} onClick={() => {
                    onClickFilterHandler(props.todolistID, 'active')
                }}>Active
                </Button>
                <Button variant={filter === 'completed' ? 'contained' : 'text'} onClick={() => {
                    onClickFilterHandler(props.todolistID, 'completed')
                }}>Completed
                </Button>
            </div>
        </div>
    )
})

