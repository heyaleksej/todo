import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from "./Todolist";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";


export type PropsType = {
    changeStatus: (id: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (todolistID: string, id: string, newTitle: string) => void
    removeTasks: (id: string, todolistID: string) => void
    todolistID: string
    task: TaskType



}

export const Task = React.memo((props: PropsType) => {

    const onChangeStatusHandler = useCallback((id: string, e: ChangeEvent<HTMLInputElement>, todolistID: string) => {
        props.changeStatus(id, e.currentTarget.checked, todolistID)
    }, [props.changeStatus])

    const onChangeTaskTitleObertka = useCallback((id: string, newTitle: string) => {
        props.changeTaskTitle(props.todolistID, id, newTitle)
    }, [props.changeTaskTitle, props.todolistID])

    const removeTaskHandler = useCallback((id: string, todolistID: string) => {
        props.removeTasks(id, todolistID)
    }, [props.removeTasks])

    console.log('TodoMap')
    return <div key={props.task.id}>
        <Checkbox
            color="default"
            checked={props.task.isDone}
            onChange={(e) => onChangeStatusHandler(props.task.id, e, props.todolistID)}

        />
        <EditableSpan
            title={props.task.title}
            onChange={(newTitle) => {
                onChangeTaskTitleObertka(props.task.id, newTitle)
            }}/>

        <IconButton onClick={() => {
            removeTaskHandler(props.task.id, props.todolistID)
        }}>
            <Delete/>
        </IconButton>
    </div>

});

