import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../Services/auth.service';

@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.component.html',
  styleUrls: ['./dispatcher.component.scss']
})
export class DispatcherComponent implements OnInit {

  public loggedIn: boolean;
  public role: string;

  constructor(
    private Routing: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    this.loggedIn = false;
    if (this.auth.getToken()) {
      this.Routing.navigateByUrl('/admin');//ken fama token yhezek lel admin wala login
    } else {
      this.Routing.navigateByUrl('/login');
    }
  }

}
