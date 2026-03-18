<script>
  import { router } from './router';
  import { onMount } from 'svelte';
  const state = $state({ todos: [] });
  onMount(() => {
    fetch('http://localhost:3000/api/todos')
      .then(res => res.json())
      .then(data => {
        state.todos = data;
      });   
  });
</script>

<h2>Todo List</h2>
<button onclick={() => router.navigate('/add')}>Add</button>
<ul>
  {#each state.todos as todo}
    <li style:text-decoration={todo.completed ? 'line-through' : 'none'}>
      {todo.title}
    </li>
  {/each}
</ul>