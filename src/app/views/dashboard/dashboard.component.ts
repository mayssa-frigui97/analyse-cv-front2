import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MultiDataSet } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { Competence } from '../../Models/competence';
import { findCompetencesCandidats } from '../../shared/Candidat/query';
import { CountColsEquipes, CountColsPoles } from '../../shared/Collaborateur/query';
import { CountCompetences, CountFormation } from '../../shared/Cv/query';

export class Count {
  nom: string;
  pourcentage: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  formations: Count[];
  equipes: Count[];
  poles: Count[];
  competences: Count[];
  listCompetences: Competence[];
  selectedComp: string[];
  nombres =[5,10,15];
  selectedNb :number;
  competenceLabels : string[];
  competenceData : number[];


  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any;

  // Doughnut
  public doughnutChartLabelsPole: string[];
  doughnutChartDataPole: MultiDataSet;
  public doughnutChartLabelsEquipe: string[];
  doughnutChartDataEquipe: MultiDataSet;
  public doughnutChartType = 'doughnut';
  public chartColors: Array<any> = [
    // {
    //   backgroundColor: ['#ff8ba4', '#4ecdc4', '#FDB45C'],
    //   hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870'],
    //   borderWidth: 2,
    // }
  ];

   // Pie
   public pieChartLabels: string[];
   public pieChartData: MultiDataSet;
   public pieChartType = 'pie';

   constructor(private apollo: Apollo) { }

   ngOnInit() {

     this.statisEquipes();
     this.statisPoles();
     this.statisFormations();
     this.statisCompetences();
     this.getCompetences();
   }

  statisPoles() {
    this.apollo
      .watchQuery<any>({
        query: CountColsPoles,
      })
      .valueChanges.pipe(map((result) => result.data.CountColsPoles))
      .subscribe((data) => {
        this.poles = data;
        console.log('Statis Poles :', this.poles);
        let list : number[]=[];
        this.doughnutChartLabelsPole=[];
        this.poles.forEach(pole => {
          this.doughnutChartLabelsPole.push(pole.nom);
          list.push(pole.pourcentage);
        });
        this.doughnutChartDataPole=[list];
      });
  }

  statisEquipes() {
    this.apollo
      .watchQuery<any>({
        query: CountColsEquipes,
      })
      .valueChanges.pipe(map((result) => result.data.CountColsEquipes))
      .subscribe((data) => {
        this.equipes = data;
        console.log('Statis Equipes :', this.equipes);
        let list : number[]=[];
        this.doughnutChartLabelsEquipe=[];
        this.equipes.forEach(equipe => {
          this.doughnutChartLabelsEquipe.push(equipe.nom);
          list.push(equipe.pourcentage);
        });
        this.doughnutChartDataEquipe=[list];
      });
  }

  statisFormations() {
    this.apollo
      .watchQuery<any>({
        query: CountFormation,
      })
      .valueChanges.pipe(map((result) => result.data.CountFormation))
      .subscribe((data) => {
        this.formations = data;
        console.log('Statis Formations :', this.formations);
        let list : number[]=[];
        this.pieChartLabels=[];
        this.formations.forEach(formation => {
          this.pieChartLabels.push(formation.nom);
          list.push(formation.pourcentage);
        });
        this.pieChartData=[list];
      });
  }

  statisCompetences() {
    this.apollo
      .query<any>({
        query: CountCompetences,
      })
      .subscribe(({data}) => {
        this.competences = data.CountCompetences;
        console.log('Statis Competences :', this.competences);
        this.changeNombre(5);
      });
  }

  getCompetences(): Competence[] {
    this.apollo
    .query<any>({
        query: findCompetencesCandidats,
      })
      .subscribe(({data}) => {
        this.listCompetences = data.findCompetencesCandidats;
        console.log('competences :', this.listCompetences);
      });
    return this.listCompetences;
  }

  changeNombre(selected, isSelectedCom?){
    if(!isSelectedCom){
      this.selectedComp = [];
      this.getListCompetences(this.competences);
    }
    selected = selected ? selected :5;//ken mafamech yji 5
    this.barChartLabels = this.competenceLabels.slice(0,selected);
    this.barChartData= [{data:this.competenceData.slice(0,selected), label: 'Pourcentage des candidats'}];
  }

  changeCompetence(selectedComp) {
    if (selectedComp.length > 0) {
      this.selectedNb = selectedComp.length;
      this.changeNombre(selectedComp.length,true);
      let filtredCompetences = this.competences.filter((comp) => {
        return selectedComp.includes(comp.nom);
      });
      this.getListCompetences(filtredCompetences);
      this.changeNombre(filtredCompetences.length,true);
    } else {
      this.selectedNb = null;
      this.getListCompetences(this.competences);
      this.changeNombre(5);
    }
  }

  getListCompetences(competences) {
    this.competenceData = [];
    this.competenceLabels = [];
    competences.forEach(competence => {
      this.competenceLabels.push(competence.nom);
      this.competenceData.push(competence.pourcentage);
    });

  }

}
