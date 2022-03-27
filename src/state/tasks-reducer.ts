import {TasksTodolistType, TodolistsType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";

type ActionTypes =
    removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTitleStatusACType
    | AddTodolistACType
    | RemoveTodolistACType


type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTitleStatusACType = ReturnType<typeof changeTaskTitleAC>


export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id,
            todolistId
        }
    } as const

}

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}

export const changeTaskStatusAC = (taskId: string, value: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            taskId,
            value,
            todolistId
        }
    } as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TITLE',
        payload: {
            taskId, title, todolistId
        }
    } as const
}


export const tasksReducer = (state: TasksTodolistType, action: ActionTypes): TasksTodolistType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let newState = {...state}
            newState[action.payload.todolistId] = newState[action.payload.todolistId].filter(t => action.payload.id !== t.id)
            return newState

        }
        case 'ADD-TASK': {
            let newState = {...state}
            let tasks = newState[action.payload.todolistId]
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            let newTasks = [newTask, ...tasks]
            newState[action.payload.todolistId] = newTasks
            return newState
        }
        case 'CHANGE-STATUS': {
            let newState = {...state}

            let tasks = newState[action.payload.todolistId]
            let task = tasks.find(f => f.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.value

                newState[action.payload.todolistId] = {...tasks}
            }
            return newState

        }


        case "CHANGE-TITLE": {
            let newState = {...state}
            let tasks = newState[action.payload.todolistId].map(m => m.id === action.payload.taskId ? {
                ...m,
                title: action.payload.title
            } : m)
            newState[action.payload.todolistId] = {...tasks}
            return newState
        }

        case 'ADD-TODOLIST': {
            let newState = {...state}
            newState[action.payload.todolistId] = []
            return newState


        }
        case "REMOVE-TODOLIST":{
            let newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        }

        default:
            return {...state}
        // throw new Error("I don't understand this type")
    }
}