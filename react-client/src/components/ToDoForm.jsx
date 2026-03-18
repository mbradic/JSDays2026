import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ToDoForm() {
    const [todo, setTodo] = useState({id: 0, title: '', completed: false})
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
        .then(res => res.json())
        .then(newTodo => {
            console.log('New todo added:', newTodo)
            navigate('/')
        })
    }

    return <>
        <h2>Form</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" value={todo.title} onChange={(e) => setTodo({...todo, title: e.target.value})} />
            </div>
            <div>
                <label htmlFor="completed">Completed</label>
                <input type="checkbox" id="completed" checked={todo.completed} onChange={(e) => setTodo({...todo, completed: e.target.checked})} />
            </div>
            <button type="submit">Add</button>
        </form>
    </>
}