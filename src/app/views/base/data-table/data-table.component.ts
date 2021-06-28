import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { findFilterCands, findPersonnes, removeCandidat, removePersonne, search, updateRecommande } from '../../../shared/Candidat/query';
import { createCol, findEquipes, findPoles, findRoles } from '../../../shared/Collaborateur/query';
import { Personne } from '../../../Models/personne';
import { StatutCV } from '../../../Enums/StatutCV';
import { map } from 'rxjs/operators';
import { findAllCompetences } from '../../../shared/Cv';
import { Competence } from '../../../Models/competence';
import { UserRole } from '../../../Enums/UserRole';
import { Apollo} from 'apollo-angular';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../Services/auth.service';
import { Cv } from '../../../Models/cv';
import { Collaborateur } from '../../../Models/collaborateur';
import { Equipe } from '../../../Models/equipe';
import { Pole } from '../../../Models/pole';
import { Subscription } from 'rxjs';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;
  dataSource: MatTableDataSource<any>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  constructor(
    ){
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = [
      {id: 1, name: 'Hydrogen'},
      {id: 2, name: 'Helium'},
      {id: 3, name: 'Lithium'},
      {id: 4, name: 'Beryllium'},
      {id: 5, name: 'Boron'},
      {id: 6, name: 'Carbon'},
      {id: 7, name: 'Nitrogen'},
      {id: 8, name: 'Oxygen'},
      {id: 9, name: 'Fluorine'},
      {id: 10, name: 'Neon'},
      {id: 11, name: 'Sodium'},
      {id: 12, name: 'Magnesium'},
      {id: 13, name: 'Aluminum'},
      {id: 14, name: 'Silicon'},
      {id: 15, name: 'Phosphorus'},
      {id: 16, name: 'Sulfur'},
      {id: 17, name: 'Chlorine'},
      {id: 18, name: 'Argon'},
      {id: 19, name: 'Potassium'},
      {id: 20, name: 'Calcium'},
    ]
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  applyFilter(filter : string){

    this.dataSource.filter = filter.trim().toLowerCase();
  }




}
