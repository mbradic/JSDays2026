import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ToDoList from './ToDoList.vue'
import ToDoForm from './ToDoForm.vue'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: '/',
        component:ToDoList,
    },
    {
        path: '/add',
        component: ToDoForm,
    }
  ]
})

createApp(App)
    .use(router)
    .mount('#app')
