import { Component, SecurityContext, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Collaborateur } from '../../Models/collaborateur';
import { AuthService } from '../../Services/auth.service';
import { navItems, navItemsCol } from '../../_nav';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { Apollo } from 'apollo-angular';
import { findNotifCol, updateNotif } from '../../shared/Notification';
import { Notification } from '../../Models/notification'
import { UserRole } from '../../Enums/UserRole';
import { WebSocketService } from '../../Services/web-socket.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-dashboard',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css'],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  public sidebarMinimized = false;
  public navItems = navItems;
  public navItemsCol = navItemsCol;

  user: Collaborateur;
  roleTest = true;
  notifications: Notification[];
  notificationsNonLu: Notification[] = [];
  count: number;

  // dismissible = true;
  // alerts: any = [
  //   {
  //     type: 'success',
  //     msg: `You successfully read this important alert message.`
  //   },
  //   {
  //     type: 'info',
  //     msg: `This alert needs your attention, but it's not super important.`
  //   },
  //   {
  //     type: 'danger',
  //     msg: `Better check yourself, you're not looking too good.`
  //   }
  // ];

  // alertsDismiss: any = [];
  private unsubscribeOnDestroy = new Subject<void>();

  constructor(
    private auth: AuthService,
    private apollo: Apollo,
    private webSocketService: WebSocketService
  ) {
  }

  ngOnInit(): void {
    this.webSocketService.getSockets()
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe((data) => {
        console.log("*".repeat(20),data);
        this.updateCount(parseInt(data));
        this.getNotificationsNonLu();
      })
    this.user = this.auth.getUser();
    if (this.user.role == UserRole.COLLABORATEUR) this.roleTest = false;
    this.getAllNotifications();
    console.log("user header:", this.user);
    console.log("user linkedin:", this.user.cv.cmptLinkedin);
  }

  public ngOnDestroy() {
    this.unsubscribeOnDestroy.next();
    this.unsubscribeOnDestroy.complete();
  }

  logout() {
    this.auth.logout();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  getNotifications() {
    this.count =0;
    this.getNotificationsNonLu();
    if (this.notificationsNonLu.length > 0) {
      for(var notif of this.notificationsNonLu){
        this.updateLuNotif(notif.id);
        if(this.notificationsNonLu.indexOf(notif) === this.notificationsNonLu.length-1){
          this.notificationsNonLu = [];
          console.log("notificationsNonLu after update:", this.notificationsNonLu,this.notificationsNonLu.indexOf(notif),this.notificationsNonLu.length-1);
        }
      }
    }
  }

  getAllNotifications() {
    this.count = 0;
    this.apollo
      .query<any>({
        query: findNotifCol,
        variables: { idCol: this.user.id }
      })
      .subscribe(({ data }) => {
        this.notifications = data.findNotifCol;
        console.log('notifications :', this.notifications);
        this.notifications.forEach(notif => {
          if (!notif.lu) {
            this.count++;
            this.notificationsNonLu.push(notif);
          }
        });
        console.log("notificationsNonLu:", this.notificationsNonLu)
      });
  }

  getNotificationsNonLu() {
    this.apollo
      .query<any>({
        query: findNotifCol,
        variables: { idCol: this.user.id }
      })
      .subscribe(({ data }) => {
        this.notifications = data.findNotifCol;
        console.log('notifications :', this.notifications);
        this.notifications.forEach(notif => {
          if (!notif.lu) {
            this.notificationsNonLu.push(notif);
          }
        });
        console.log("notificationsNonLu:", this.notificationsNonLu)
      });
  }

  updateCount(colId) {
    if (this.user.id == colId) {
      this.count++;
      console.log("count update:", this.count);
    }
  }

  updateLuNotif(idNotif) {
    this.apollo.mutate({
      mutation: updateNotif,
      variables: { idNotif, lu: true }
    }).subscribe((res) => {
      console.log("update notif:", res);
    });
  }

}
