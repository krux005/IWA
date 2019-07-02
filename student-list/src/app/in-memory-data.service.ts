import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Stud} from './student';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
const Students = [
  { id: 1 , name: 'krunal'},
  { id: 2 , name: 'tumin'},
  { id: 3 , name: 'fenil'}
];

return {Students};
  }

  genId(Students: Stud[]): number {
return Students.length > 0 ? Math.max(...Students.map(student => student.id)) + 1 : 11;
  }
}

