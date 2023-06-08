import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddTaskComponent } from './component/add-task/add-task.component';
import { ViewTaskComponent } from './component/view-task/view-task.component';
import { HeaderComponent } from './component/header/header.component';
import { EditTaskComponent } from './component/edit-task/edit-task.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'Home', component: HeaderComponent },
  { path: 'addTask', component: AddTaskComponent },
  { path: 'viewtask', component: ViewTaskComponent },
  { path: 'editTask/:id', component: EditTaskComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
