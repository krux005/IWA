import { Component, OnInit } from '@angular/core';
import {Stud} from '../student';
import {Location} from '@angular/common';
import {StudentService} from '../student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Students: Stud[] = [];

  constructor(
    private studentService: StudentService,
    private location: Location) {
  }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(Students => this.Students = Students.slice(1, 5));
  }
  goBack(): void {
    this.location.back();
  }
}

