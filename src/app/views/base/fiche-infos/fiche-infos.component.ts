import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Collaborateur } from '../../../Models/collaborateur';
import { AuthService } from '../../../Services/auth.service';
import { findCol } from '../../../shared/Collaborateur/query';

@Component({
  selector: 'app-fiche-infos',
  templateUrl: './fiche-infos.component.html',
  styleUrls: ['./fiche-infos.component.scss']
})
export class FicheInfosComponent implements OnInit {

  user: Collaborateur;

  constructor(
    private auth: AuthService,
    private apollo : Apollo,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.getCol(id);
    }
    this.user=this.auth.getUser();
    console.log("user fiche:",this.user)
  }

  getCol(idCol: number) {
    this.apollo.query<any>({
      query: findCol,
      variables: {idCol}
    }).subscribe(({data}) => {
      this.user = data.findCol;
      console.log("col:",this.user);
    });
  }

}
