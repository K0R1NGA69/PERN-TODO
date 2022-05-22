import { useState } from "react";
import { useMutation } from "react-query";
import { api } from "../services/api";
import { queryClient } from "../services/queryClient";

export const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description)

    const handleEditTodoQuery = async (newTodo) => {
        newTodo = JSON.stringify({description})
        return await api.put(`/todos/${todo.todo_id}`, newTodo)
    }

    const mutation = useMutation(
        handleEditTodoQuery, {
        onMutate: async (newTodo) => {
            // Stop the queries that may affect this operation
            await queryClient.cancelQueries("todos")

            //Get the cached data
            const previousTodos = queryClient.getQueryData("todos")

            //Modify the cache
            if (previousTodos) {
                const nextTodos = previousTodos.map(todo => {
                    if (todo.description === description) {
                        return { ...todo, description: description }
                    } else {
                        return todo
                    }
                })
                queryClient.setQueryData(["todos", todo.todo_id], nextTodos)
            }
        },
        onError: (error, tweetId, { previousTodos }) => {
            // Rollback the changes using the snapshot
            queryClient.setQueryData('todos', previousTodos)
        },
        onSuccess() {
            // Refetch or invalidate related queries
            queryClient.invalidateQueries('todos')
        }
    }

    )

    function handleOnclickUpdate() {
        mutation.mutate(description)
    }

    return (
        <>

            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`}>
                Edit
            </button>


            <div className="modal fade" id={`id${todo.todo_id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleOnclickUpdate}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

