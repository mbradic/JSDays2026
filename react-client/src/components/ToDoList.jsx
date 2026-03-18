import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ToDoList() {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/api/todos')
            .then(res => res.json())
            .then(setTodos)
    }, [])
    const navigate = useNavigate()
    const handleAdd = () => {
        navigate('/add')
    }
  return <>
    <h2>List</h2>
    <button onClick={handleAdd}>Add</button>
    <ul>
        {todos.map(todo => <li 
            key={todo.id}
            style={{textDecoration: todo.completed ? 'line-through' : ''}}
            >
                {todo.title}
            </li>)
        }
    </ul>
  </>
}