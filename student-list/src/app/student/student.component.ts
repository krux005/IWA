import { Component, OnInit } from '@angular/core';
import {Stud} from '../student';
import {Location} from '@angular/common';
import {StudentService} from '../student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [StudentService]
})
export class StudentComponent implements OnInit {
  Students: Stud[];

  constructor(private studentService: StudentService,
              private location: Location) {
  }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(Students => this.Students = Students);
  }

  add(firstname: string, lastname: string, email: string, grades: string, course: string, year: string): void {
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    grades = grades.trim();
    course = course.trim();
    year = year.trim();
    this.studentService.addStudent({firstname, lastname, email, grades, course, year} as Stud)
      .subscribe(student => {this.Students.push(student);
      });
  }

  delete(student: Stud): void {
    this.Students = this.Students.filter(h => h !== student);
    this.studentService.deleteStudent(student).subscribe();
  }

  goback(): void {
    this.location.back();
}
}
