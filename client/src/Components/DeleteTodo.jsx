import axios from "axios"
import { useMutation } from "react-query"
import { api } from "../services/api"
import { queryClient } from "../services/queryClient"


export const DeleteTodo = ({ todo_id }) => {

    const handleDeleteQuery = async (todo_id) => {
        return await api.delete(`/todos/${todo_id}`)

    }
    const mutation = useMutation(handleDeleteQuery, {
        onMutate: async (todo_id) => {
            //Get a snapshot of the previous todo
            const previousTodos = queryClient.getQueryData("todos")

            // Stop the queries that may affect this operation
            await queryClient.cancelQueries("todos")

            //Modify the cache
            if (previousTodos) {
                const nextTodos = previousTodos.filter(todo => (
                    todo.todo_id !== todo_id
                ))
                queryClient.setQueryData("todos", old => [nextTodos,...old])

            }
        },
        onError: (error, todoId, { previousTodos }) => {
            // Rollback the changes using the snapshot
            queryClient.setQueryData('todos', previousTodos)
        },
        onSuccess() {
            // Refetch or invalidate related queries
            queryClient.invalidateQueries('todos')
        },
        
    })



    function handleOnclick() {
        mutation.mutate(todo_id)
  
    }
    return (
        <button
            className="btn btn-primary"
            onClick={handleOnclick}>
            Delete
        </button>
    )

}