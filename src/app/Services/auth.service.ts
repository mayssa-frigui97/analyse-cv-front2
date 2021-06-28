import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborateur } from './../Models/collaborateur';
import { Apollo } from 'apollo-angular';
import { refreshToken } from '../shared/Collaborateur/query';
import { UserRole } from '../Enums/UserRole';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Collaborateur;
  role: string;
  pole: number;
  equipe: number;

  constructor(private myRoute: Router,
    private apollo: Apollo) { }

  sendToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  sendRefreshToken(token: string) {
    localStorage.setItem('refresh_token', token);
  }

  sendRole(role: UserRole) {
    console.log("send role",role);
    localStorage.setItem('LoggedInUserROLE', role);
  }

  getRole() {
    this.role = localStorage.getItem('LoggedInUserROLE');
    console.log("get role",this.role);
    return this.role;
  }

  sendPole(pole: number) {
    console.log("send pole",pole);
    localStorage.setItem('LoggedInPOLE', pole.toString());
  }

  getPole() {
    this.pole = parseInt(localStorage.getItem('LoggedInPOLE'));
    console.log("get pole",this.pole);
    return this.pole;
  }

  sendEquipe(equipe: number) {
    console.log("send equipe",equipe);
    localStorage.setItem('LoggedInEQUIPE', equipe.toString());
  }

  getEquipe() {
    this.equipe = parseInt(localStorage.getItem('LoggedInEQUIPE'));
    console.log("get role",this.equipe);
    return this.equipe;
  }

  sendUser(user: Collaborateur) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify( this.user));
  }

  getUser() :Collaborateur{
    return JSON.parse(localStorage.getItem('user'));

  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getrefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  isLoggednIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('access_token');
    // localStorage.removeItem('LoggedInUserROLE');
    localStorage.removeItem('user');
    this.myRoute.navigate(['']);
  }

  async refreshToken(){
    const result = new Promise((resolve, reject) =>  {
    const refresh = {refreshToken:  this.getrefreshToken()};
    this.apollo
    .mutate({
        mutation: refreshToken,
        variables: {input: refresh}
      })
      .subscribe(({data}: any)=> {
        console.log(data)
        this.sendUser(data.refreshToken.user);
        this.sendToken(data.refreshToken.accessToken);
      });
    resolve(this.getToken);
    return;
  });
  }
}
