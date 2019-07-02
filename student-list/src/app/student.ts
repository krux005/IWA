export class Stud {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  grades: string;
  course: string;
  year: string;


  constructor(firstname: string, lastname: string, email: string, grades: string, course: string, year: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.grades = grades;
    this.course = course;
    this.year = year;
  }

}
