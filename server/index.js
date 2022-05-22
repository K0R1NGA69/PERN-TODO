const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database/db")

//midleware

app.use(cors())
app.use(express.json())

//ROUTES

//create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows)
    } catch (err) {
        console.error(err.message)
    }
})
//get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todo"
        )
        res.json(allTodos.rows)
    } catch (error) {
        console.error(err.message)
    }

})

//get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const {id}=req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",[
                id
            ]
        )
        res.json(todo.rows)
    } catch (error) {
        console.error(err.message)
    }

})

//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const {id}=req.params;
        const {description}=req.body;
        const todo = await pool.query(
            "UPDATE todo SET description=$1 WHERE todo_id = $2",[
                description,id
            ]
        )
        res.json("UPDATED!!!")
    } catch (err) {
        console.error(err.message)
    }

})

//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const {id}=req.params;
        const todo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",[
                id
            ]
        )
        res.json(id+" DELETED!!!")
    } catch (err) {
        console.error(err.message)
    }

})






app.listen(5001, () => {
    console.log("Server listening on port 5001")
})