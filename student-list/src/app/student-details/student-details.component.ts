import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Stud} from '../student';
import {StudentService} from '../student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
   Student: Stud[];



  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getStudents();
  }
  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(Students => this.Student = Students);
  }

  update(firstname: string, lastname: string, email: string, grades: string, course: string, year: string): void {
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    grades = grades.trim();
    course = course.trim();
    year = year.trim();
    this.studentService.updateStudent({firstname, lastname, email, grades, course, year} as Stud)
      .subscribe(student => {
        this.Student.push(student);
      });

  }

  delete(student: Stud): void {
    this.Student = this.Student.filter(h => h !== student);
    this.studentService.deleteStudent(student).subscribe();
  }


  goBack(): void {
    this.location.back();
  }
}
