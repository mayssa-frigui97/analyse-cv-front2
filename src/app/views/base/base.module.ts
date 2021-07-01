// Angular
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LOCALE_ID, NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


// Forms Component


// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

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

// Tooltip Component
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// navbars

// Components Routing
import { BaseRoutingModule } from './base-routing.module';
import { CandidatsComponent } from './candidats/candidats.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ChartsModule } from 'ng2-charts';
import { CollaborateursComponent } from './collaborateurs/collaborateurs.component';
import { CollaborateursPipe } from './collaborateurs/collaborateurs.pipe';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ToastrModule } from 'ngx-toastr';
import { CvComponent } from './cv-cand/cv.component';
import { FicheInfosComponent } from './fiche-infos/fiche-infos.component';
import { HistoriqueComponent } from './historique/historique.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
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
    CandidatsComponent,
    CollaborateursComponent,
    CollaborateursPipe,
    CvComponent,
    FicheInfosComponent,
    HistoriqueComponent,
    StarRatingComponent,
  ],
  providers:[{ provide: LOCALE_ID, useValue: 'fr-FR'}, DatePipe]
})
export class BaseModule { }
