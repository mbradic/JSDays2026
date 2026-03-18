import express from 'express';
import cors from 'cors';

const todos = [
  { id: 1, title: 'Learn JavaScript', completed: false },
  { id: 2, title: 'Build a React app', completed: false },
  { id: 3, title: 'Write a blog post', completed: true },
];

const app = express();
app.use(express.json());
app.use(cors());


app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: req.body.completed
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});