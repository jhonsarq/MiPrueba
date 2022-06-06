import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatusComponent } from './status/status.component';
import { PrioritiesComponent } from './priorities/priorities.component';

const routes: Routes = [{
    path:'login',
    component:LoginComponent
},{
    path:'dashboard',
    component:DashboardComponent
},{
    path:'status',
    component:StatusComponent
},{
    path:'priorities',
    component:PrioritiesComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
