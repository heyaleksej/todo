import React, {ChangeEvent} from 'react';
import s from "./Todolist.module.css";
import {TaskType} from "./Todolist";

export type PropsType = {
    todolistID:string
    tasks: Array<TaskType>
    onChangeStatusHandler: (e: ChangeEvent<HTMLInputElement>, id: string, todolistID: string) => void
    removeTaskHandler: (id: string, todolistID: string) => void
}

export const TodoMap = (props: PropsType) => {
    return (
            <ul>
                {props.tasks.map((t) => {


                    return <li key={t.id} className={t.isDone ? s.isDone : ''}><input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={(e) => props.onChangeStatusHandler(e, t.id, props.todolistID)}

                    />
                        <span>{t.title}</span>
                        <button onClick={() => {
                            props.removeTaskHandler(t.id, props.todolistID)
                        }}>x
                        </button>
                    </li>
                })
                }
            </ul>
    );
};

