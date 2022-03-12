import {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./Todolist.module.css";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError(true)
        }
    }


    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState(false)

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTaskTitle(e.currentTarget.value)

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }


    return (

        <div>
            <input value={newTaskTitle}
                   onChange={onChangeTaskTitle}
                   onKeyPress={onKeyPressHandler}
                   className={error ? s.error : ''}

            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={s.errorMessage}>Title is requared!</div>}
        </div>
    )
}