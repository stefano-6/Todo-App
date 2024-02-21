import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Observable } from 'rxjs'
import { User } from 'src/todo/models/user'

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  // Variables
  @Input() users$: Observable<User[]> | undefined
  @Input() selectedUser$: Observable<number> | undefined
  @Output() userSelectedEvent: EventEmitter<number> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  // Emit event after an user is selected
  onSelect(userId: number) {
    this.userSelectedEvent.emit(userId)
  }
}
