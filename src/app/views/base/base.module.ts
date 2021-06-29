// Angular
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LOCALE_ID, NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { CardsComponent } from './cards.component';

// Forms Component
import { FormsComponent } from './forms.component';


// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabsComponent } from './tabs.component';

// Carousel Component
import { CarouselModule } from 'ngx-bootstrap/carousel';

// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Pagination Component
import { PaginationModule } from 'ngx-bootstrap/pagination';

// Popover Component
import { PopoverModule } from 'ngx-bootstrap/popover';

// Progress Component
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ProgressComponent } from './progress.component';

// Tooltip Component
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// navbars
import { NavbarsComponent } from './navbars/navbars.component';

// Components Routing
import { BaseRoutingModule } from './base-routing.module';
import { DataTableComponent } from './data-table/data-table.component';
import { CandidatsComponent } from './candidats/candidats.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CollaborateursComponent } from './collaborateurs/collaborateurs.component';
import { CollaborateursPipe } from './collaborateurs/collaborateurs.pipe';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ToastrModule } from 'ngx-toastr';
import { CvComponent } from './cv-cand/cv.component';
import { FicheInfosComponent } from './fiche-infos/fiche-infos.component';
import { HistoriqueComponent } from './historique/historique.component';
registerLocaleData(localeFr);

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    BaseRoutingModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-center',
    }),
    TabsModule.forRoot(),
  ],
  declarations: [
    CardsComponent,
    FormsComponent,
    TabsComponent,
    ProgressComponent,
    NavbarsComponent,
    DataTableComponent,
    CandidatsComponent,
    DashboardComponent,
    CollaborateursComponent,
    CollaborateursPipe,
    CvComponent,
    FicheInfosComponent,
    HistoriqueComponent
  ],
  providers:[{ provide: LOCALE_ID, useValue: 'fr-FR'}, DatePipe]
})
export class BaseModule { }
