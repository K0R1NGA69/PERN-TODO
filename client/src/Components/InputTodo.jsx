import axios from "axios"
import { useContext, useState } from "react"
import { useMutation } from "react-query"
import { TodosContext } from "../Context/TodosProvider";
import { api } from "../services/api"
import { queryClient } from '../services/queryClient';

const InputTodo = () => {
    const [description, setDescription] = useState("")


    const addTodo = async (newTodo) => {
        newTodo = JSON.stringify({ description})
        return await api.post("/todos", newTodo)
    }

    const mutation = useMutation(addTodo, {
        onMutate: async (newTodo) => {
            // Stop the queries that may affect this operation
            await queryClient.cancelQueries("todos")

            // Get a snapshot of current data
            const previousTodos = queryClient.getQueryData('todos')

            // Modify cache to reflect this optimistic update
            if (previousTodos) {
                const lastId = previousTodos.slice(-1)[0].todo_id
                const nextTodos = previousTodos.push({description: newTodo })

                queryClient.setQueryData("todos", old => [nextTodos, ...old])

            }

        },
        onError: (error, todo, { previousTodos }) => {
            // Rollback the changes using the snapshot
            queryClient.setQueryData('todos', previousTodos)
        },
        onSuccess() {
            // Refetch or invalidate related queries
            queryClient.invalidateQueries('todos')
        },
        onSettled: () => {
            // This will run in the end, no matter of failure or success
            setDescription('') // Clear textarea
        }

    })


    const handleOnSubmitForm = e => {
        e.preventDefault();
        mutation.mutate(description)
  
    }

    return (
        <div className="row justify-content-center">
            {mutation.isError ? (

                <div>An error occurred: {mutation.error.message}</div>

            ) : null}
            <h1 className="text-center mt-5">Pern Todo List</h1>
            <div className="col-lg-6 col-md-8  mt-3">
                <form className="input-group" onSubmit={handleOnSubmitForm}>
                    <input type="text"
                        className="form-control"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <button className="btn btn-success">Add</button>
                </form>
            </div>

        </div>
    )
}

export default InputTodo