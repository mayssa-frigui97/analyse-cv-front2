import { Component, SecurityContext, ViewEncapsulation, OnInit } from '@angular/core';
import { Collaborateur } from '../../Models/collaborateur';
import { AuthService } from '../../Services/auth.service';
import { navItems, navItemsCol } from '../../_nav';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { Apollo } from 'apollo-angular';
import { findNotifCol } from '../../shared/Notification';
import {Notification} from '../../Models/notification'
import { UserRole } from '../../Enums/UserRole';
import { WebSocketService } from '../../Services/web-socket.service';


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
export class DefaultLayoutComponent  implements OnInit{
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
    private webSocketService :WebSocketService
    ) {
     }

  ngOnInit(): void {
    // this.webSocketService.listen('test event').subscribe((data)=>{
    //   console.log(data);
    // });
    // this.webSocketService.listen('connected').subscribe((data) => {
    //   console.log(data);
    // })
    this.user = this.auth.getUser();
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
