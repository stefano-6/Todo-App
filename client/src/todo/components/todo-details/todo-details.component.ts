import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import { User } from 'src/todo/models/user'
import { Task } from 'src/todo/models/task'
import { TodoVM } from 'src/todo/view-models/todoVM'

@Component({
  selector: 'todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit, OnChanges {

  // Variables
  @Input() users$: Observable<User[]> | undefined
  @Input() selectedTask$: Observable<Task> | undefined
  @Output() saveEvent: EventEmitter<TodoVM> = new EventEmitter()
  @Output() updateEvent: EventEmitter<TodoVM> = new EventEmitter()
  @Output() deleteEvent: EventEmitter<number[]> = new EventEmitter()

  taskIdControl = new FormControl(0)
  taskNameControl = new FormControl('', Validators.required)
  dateCreatedControl = new FormControl('')
  completeControl = new FormControl(false)
  dateCompletedControl = new FormControl('1900-01-01T00:00:00.000Z')
  userIdControl = new FormControl(0)

  options: FormGroup = this._formBuilder.group({
    id: this.taskIdControl,
    name: this.taskNameControl,
    dateCreated: this.dateCreatedControl,
    complete: this.completeControl,
    dateCompleted: this.dateCompletedControl,
    userId: this.userIdControl
  });

  constructor(private _formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedTask$ != undefined) {
      this.selectedTask$!.subscribe(task => {

        this.taskIdControl.setValue(task.id)
        this.taskNameControl.setValue(task.name)
        this.dateCreatedControl.setValue(task.dateCreated)
        this.completeControl.setValue(task.complete)
        this.dateCompletedControl.setValue(task.dateCompleted)
        this.userIdControl.setValue(task.userId)
      })
    } else {
      this.taskIdControl.setValue(0)
      this.taskNameControl.setValue('')
      this.dateCreatedControl.setValue('')
      this.completeControl.setValue(false)
      this.dateCompletedControl.setValue('1900-01-01T00:00:00.000Z')
      this.userIdControl.setValue(0)
    }
  }

  ngOnInit(): void {
    if (this.selectedTask$ != undefined) {
      this.selectedTask$.subscribe(task => {
        this.taskIdControl.setValue(task.id)
        this.taskNameControl.setValue(task.name)
        this.dateCreatedControl.setValue(task.dateCreated)
        this.completeControl.setValue(task.complete)
        this.dateCompletedControl.setValue(task.dateCompleted)
        this.userIdControl.setValue(task.userId)
      })
    }
  }

  // Emit event to SAVE/UPDATE a task in the database
  save() {

    var taskFromForm: Task = {
      id: this.options.value.id,
      name: this.options.value.name,
      dateCreated: this.options.value.dateCreated,
      complete: this.options.value.complete,
      dateCompleted: this.options.value.dateCompleted,
      userId: this.options.value.userId
    }

    var todoVm: TodoVM

    this.users$!.subscribe(users => {
      users.forEach(user => {
        if (user.id == Number(this.userIdControl.getRawValue()!)) {
          todoVm = {
            task: taskFromForm,
            user: user
          }

          if (this.selectedTask$ == undefined) {
            this.saveEvent.emit(todoVm)
          } else {
            this.updateEvent.emit(todoVm)
          }
        }
      });
    })
  }

  // Emit event to DELETE a task from the database
  delete() {
    this.deleteEvent.emit([this.options.value.id, this.options.value.userId])
  }
}
