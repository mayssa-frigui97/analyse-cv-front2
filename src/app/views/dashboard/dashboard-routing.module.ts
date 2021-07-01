import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRole } from '../../Enums/UserRole';
import { AuthGuard } from '../../Services/auth-guard.service';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Dashbord',
      allowedRoles: [UserRole.COLLABORATEUR, UserRole.RH, UserRole.RP, UserRole.TEAMLEADER]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
