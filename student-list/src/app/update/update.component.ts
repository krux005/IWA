import { Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Stud} from '../student';
import {StudentService} from '../student.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  @Input() student: Stud;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getStudent();
  }

  getStudent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent404(id)
      .subscribe(student => this.student = student);
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.studentService.updateStudent(this.student)
      .subscribe(() => this.goBack());
  }

}
