import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { User } from 'src/todo/models/user';
import { Task } from 'src/todo/models/task';
import { ApiService } from 'src/todo/services/api.service';
import { TodoVM } from 'src/todo/view-models/todoVM';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  // Variables
  tasks$: Observable<Task[]> | undefined
  users$: Observable<User[]> | undefined
  selectedTask$: Observable<Task> | undefined
  selectedUser$: Observable<number> | undefined
  showForm: boolean = false

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getTodos().subscribe(vms => {
      var tasks: Task[] = []
      var users: User[] = []
      vms.forEach(vm => {
        users.push(vm.user)
      });

      this.tasks$ = of(tasks)

      var tempUsers = this.uniqueArray(users, 'id')
      this.users$ = of(tempUsers)
    })
  }

  // Pick unique vitems from array
  private uniqueArray(target: Array<any>, property: any): Array<any> {
    return target.filter((item, index) =>
      index === target.findIndex(t => 
        t[property] === item[property]
      )
    );
  }

  // Populate the list of tasks accordingly to the user selected
  selectTasksByUser(userId: number) {
    // this.tasks$ = undefined
    this.apiService.getTodos().subscribe(vms => {
      var tasks: Task[] = []
      vms.forEach(vm => {
        if (vm.task.userId == userId) {
          this.selectedUser$ = of(vm.task.userId)
          tasks.push(vm.task)
        }
      });
      this.tasks$ = of(tasks)
      this.showForm = false
    })
  }

  // Select the task to be shown in the Details Container
  selectTaskById(taskId: number) {
    if(this.tasks$ != undefined){
      this.tasks$.subscribe(tasks => {
        tasks.forEach(task => {
          if (task.id == taskId) {
            this.selectedTask$ = of(task)
            this.showForm = true
          }
        });
      });
    }

  }

  // Show empty form to add a new Task
  addNewTask() {
    this.selectedTask$ = undefined
    this.showForm = true
  }

  // Save new Task in the database
  save(todoVm: TodoVM) {
    this.apiService.saveTodo(todoVm).subscribe(vm => {
      this.selectTasksByUser(vm.task.userId)
    })
  }

  // Update Task in the database
  update(todoVm: TodoVM) {
    this.apiService.updateTodo(todoVm).subscribe(vm => {
      this.selectTasksByUser(vm.task.userId)
    })
  }

  // Delete Task from the database
  delete(ids: number[]) {
    this.apiService.deleteTodo(ids[0]).subscribe(() => {
      this.selectTasksByUser(ids[1])
    })
  }
}
