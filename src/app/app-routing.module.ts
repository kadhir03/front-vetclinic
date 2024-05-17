//app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DasComponent } from './modules/pages/dashboard/das.component';
import { LoginComponent } from './modules/pages/login/login.component';

import { RoleGuard } from './modules/auth/role.guard'; 

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashadmin',
    component: DasComponent
    // canActivate: [RoleGuard],
    // data: { roles: [2] }
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


  // Descomentar rutas para hacer cambios o pruebas unitarias ejemplo, http://localhost:4200/roles

  // {
  //   path: 'roles',
  //   component: CruRolComponent
  // }