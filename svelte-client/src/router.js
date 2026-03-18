import { createRouter } from "sv-router";
import TodoList from "./TodoList.svelte";
import TodoForm from "./TodoForm.svelte";

export const router = createRouter({
  '/': TodoList,
  '/add': TodoForm,
});