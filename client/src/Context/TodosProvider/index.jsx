import { createContext, useReducer, useRef, useState } from "react"
import { data } from "./data"

export const TodosContext = createContext()


export const TodosProvider = ({children})=>{
    const [todos, setTodos] = useState(data)
    
    return(
        <TodosContext.Provider value = {{todos,setTodos}}>
            {children}
        </TodosContext.Provider>
    )
}