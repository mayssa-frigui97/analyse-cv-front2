import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { StatutCV } from '../../../Enums/StatutCV';
import { UserRole } from '../../../Enums/UserRole';
import { Collaborateur } from '../../../Models/collaborateur';
import { Competence } from '../../../Models/competence';
import { Cv } from '../../../Models/cv';
import { Equipe } from '../../../Models/equipe';
import { Personne } from '../../../Models/personne';
import { Pole } from '../../../Models/pole';
import { AuthService } from '../../../Services/auth.service';
import { findPersonnes, findFilterCands, updateRecommande, removePersonne, search, removeCandidat, findCompetencesCandidats } from '../../../shared/Candidat';
import { createCol, findEquipes, findPoles, findRoles } from '../../../shared/Collaborateur';
import { updateStatutCv } from '../../../shared/Cv/query';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { DataTableItem } from '../data-table-datasource';

@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.scss']
})
export class CandidatsComponent implements OnInit {

  public file: File = null;
  public userRole: string;
  public equipe : number;
  public pole: number;
  public candidats: Personne[];
  myUser: Personne;
  marked : boolean;
  public test = true;
  public cvs: Cv[];
  equipes :Equipe[];
  poles: Pole[];
  public competences: Competence[];
  public subscription : Subscription;

  selectedComp: string[];
  selectedPole: string;
  selectedTL: string;
  searchWord: string='';
  roles: Collaborateur[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  dataSource: MatTableDataSource<any>;


  displayedColumns = ['nom', 'email','tel','recommande','id'];

  constructor(
    private apollo: Apollo,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService
    ){
      this.dataSource = new MatTableDataSource();
     }

  ngOnInit(): void {
    this.userRole=this.auth.getRole();
    if(this.userRole==UserRole.RP){
      this.pole=this.auth.getPole();
    }
    else if(this.userRole==UserRole.TEAMLEADER){
      this.equipe=this.auth.getEquipe();
    }
    this.getCompetences();
    this.getEquipes();
    this.getPoles();
    this.getRoles();
    if(!this.candidats){
      this.getAllCandidats();}
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getAllCandidats() {
    this.subscription= this.apollo.query<any>({
      query: findPersonnes,
    })
    .subscribe(({data}) => {
      this.candidats = data.findPersonnes;
      this.dataSource.data = this.candidats;
      console.log("allcandidats :",this.candidats);
      this.subscription.unsubscribe();
    });
  }

  getFilterCands(selectedComp?: string[]) {
    let variables;
    this.searchWord='';
    if(selectedComp.length==0){
      variables={};
    }
    else{
      variables={selectedComp};
    }
    this.subscription=this.apollo
    .query<any>({
        query: findFilterCands,
        variables: variables,
      })
      .subscribe(({data} ) => {
        // this.candidats = [];
        this.candidats=data.findFilterCands;
        this.dataSource.data = this.candidats;
        if(data.findFilterCands.length  == 0){
          this.test = false;
          // console.log("test",this.test,this.candidats.length)
        }
        else{
          this.test = true;
          // console.log("test",this.test,this.candidats.length)
        }
        console.log('candidats apres filter1:',this.candidats)
        this.subscription.unsubscribe();
      });
    }

  changeRecommande(e,idPersonne: number){
    if (e.target.checked) {
      this.marked=true;}
    else{
      this.marked=false;}
    console.log("recommande:",this.marked)
    this.subscription=this.apollo.mutate({
      mutation: updateRecommande,
      variables: {idPersonne,value: this.marked}
    })
      .subscribe(({data}:any) => {
        console.log("data:",data);
        // this.candidats = [];
        console.log("candidats:",this.candidats);
        // this.getCandidats();
        console.log("candidats nv:",this.candidats);
        this.subscription.unsubscribe();
    });
  }


  deleteCand(idPersonne: number) {
    console.log("myUser:",this.myUser);
    this.candidats = this.candidats.filter(candidat => candidat.id !== idPersonne);
    this.subscription=this.apollo.mutate({
      mutation: removePersonne,
      variables: {idPersonne}
    }).subscribe(res => {
      const indexCand = this.dataSource.data.findIndex((candidat)=>candidat.id == idPersonne);
      if(indexCand>-1){
        let listCandidats = [...this.dataSource.data];//list frozen //bch tepointi 3la case memoire okhra
        listCandidats.splice(indexCand,1);/*supp index*/
        this.dataSource.data = listCandidats;
      }
      this.toastr.success('Succès', 'Candidat supprimé');
      // this.router.navigate(['candidats']);
    }, error => {
      this.toastr.error("suppression impossible!!", 'Erreur');
      console.log("suppression impossible!!")
      this.subscription.unsubscribe();
    });
  }

  search(event) {
    // console.log("searchWord:",searchWord);
    if(event.keyCode === 13){
      if(event && event.target && event.target.value){
        this.searchCands(event.target.value);

      }
    }
    if(event && event.target && !event.target.value && this.test){
      this.getAllCandidats();
      this.test=false;/*bch narj3ou lel état initial mta3 getAllCands*/
    }
  }

  searchCands(searchWord){
    this.selectedComp=[];
    if(searchWord){
    console.log("search word",searchWord)
    this.subscription=this.apollo
      .query<any>({
        query: search,
        variables: {mot: searchWord},
      })
      .subscribe(({ data }) => {
        // this.candidats = [];
        this.candidats = data.search;
        this.dataSource.data = this.candidats;
        if(data.search.length == 0){
          this.test = false;
          console.log("test",this.test,this.candidats.length)
        }
        else{
          this.test = true;
          console.log("test",this.test,this.candidats.length)
        }
        console.log('candidats apres recherche:',this.candidats)
        this.subscription.unsubscribe();
      });
    }
  }

  getCompetences(): Competence[] {
    this.apollo
    .query<any>({
        query: findCompetencesCandidats,
      })
      .subscribe(({data}) => {
        this.competences = data.findCompetencesCandidats;
        console.log('competences :', this.competences);
      });
    return this.competences;
  }

  getEquipes() {
    this.apollo
    .query<any>({
        query: findEquipes,
      })
      .subscribe(({data}) => {
        this.equipes = data.findEquipes;
      });
    console.log('Equipes :', this.equipes);
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
  }

  getRoles(){
    this.apollo
    .query<any>({
        query: findRoles,
      })
      .subscribe(({data}) => {
        this.roles = data.findRoles;
        console.log('postes data:', data);
      });
      console.log('postes :', this.roles);
  }

  affecterCandidat(formulaire, cand: Personne){
    console.log("candidat:",cand)
    this.updateStatut(cand.cv.id,StatutCV.ACCEPTE);
    console.log("formulaire: ",formulaire);
    let createColInput={
      cin: formulaire.cin,
      telPro: parseInt(formulaire.telPro),
      emailPro: formulaire.emailPro,
      poste: formulaire.poste,
      salaire: formulaire.salaire,
      dateEmb: formulaire.dateEmb,
      nomUtilisateur: formulaire.nomUtilisateur,
      role: formulaire.role,
      equipeId: parseInt(formulaire.equipe),
      nom: cand.nom,
      etatCivil: cand.etatCivil,
      dateNaiss: cand.dateNaiss,
      adresse: cand.adresse,
      tel: cand.tel,
      email: cand.email,
      recommande: cand.recommande,
      cvId: cand.cv.id
    }
    console.log("createcolinput:",createColInput)
    this.apollo.mutate({
      mutation: createCol,
      variables: {createColInput}
    }).subscribe(({data}: any)=> {
      console.log("data ap creation:", data)
      this.deleteCandAffecte(cand.id);
      console.log("candidat deleted")
    }
    );
  }

  updateStatut(idCv, statut){
    this.apollo.mutate({
      mutation: updateStatutCv,
      variables: {idCv,statut}
    }).subscribe(({data}: any) => {
      return data.updateStatutCv;
    });
  }

  deleteCandAffecte(idCand: number) {
    this.candidats = this.candidats.filter(candidat => candidat.id !== idCand);
    this.apollo.mutate({
      mutation: removeCandidat,
      variables: {idCand}
    }).subscribe(res => {
      const indexCand = this.dataSource.data.findIndex((candidat)=>candidat.id == idCand);
      if(indexCand>-1){
        let listCandidats = [...this.dataSource.data];//list frozen //bch tepointi 3la case memoire okhra
        listCandidats.splice(indexCand,1);/*supp index*/
        this.dataSource.data = listCandidats;
      }
      this.toastr.success('Succès', 'Candidat affecté');
      // this.router.navigate(['candidats']);

    }, error => {
      this.toastr.error("Affectation impossible!!", 'Erreur');
      console.log("affectation impossible!!")
    });
  }
}
