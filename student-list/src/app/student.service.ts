import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import {catchError, tap, map } from 'rxjs/operators';
import {Stud} from './student';
import { MessagesService} from './messages.service';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})

};


@Injectable({ providedIn: 'root' })
export class StudentService {

  private StudentsUrl = 'http://localhost:8080/restApi/students';

  constructor(
    private http: HttpClient,
    private messageService: MessagesService) {}

    /* TO GET STUDENTS FROM SERVERS*/

    getStudents(): Observable<Stud[]> {
      return this.http.get<Stud[]>(this.StudentsUrl)
        .pipe(
          tap(_ => this.log('fetched students')),
          catchError(this.handleError<Stud[]>('getStudents', []))
        );
    }

  getStudent404(id: number): Observable<Stud> {
    const url = `${this.StudentsUrl}/?id=${id}`;
    return this.http.get<Stud[]>(url)
      .pipe(
        map(students => students[5]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Stud>(`getHero id=${id}`))
      );
  }

  /*get student id if 404 not found*/

  getSTUD(id: number): Observable<Stud> {
    const url = `${this.StudentsUrl}/${id}`;
    return this.http.get<Stud>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Stud>(`getSTUD id=${id}`))
    );
  }

 searchStudent(term: string): Observable<Stud[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Stud[]>
    (`${this.StudentsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found students matcing "${term}"`)),
      catchError(this.handleError<Stud[]>('searchStudent', []))
    );
 }
  /* POST: add a new hero to the server */
  addStudent(student: Stud | number): Observable<Stud> {
    return this.http.post<Stud>(this.StudentsUrl, student, httpOptions).pipe(
      tap((newStud: Stud) => alert(`added student w/ id=${newStud.id}`)),
      catchError(this.handleError<Stud>('addStudent'))
    );
  }

  /* DELETE: delete the hero from the server */
  deleteStudent(student: Stud | number): Observable<Stud> {
    const id = typeof student === 'number' ? student : student.id;
    const url = `${this.StudentsUrl}/${id}`;

    return this.http.delete<Stud>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted student id=${id}`)),
      catchError(this.handleError<Stud>('deleteStudent'))
    );
  }

  /* PUT: update the hero on the server */
  updateStudent(student: Stud): Observable<Stud> {
    return this.http.put<Stud>(this.StudentsUrl, student, httpOptions).pipe(
      tap(_ => this.log(`updated student id=${student.id}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
    }

  private log(message: string) {
    this.messageService.add(`StudentService: ${message}`);
  }
}
