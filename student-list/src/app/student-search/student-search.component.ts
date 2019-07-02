import { Component, OnInit } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {Stud} from '../student';
import {StudentService} from '../student.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.css'],
  providers: [StudentService]
})
export class StudentSearchComponent implements OnInit {

   students$: Observable<Stud[]>;

  private searchTerms = new Subject<string>();


  constructor(private studentservice: StudentService,
              private location: Location) {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }


  ngOnInit(): void {
    this.students$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
     switchMap((term: string) => this.studentservice.searchStudent(term)),
    );
  }

  goBack(): void {
    this.location.back();
  }

}
