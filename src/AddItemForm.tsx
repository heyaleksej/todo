import {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./Todolist.module.css";
import {IconButton, TextField} from "@material-ui/core";
import {PlaylistAdd} from "@material-ui/icons";


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
            <TextField
                variant={'outlined'}
                label={!error ? 'type': 'Title is requared!'}
                value={newTaskTitle}
                onChange={onChangeTaskTitle}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}


            />
            <IconButton onClick={addTaskHandler} color='primary'>
                <PlaylistAdd/>
            </IconButton>
            {/*{error && <div className={s.errorMessage}>Title is requared!</div>}*/}
        </div>
    )

}