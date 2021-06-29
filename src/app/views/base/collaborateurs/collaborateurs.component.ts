import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Apollo } from 'apollo-angular';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRole } from '../../../Enums/UserRole';
import { Collaborateur } from '../../../Models/collaborateur';
import { Competence } from '../../../Models/competence';
import { Cv } from '../../../Models/cv';
import { Equipe } from '../../../Models/equipe';
import { Pole } from '../../../Models/pole';
import { AuthService } from '../../../Services/auth.service';
import { findCols, findEquipe, findEquipes, findEquipesPole, findFilterCols, findPole, findPoles, findPostes, findRoles, removeCol, searchCol, searchEquipe, searchPole, updateRole } from '../../../shared/Collaborateur/query';
import { findAllCompetences } from '../../../shared/Cv/query';
import { createNotif } from '../../../shared/Notification/query';
import { DataTableItem } from '../data-table/data-table-datasource';

@Component({
  selector: 'app-collaborateurs',
  templateUrl: './collaborateurs.component.html',
  styleUrls: ['./collaborateurs.component.scss']
})
export class CollaborateursComponent implements OnInit {

  public userRole: string;
  public equipe: number;
  public nomEquipe: string;
  public pole: number;
  public nomPole: string;
  public cols: Collaborateur[] = [];
  public equipes: Equipe[];
  public postes: Collaborateur[];
  public poles: Pole[];
  public rpId: number;
  public cvs: Cv[];

  public competences: Competence[];
  public myUser: Collaborateur;
  public test = true;
  public subscription: Subscription;

  selectedEquipes: number[];
  selectedPoles: number[];
  selectedComp: string[];
  selectedPoste: string[];
  searchWord: string;
  roles: Collaborateur[];
  selectedRole: UserRole;
  userAuth : String;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  dataSource: MatTableDataSource<any>;


  displayedColumns = ['nom', 'emailPro', 'poste', 'dateEmb', 'pole', 'equipe', 'evaluation', 'id'];


  constructor(
    private apollo: Apollo,
    private toastr: ToastrService,
    private auth: AuthService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.userAuth = this.auth.getUser().nom;
    this.userRole = this.auth.getRole();
    if (this.userRole == UserRole.RP) {
      this.displayedColumns = ['nom', 'emailPro', 'poste', 'dateEmb', 'equipe', 'evaluation', 'id'];
      this.pole = this.auth.getPole();
      this.getEquipesPoles([this.pole]);
      this.getPoleName(this.pole);
      console.log("nom equipe:", this.nomEquipe);
    }
    else if (this.userRole == UserRole.TEAMLEADER) {
      this.displayedColumns = ['nom', 'emailPro', 'poste', 'evaluation', 'id'];
      this.equipe = this.auth.getEquipe();
      this.getEquipeName(this.equipe);
      console.log("nom pole:", this.nomPole);
    }
    else {
      this.getEquipes();
      this.getPoles();
    }
    this.getCols();
    this.getCompetences();
    this.getPostes();
    this.getRoles();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getCols() {
    let variables;
    if (this.equipe) {
      variables = { equipe: this.equipe }
    }
    else if (this.pole) {
      variables = { pole: this.pole }
    }
    else {
      variables = {}
    }
    console.log("variables:", variables);
    this.apollo
      .query<any>({
        query: findCols,
        variables: variables
      })
      .subscribe(({ data }) => {
        this.cols = data.findCols;
        this.dataSource.data = this.cols;
        console.log('cols :', this.cols);
      });
  }

  getFilterCols(selectedPoles?: number[], selectedEquipes?: number[],
    selectedComp?: string[], selectedPoste?: string[]) {
    let variables = this.checkFilter(selectedPoles, selectedEquipes, selectedComp, selectedPoste);
    console.log("variables:", variables)
    this.searchWord = '';
    this.subscription = this.apollo
      .query<any>({
        query: findFilterCols,
        variables: variables
      })
      .subscribe(({ data }) => {
        this.cols = [];
        this.cols = data.findFilterCols;
        this.dataSource.data = this.cols;
        if (data.findFilterCols.length == 0) {
          this.test = false;
          console.log("test", this.test, this.cols.length)
        }
        else {
          this.test = true;
          console.log("test", this.test, this.cols.length)
        }
        console.log('colsFilter:', data.findFilterCols);
        this.subscription.unsubscribe();
      });
  }

  checkFilter(selectedPoles?: number[], selectedEquipes?: number[],
    selectedComp?: string[], selectedPoste?: string[]) {
    let variables = {};
    if (this.equipe) {
      variables = {...variables, selectedEquipes: this.equipe}
    }
    else {
      if (this.pole) {
        variables = { ...variables,selectedPoles: this.pole}

      }
      else {
        if (selectedPoles && selectedPoles[0]) {
          variables = { ...variables, selectedPoles }
        }
      }
      if (selectedEquipes && selectedEquipes[0]) {
        variables = { ...variables, selectedEquipes }
      }
    }
    if (selectedComp && selectedComp[0]) {
      variables = { ...variables, selectedComp }
    }
    if (selectedPoste && selectedPoste[0]) {
      variables = { ...variables, selectedPoste }
    }
    return variables;
  }
  searchCols(searchWord: string) {
    this.selectedComp = [];
    this.selectedPoles = [];
    this.selectedEquipes = [];
    this.selectedPoste = [];
    console.log("searchWord:", searchWord);
    if (searchWord) {
      this.subscription = this.apollo
        .query<any>({
          query: searchCol,
          variables: { mot: searchWord },
        })
        .subscribe(({ data }) => {
          this.cols = [];
          this.cols = data.searchCol;
          this.dataSource.data = this.cols;
          if (data.searchCol.length == 0) {
            this.test = false;
            console.log("test", this.test, this.cols.length)
          }
          else {
            this.test = true;
            console.log("test", this.test, this.cols.length)
          }
          console.log('cols apres recherche:', this.cols)
          this.subscription.unsubscribe();
        });
    }
  }

  search(event) {
    if (event.keyCode === 13) {
      if (event && event.target && event.target.value) {
        if (this.userRole == UserRole.TEAMLEADER) {
          console.log("search teamleader");
          this.searchEquipe(event.target.value);
        }
        else if (this.userRole == UserRole.RP) {
          this.searchPole(event.target.value);
          console.log("nom pole2:", this.nomPole);
          console.log("search RP");
        }
        else {
          this.searchCols(event.target.value);
          console.log("search RH");
        }
      }
    }
    if (event && event.target && !event.target.value && this.test) {
      this.getCols();
      this.test = false;/*bch narj3ou lel état initial mta3 getAllCands*/
    }
  }

  searchPole(searchWord: string) {
    console.log("searchWord:", searchWord);
    console.log("nom pole3:", this.nomPole);
    if (searchWord) {
      this.subscription = this.apollo
        .query<any>({
          query: searchPole,
          variables: { mot: searchWord, pole: this.nomPole },
        })
        .subscribe(({ data }) => {
          this.cols = [];
          this.cols = data.searchPole;
          if (data.searchPole.length == 0) {
            this.test = true;
            console.log("test", this.test, this.cols.length)
          }
          else {
            this.test = false;
            console.log("test", this.test, this.cols.length)
          }
          console.log('cols pole apres recherche:', this.cols)
          this.subscription.unsubscribe();
        });
    }
  }

  searchEquipe(searchWord: string) {
    console.log("searchWord:", searchWord);
    if (searchWord) {
      this.subscription = this.apollo
        .query<any>({
          query: searchEquipe,
          variables: { mot: searchWord, equipe: this.nomEquipe },
        })
        .subscribe(({ data }) => {
          this.cols = [];
          this.cols = data.searchEquipe;
          if (data.searchEquipe.length == 0) {
            this.test = true;
            console.log("test", this.test, this.cols.length)
          }
          else {
            this.test = false;
            console.log("test", this.test, this.cols.length)
          }
          console.log('cols equipe apres recherche:', this.cols)
          this.subscription.unsubscribe();
        });
    }
  }

  deleteUser(idCol: number) {
    console.log("myUser:", this.myUser);
    this.cols = this.cols.filter(col => col.id !== idCol);
    this.apollo.mutate({
      mutation: removeCol,
      variables: { idCol }
    }).subscribe(res => {
      const indexCand = this.dataSource.data.findIndex((col) => col.id == idCol);
      if (indexCand > -1) {
        let listCandidats = [...this.dataSource.data];//list frozen //bch tepointi 3la case memoire okhra
        listCandidats.splice(indexCand, 1);/*supp index*/
        this.dataSource.data = listCandidats;
      }
      this.toastr.success('Collaborateur supprimé');

    }, error => {
      this.toastr.error("suppression impossible!!", 'Error');
      console.log("suppression impossible!!")
    });
  }

  updateUserRole(idCol: number, role: UserRole) {
    console.log("myUser:", this.myUser);
    this.apollo.mutate({
      mutation: updateRole,
      variables: { idCol, role }
    }).subscribe(res => {
      // const indexCand = this.dataSource.data.findIndex((col)=>col.id == idCol);
      // if(indexCand>-1){
      //   let listCandidats = [...this.dataSource.data];//list frozen //bch tepointi 3la case memoire okhra
      //   listCandidats.splice(indexCand,1);/*supp index*/
      //   this.dataSource.data = listCandidats;
      // }
      console.log("candidats modif role:", res);
      this.toastr.success('Role changé avec succès');

    }, error => {
      this.toastr.error("Modification impossible!!", 'Error');
      console.log("Modification impossible!!")
    });
  }

  getPoles() {
    this.apollo
      .query<any>({
        query: findPoles,
      })
      .subscribe(({ data }) => {
        this.poles = data.findPoles;
        console.log('Poles :', this.poles);
      });
  }

  getEquipes() {
    this.apollo.query<any>({
      query: findEquipes,
    })
      .subscribe(({ data }) => {
        this.equipes = data.findEquipes;
        console.log('Equipes :', this.equipes);
      });
  }

  getEquipesPoles(selectedPoles: number[]) {
    let variables = {};
    if (selectedPoles && selectedPoles[0]) {
      variables = { idPoles : selectedPoles }
    }
    this.apollo
      .query<any>({
        query: findEquipesPole,
        variables: variables
      })
      .subscribe(({ data }) => {
        this.equipes = data.findEquipesPole;
        console.log('Equipes poles:', this.equipes);
      });
  }

  getPostes() {
    let variables;
    if (this.equipe) {
      variables = { equipe: this.equipe }
    }
    else if (this.pole) {
      variables = { pole: this.pole }
    }
    else {
      variables = {}
    }
    this.apollo
      .query<any>({
        query: findPostes,
        variables: variables
      })
      .subscribe(({ data }) => {
        this.postes = data.findPostes;
        console.log('postes :', this.postes);
      });
  }

  async getCompetences() {
    await this.apollo
      .query<any>({
        query: findAllCompetences,
      })
      .subscribe(({ data }) => {
        this.competences = data.findAllCompetences;
        console.log('competences :', this.competences);
      });
  }

  getEquipeName(idEquipe: number) {
    this.apollo
      .query<any>({
        query: findEquipe,
        variables: { idEquipe }
      })
      .subscribe(({ data }) => {
        this.nomEquipe = data.findEquipe.nom;
      });
  }

  getPoleName(idPole: number) {
    this.apollo
      .query<any>({
        query: findPole,
        variables: { idPole }
      })
      .subscribe(({ data }) => {
        this.nomPole = data.findPole.nom;
      });
  }

  getRoles() {
    this.apollo
      .watchQuery<any>({
        query: findRoles,
      })
      .valueChanges.pipe(map((result) => result.data.findRoles))
      .subscribe((data) => {
        this.roles = data;
        console.log('roles data:', this.roles);
      });
  }

  createNotif(colId : number){
    let createNotifInput = {collaborateurId: colId, description: `${this.userAuth} a consulté votre CV`}
    console.log("notifInput:",createNotifInput);
    this.apollo.mutate({
      mutation: createNotif,
      variables: { createNotifInput }
    }).subscribe(res => {
      console.log("res notif:",res);
    });
  }

}
