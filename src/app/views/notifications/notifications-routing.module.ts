import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRole } from '../../Enums/UserRole';
import { AuthGuard } from '../../Services/auth-guard.service';
import { NotificationsComponent } from './notifications.component';


const routes: Routes = [
  {
    component: NotificationsComponent,
    path: '',
    canActivate: [AuthGuard],
    data: {
      title: 'Notifications',
      allowedRoles: [UserRole.COLLABORATEUR, UserRole.RH, UserRole.RP, UserRole.TEAMLEADER]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {}
