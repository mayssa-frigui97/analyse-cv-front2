// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';
import { NotificationsComponent } from './notifications.component';

// Notifications Routing
import { NotificationsRoutingModule } from './notifications-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    AlertModule.forRoot()
  ],
  declarations: [
    NotificationsComponent
  ]
})
export class NotificationsModule { }
