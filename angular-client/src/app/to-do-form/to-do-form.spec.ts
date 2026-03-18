import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoForm } from './to-do-form';

describe('ToDoForm', () => {
  let component: ToDoForm;
  let fixture: ComponentFixture<ToDoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ToDoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
