import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { UserRole } from '../../Enums/UserRole';
import { Collaborateur } from '../../Models/collaborateur';
import { Pole } from '../../Models/pole';
import { AuthService } from '../../Services/auth.service';
import { AlertService } from '../../Services/alert.service';
import { login, findPoles } from '../../shared/Collaborateur/query';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  loginForm: FormGroup;
  private nomUtilisateur: string;
  private motDePasse: string;
  public token: string;
  public user: Collaborateur;
  submitted = false;
  loading = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  poles: Pole[];

  constructor(private apollo: Apollo, private formBuilder: FormBuilder, private http: HttpClient,
              private router: Router,
              private auth: AuthService,
              private toastr: ToastrService,
              private alertService: AlertService
  ) {
    if (this.auth.isLoggednIn()) {
      this.isLoggedIn=true;
      this.isLoginFailed = false;
      this.router.navigate(['accueil']);
    }
  }

  ngOnInit() {
    this.poles=this.getPoles();
    this.loginForm = this.formBuilder.group({
      nomUtilisateur: ['', Validators.required],
      motDePasse: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted=true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid ) {
      this.toastr.error('Nom utilisateur ou mot de passe invalide!');
      return;
    }
    this.loading=true;
    this.nomUtilisateur = this.f.nomUtilisateur.value;
    this.motDePasse = this.f.motDePasse.value;
    console.log(this.nomUtilisateur);
    this.apollo.query<any>({
      query: login,
      variables: {nomUtilisateur: this.f.nomUtilisateur.value, motDePasse: this.f.motDePasse.value}
    })
    .subscribe(async ({data}: any) => {
      console.log(data);
        this.token = data.login.access_token;
        if(this.token)
        {
          this.user = data.login.user;
          this.auth.sendToken(data.login.access_token);
          this.auth.sendRefreshToken(data.login.refresh_token);
          this.auth.sendRole(data.login.user.role);
          this.auth.sendUser(this.user);
          if(this.user.role== UserRole.RP){
            let idPole =this.getPoleRp(this.user.id)
            this.auth.sendPole(idPole);
          }
          if(this.user.role== UserRole.TEAMLEADER){
            this.auth.sendEquipe(this.user.equipe.id);
          }
          this.isLoggedIn=true;
          this.isLoginFailed = false;
          console.log("token:",this.token);
          this.toastr.success('Connexion approuvée');
          this.router.navigateByUrl('');
      }
      else {
        this.toastr.error('Nom utilisateur ou mot de passe invalide!');
        // this.alertService.error(err);
        this.loading = false;
        this.isLoginFailed = true;
      }
    }
    );
  }

  getPoleRp(idRp: number):number{
    let poleId :number;
    this.poles=this.getPoles();
    this.poles.forEach(pole => {
      if(pole.rp.id === idRp)
      {
        console.log("pole:",pole.id,"de rp:",idRp)
         poleId= pole.id;
      }
    });
    return poleId;
  }

  getPoles() {
    this.apollo
    .query<any>({
        query: findPoles,
      })
      .subscribe(({data}) => {
        this.poles = data.findPoles;
      });
    console.log('Poles :', this.poles);
    return this.poles;
  }

  logout() {
    this.auth.logout();
  }
 }

