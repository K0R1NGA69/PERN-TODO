import { useContext, useEffect } from "react"
import { TodosContext } from "../Context/TodosProvider"
import {EditTodo} from "./EditTodo"
import {DeleteTodo} from "./DeleteTodo"

export const Todo = () => {
    const todosContext = useContext(TodosContext)
    let {todos:{todos,isLoading,isError},setTodos} = todosContext
    return (
        
        <>  
            
            {!isLoading? todos.map(todo =>
            (
                <tr key={todo.todo_id}>
                    <td>{todo.description}</td>
                    <td><EditTodo todo={todo} /></td>
                    <td><DeleteTodo todo_id={todo.todo_id}/></td>
                </tr>
            )
            ): <p>Loading...</p>
            }
             
            
        </>
    )
}