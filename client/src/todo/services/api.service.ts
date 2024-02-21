import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { TodoVM } from 'src/todo/view-models/todoVM';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Variable 
  URL: string = 'http://localhost:5086/Todos'
  
  // Error Hendler
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  constructor(private http: HttpClient) { }

  // GET - Get all Todos from the database
  getTodos(): Observable<TodoVM[]> {
    return this.http.get<TodoVM[]>(this.URL)
    .pipe(
      catchError(this.handleError)
    )
  }

  // POST - Post and save a new Todo to the database
  saveTodo(todoVm: TodoVM): Observable<TodoVM> {
    return this.http.post<TodoVM>(this.URL, todoVm)
    .pipe(
      catchError(this.handleError)
    )
  }

  // PUT - Put and update a Todo in the database
  updateTodo(todoVm: TodoVM): Observable<TodoVM> {
    return this.http.put<TodoVM>(this.URL, todoVm)
    .pipe(
      catchError(this.handleError)
    )
  }

  // DELETE - Delete a Todo to the database
  deleteTodo(taskId: number): Observable<any> {
    return this.http.delete<TodoVM>(this.URL + "?id=" + taskId)
    .pipe(
      catchError(this.handleError)
    )
  }
}
