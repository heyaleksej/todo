import React, {ChangeEvent} from 'react';
import s from "./Todolist.module.css";
import {TaskType} from "./Todolist";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';

export type PropsType = {
    todolistID: string
    tasks: Array<TaskType>
    changeStatus: (isDone: boolean, id: string, todolistID: string) => void
    onChangeStatusHandler: (e: ChangeEvent<HTMLInputElement>, id: string, todolistID: string) => void
    onChangeTaskTitleObertka: (id: string, newTitle: string) => void
    removeTaskHandler: (id: string, todolistID: string) => void
}

export const TodoMap = (props: PropsType) => {

    return (
        <div>
            {props.tasks.map((t) => {

                return <div key={t.id} className={t.isDone ? s.isDone : ''}>
                    <Checkbox
                        color="default"
                        checked={t.isDone}
                        onChange={(e) => props.onChangeStatusHandler(e, t.id, props.todolistID)}

                    />
                    <EditableSpan title={t.title} onChange={(newTitle) => {
                        props.onChangeTaskTitleObertka(t.id, newTitle)
                    }}/>

                    <IconButton onClick={() => {
                        props.removeTaskHandler(t.id, props.todolistID)
                    }}>
                        <Delete/>
                    </IconButton>
                </div>
            })
            }
        </div>
    );
};

