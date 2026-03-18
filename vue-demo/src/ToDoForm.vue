<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const newTodo = ref({
    id: 0,
    title: '',
    completed: false
})
const router = useRouter()
const addTodo = () => {
    fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo.value)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Todo added:', data)
        router.push('/')
    })    
}


</script>

<template>
    <form @submit.prevent="addTodo">
        <div>
            <label for="title">Title:</label>
            <input id="title" v-model="newTodo.title" required />
        </div>
        <div>
            <label for="completed">Completed:</label>
            <input id="completed" type="checkbox" v-model="newTodo.completed" />
        </div>
        <button type="submit">Add</button>
    </form>
</template>

