import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

import {DashboardComponent} from './dashboard/dashboard.component';
import {StudentComponent} from './student/student.component';
import {StudentDetailsComponent} from './student-details/student-details.component';
import {StudentSearchComponent} from './student-search/student-search.component';
import {UpdateComponent} from './update/update.component';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail', component: StudentDetailsComponent},
  {path: 'Students', component: StudentComponent},
  {path: 'search', component: StudentSearchComponent},
  {path: 'update', component: UpdateComponent},
  {path: 'home', component: HomeComponent},
  {path: 'user', component: UserComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'auth/login', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
