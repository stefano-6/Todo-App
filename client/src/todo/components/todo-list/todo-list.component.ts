import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from 'src/todo/models/task'

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnChanges {

  // Variables
  @Input() tasks$: Observable<Task[]> | undefined
  @Output() taskSelectedEvent: EventEmitter<number> = new EventEmitter()
  @Output() addTaskEvent: EventEmitter<any> = new EventEmitter()
  taskIdSelected: number= -1

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.taskIdSelected = -1
    console.log(this.taskIdSelected)
  }

  ngOnInit(): void {
  }

  // Emit event after a task is selected
  onSelectTask(taskId: number) {
    this.taskIdSelected = taskId
    this.taskSelectedEvent.emit(taskId)
  }

  // Hide list when the "Add Todo" button is triggered
  addTodo() {
    this.taskIdSelected = -1
    this.addTaskEvent.emit()
  }
}
