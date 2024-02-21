import { Task } from "../models/task"
import { User } from "../models/user"

export interface TodoVM {
    task: Task
    user: User
  }