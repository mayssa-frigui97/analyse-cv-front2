import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsComponent } from './cards.component';
import { FormsComponent } from './forms.component';
import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';
import { TabsComponent } from './tabs.component';
import { CarouselsComponent } from './carousels.component';
import { CollapsesComponent } from './collapses.component';
import { PaginationsComponent } from './paginations.component';
import { PopoversComponent } from './popovers.component';
import { ProgressComponent } from './progress.component';
import { TooltipsComponent } from './tooltips.component';
import { NavbarsComponent } from './navbars/navbars.component';
import { CandidatsComponent } from './candidats/candidats.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CollaborateursComponent } from './collaborateurs/collaborateurs.component';
import { FicheInfosComponent } from './fiche-infos/fiche-infos.component';
import { HistoriqueComponent } from './historique/historique.component';
import { CvComponent } from './cv/cv.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base'
    },
    children: [
      {
        path: '',
        redirectTo: 'candidats'
      },
      {
        path: 'dashbord',
        component: DashboardComponent,
        data: {
          title: 'Dashbord'
        }
      },
      {
        path: 'fiche-infos',
        component: FicheInfosComponent,
        data: {
          title: "Fiche d'informations"
        }
      },
      {
        path: 'historique',
        component: HistoriqueComponent,
        data: {
          title: 'Historique'
        }
      },
      {
        path: 'candidats',
        component: CandidatsComponent,
        data: {
          title: 'Candidats'
        }
      },
      {
        path: 'candidats/cv/:id',
        component: CvComponent,
        data: {
          title: 'Cv'
        }
      },
      {
        path: 'collaborateurs',
        component: CollaborateursComponent,
        data: {
          title: 'Collaborateurs'
        }
      },
      {
        path: 'collaborateurs/cv/:id',
        component: CvComponent,
        data: {
          title: 'Cv'
        }
      },
      {
        path: 'forms',
        component: FormsComponent,
        data: {
          title: 'Forms'
        }
      },
      {
        path: 'switches',
        component: SwitchesComponent,
        data: {
          title: 'Switches'
        }
      },
      {
        path: 'tables',
        component: TablesComponent,
        data: {
          title: 'Tables'
        }
      },
      {
        path: 'tabs',
        component: TabsComponent,
        data: {
          title: 'Tabs'
        }
      },
      {
        path: 'carousels',
        component: CarouselsComponent,
        data: {
          title: 'Carousels'
        }
      },
      {
        path: 'collapses',
        component: CollapsesComponent,
        data: {
          title: 'Collapses'
        }
      },
      {
        path: 'paginations',
        component: PaginationsComponent,
        data: {
          title: 'Pagination'
        }
      },
      {
        path: 'popovers',
        component: PopoversComponent,
        data: {
          title: 'Popover'
        }
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: {
          title: 'Progress'
        }
      },
      {
        path: 'tooltips',
        component: TooltipsComponent,
        data: {
          title: 'Tooltips'
        }
      },
      {
        path: 'navbars',
        component: NavbarsComponent,
        data: {
          title: 'Navbars'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class BaseRoutingModule {}
