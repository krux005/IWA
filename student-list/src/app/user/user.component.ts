import { Component, OnInit } from '@angular/core';
import {Stud} from '../student';
import {StudentService} from '../student.service';
import {UserService} from '../services/user.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  board: string;
  errorMessage: string;
  student: Stud[];

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private studentService: StudentService,
              private location: Location) { }

  ngOnInit() {
    this.getStudents();
    this.userService.getUserPage().subscribe(
      data => {
        this.board = data;

      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }
  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(Students => this.student = Students);
  }
  goBack(): void {
    this.location.back();
  }
}
