<script>
  import { router } from "./router";

    const state = $state({ todo: {
        id: 0,
        title: '',
        completed: false,
    } });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:3000/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state.todo),
        });
        router.navigate('/');
    };
</script>

<h2>Add Todo</h2>
<form onsubmit={handleSubmit}>
    <div>
        <label for="title">Title</label>
        <input type="text" bind:value={state.todo.title} required />
    </div>
    <div>
        <label for="completed">Completed</label>
        <input type="checkbox" bind:checked={state.todo.completed} />
    </div>
    <button type="submit">Add</button>
</form>