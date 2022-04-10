import {TasksTodolistType} from "../AppWithReducers";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolists-reducer";

type ActionTypes = removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTitleStatusACType
    | addTodolistACType
    | removeTodolistACType


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

export const changeTaskStatusAC = (todolistId: string, taskId: string, value: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            todolistId,
            taskId,
            value
        }
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TITLE',
        payload: {
            todolistId, taskId, title,
        }
    } as const
}
const initialState:TasksTodolistType = {};

export const tasksReducer = (state: TasksTodolistType = initialState, action: ActionTypes): TasksTodolistType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // let newState = {...state}
            // newState[action.payload.todolistId] = newState[action.payload.todolistId].filter(t => action.payload.id !== t.id)
            return {...state,
            [action.payload.todolistId]:state[action.payload.todolistId].filter(f=>action.payload.id !==f.id)

        }}
        case 'ADD-TASK': {
            let newState = {...state}
            let tasks = newState[action.payload.todolistId]
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            let newTasks = [newTask, ...tasks]
            newState[action.payload.todolistId] = newTasks
            return  newState
        }
        case 'CHANGE-STATUS': {
            // let newState = {...state}
            //
            // let tasks = newState[action.payload.todolistId]
            // let task = tasks.find(f => f.id === action.payload.taskId)
            // if (task) {
            //     task.isDone = action.payload.value
            //
            //     newState[action.payload.todolistId] = {...tasks}
            // }
            // return newState

            // const stateCopy = {...state};
            //
            // let tasks = stateCopy[action.payload.todolistId];
            // // найдём нужную таску:
            // let task = tasks.find(t => t.id === action.payload.taskId);
            // if (task) {
            //     task.isDone = action.payload.value;
            // }
            return {...state,[action.payload.todolistId]:state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, isDone : action.payload.value}:t) };


        }


        case "CHANGE-TITLE": {

            return {...state, [action.payload.todolistId]:state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, title : action.payload.title}:t) };


        }

        case 'ADD-TODOLIST': {

            return {...state, [action.payload.todolistId]: []}


        }
        case "REMOVE-TODOLIST": {
            let newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        }

        default:
            return state

        // throw new Error("I don't understand this type")
    }
}