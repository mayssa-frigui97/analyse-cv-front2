import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data.allowedRoles;
    // console.log("next.data:",next.data)
    console.log("allowedRoles:",allowedRoles)
    if ((this.authService.isLoggednIn()) && (allowedRoles.includes(this.authService.getRole()))) {
      console.log("isLoggednIn:",this.authService.isLoggednIn())
      console.log("role:",this.authService.getRole())
      // this.router.navigate(['accueil']);
      return true;
    }
    else if ((this.authService.isLoggednIn()) && (allowedRoles.includes(this.authService.getRole().toString()) === false)) {
          this.router.navigate(['']);
          console.log('*'.repeat(50),"erreur : role",this.authService.getRole().toString(),"il n'a pas l'accès pour cette page")
        }
    else {
      this.router.navigate(['']);
      console.log('*'.repeat(50),"erreur: non authentifé");
      return false;
    }
  }

}


