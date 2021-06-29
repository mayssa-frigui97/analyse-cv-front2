import {Component, SecurityContext, ViewEncapsulation} from '@angular/core';
import { Collaborateur } from '../../Models/collaborateur';
import { AuthService } from '../../Services/auth.service';
import { navItems, navItemsCol } from '../../_nav';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { Apollo } from 'apollo-angular';
import { findNotifCol } from '../../shared/Notification';
import {Notification} from '../../Models/notification'
import { UserRole } from '../../Enums/UserRole';


export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-dashboard',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css'],
  providers:[{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  public navItemsCol = navItemsCol;

  user: Collaborateur;
  roleTest = true;
  notifications : Notification;

  dismissible = true;
  alerts: any = [
    {
      type: 'success',
      msg: `You successfully read this important alert message.`
    },
    {
      type: 'info',
      msg: `This alert needs your attention, but it's not super important.`
    },
    {
      type: 'danger',
      msg: `Better check yourself, you're not looking too good.`
    }
  ];

  alertsDismiss: any = [];

  constructor(
    private auth: AuthService,
    private apollo: Apollo,
    ) {
     }

  ngOnInit(): void {
    this.user=this.auth.getUser();
    if(this.user.role == UserRole.COLLABORATEUR) this.roleTest = false;
    console.log("user header:",this.user);
    this.getNotifications();
  }

  logout() {
    this.auth.logout();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  getNotifications(){
    this.apollo
    .query<any>({
        query: findNotifCol,
        variables: {idCol: this.user.id}
      })
      .subscribe(({data}) => {
        this.notifications = data.findNotifCol;
        console.log('notifications :', this.notifications);
      });
  }

}
