import { useContext} from "react";
import { TodosContext } from "../Context/TodosProvider";
import { useQuery } from "react-query";
import { api } from "../services/api";
import { Todo } from "./Todo";



const ListTodos = () => {
    const todosContext = useContext(TodosContext)
    const { todos, setTodos } = todosContext   

    const {isError} = useQuery("todos",async()=>{
        const response = await api.get("/todoss")
        setTodos({...todos,todos:response.data, isLoading:false,isError:isError})
        return response.data
    },{
        refetchOnWindowFocus:false,
        staleTime:1000*60, //1 minute

    })


    return (
        <div className="row justify-content-center mt-3">
            <div className="col-lg-6">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Description</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isError?<p className="text-danger">Unnable to reach the server! </p>:<Todo/>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListTodos;