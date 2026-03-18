import { CommonModule } from '@angular/common';
import { Component, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { type ToDo } from '../ToDo';

@Component({
  selector: 'app-to-do-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
})

export class ToDoList implements OnInit {
  constructor(private readonly router: Router) { }
  url = input('http://localhost:3000/api/todos');
  todos = signal<ToDo[]>([]);
  error = signal('');
  ngOnInit(): void {
    if (this.url()) {
      fetch(this.url())
        .then(response => response.json())
        .then(data => this.todos.set(data))
        .catch(err => this.error.set(`Failed to load to-dos. Error: ${err.message}`));
    }
  }
  add() {
    this.router.navigate(['/add']);
  }
}
