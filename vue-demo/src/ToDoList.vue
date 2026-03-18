<script setup>
import { onMounted, ref } from 'vue';

const todos = ref([])
onMounted(() => {
    fetch('http://localhost:3000/api/todos')
        .then(response => response.json())
        .then(data => {
            todos.value = data
        })
})
</script>

<template>
    <h2>List</h2>
    <button @click="$router.push('/add')">Add</button>
    <ul>
        <li v-for="todo in todos" :key="todo.id" :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
            {{ todo.title }}
        </li>
    </ul>
</template>
  