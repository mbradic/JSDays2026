import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: '',
  loadComponent: () => import('./to-do-list/to-do-list').then(m => m.ToDoList)
}, {
  path: 'add',
  loadComponent: () => import('./to-do-form/to-do-form').then(m => m.ToDoForm)
}];
