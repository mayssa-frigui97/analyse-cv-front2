import {Component, SecurityContext, ViewEncapsulation} from '@angular/core';
import { Collaborateur } from '../../Models/collaborateur';
import { AuthService } from '../../Services/auth.service';
import { navItems } from '../../_nav';
import { CardsModule } from 'angular-bootstrap-md'
import { DomSanitizer } from '@angular/platform-browser';
import { AlertConfig } from 'ngx-bootstrap/alert';


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

  user: Collaborateur;

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

  alertsHtml: any = [
    {
      type: 'success',
      msg: `<strong>Well done!</strong> You successfully read this important alert message.`
    },
    {
      type: 'info',
      msg: `<strong>Heads up!</strong> This alert needs your attention, but it's not super important.`
    },
    {
      type: 'danger',
      msg: `<strong>Warning!</strong> Better check yourself, you're not looking too good.`
    }
  ];

  index = 0;
  messages = [
    'You successfully read this important alert message.',
    'Now this text is different from what it was before. Go ahead and click the button one more time',
    'Well done! Click reset button and you\'ll see the first message'
  ];

  alertsDismiss: any = [];

  constructor(
    private auth: AuthService,
    sanitizer: DomSanitizer) {
      this.alertsHtml = this.alertsHtml.map((alert: any) => ({
        type: alert.type,
        msg: sanitizer.sanitize(SecurityContext.HTML, alert.msg)
      }));
     }

  ngOnInit(): void {
    this.user=this.auth.getUser();
    console.log("user header:",this.user.etatCivil)
  }

  logout() {
    this.auth.logout();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }



}
