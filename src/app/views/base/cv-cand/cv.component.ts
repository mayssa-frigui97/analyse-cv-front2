import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Personne } from '../../../Models/personne';
import { findPersonne } from '../../../shared/Candidat/query';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {

  candidat: Personne;
  date= new Date ('1899-11-29T23:46:24.000Z');

  constructor(private apollo : Apollo,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getCand(id);
  }

  getCand(idPersonne: number) {
    this.apollo.query<any>({
      query: findPersonne,
      variables: {idPersonne}
    }).subscribe(({data}) => {
      this.candidat = data.findPersonne;
      console.log("candidat:",this.candidat);
    });
  }

}
