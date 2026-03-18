import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do-form',
  imports: [FormsModule],
  templateUrl: './to-do-form.html',
  styleUrl: './to-do-form.css',
})
export class ToDoForm {
  constructor(private readonly router: Router) { }
  todo = signal({ id: 0,title: '', completed: false });
  addToDo() {
    fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.todo()),
    }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
