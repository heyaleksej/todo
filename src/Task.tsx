import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from "./Todolist";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";


export type PropsType = {
    changeStatus: (todolistID: string, id: string, isDone: boolean, ) => void
    changeTaskTitle: (todolistID: string, id: string, newTitle: string) => void
    removeTasks: (id: string, todolistID: string) => void
    todolistID: string
    t: TaskType



}

export const Task = React.memo(({changeStatus,changeTaskTitle,removeTasks,todolistID,t}: PropsType) => {

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(todolistID, t.id, e.currentTarget.checked)
    }, [changeStatus, t.id, todolistID])

    const onChangeTaskTitleObertka = useCallback((newTitle: string) => {
        changeTaskTitle(todolistID, t.id, newTitle)
    }, [changeTaskTitle, todolistID, t.id])

    const removeTaskHandler = useCallback(() => {
        removeTasks(t.id, todolistID)
    }, [removeTasks, t.id, todolistID])

    console.log('single task')
    return <div key={t.id}>
        <Checkbox
            color="default"
            checked={t.isDone}
            onChange={(e) => onChangeStatusHandler(e)}

        />
        <EditableSpan
            title={t.title}
            onChange={onChangeTaskTitleObertka}/>

        <IconButton onClick={
            removeTaskHandler}>
            <Delete/>
        </IconButton>
    </div>

});

