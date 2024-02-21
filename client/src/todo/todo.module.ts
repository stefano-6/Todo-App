import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Containers
import { TodoComponent } from 'src/todo/containers/todo/todo.component';

// Components
import { TodoListComponent } from 'src/todo/components/todo-list/todo-list.component';
import { TodoDetailsComponent } from 'src/todo/components/todo-details/todo-details.component';
import { UsersListComponent } from 'src/todo/components/users-list/users-list.component';

// Angular Material Modules
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    TodoDetailsComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class TodoModule { }
