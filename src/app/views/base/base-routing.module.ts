import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsComponent } from './forms.component';
import { TabsComponent } from './tabs.component';
import { ProgressComponent } from './progress.component';
import { CandidatsComponent } from './candidats/candidats.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CollaborateursComponent } from './collaborateurs/collaborateurs.component';
import { FicheInfosComponent } from './fiche-infos/fiche-infos.component';
import { HistoriqueComponent } from './historique/historique.component';
import { CvComponent } from './cv-cand/cv.component';
import { UserRole } from '../../Enums/UserRole';
import { AuthGuard } from '../../Services/auth-guard.service';

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
        canActivate: [AuthGuard],
        data: {
          title: 'Dashbord',
          allowedRoles: [UserRole.COLLABORATEUR, UserRole.RH, UserRole.RP, UserRole.TEAMLEADER]
        }
      },
      {
        path: 'fiche-infos',
        component: FicheInfosComponent,
        canActivate: [AuthGuard],
        data: {
          title: "Fiche d'informations",
          allowedRoles: [UserRole.COLLABORATEUR, UserRole.RH, UserRole.RP, UserRole.TEAMLEADER]
        }
      },
      {
        path: 'historique',
        component: HistoriqueComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Historique',
          allowedRoles: [UserRole.COLLABORATEUR, UserRole.RH, UserRole.RP, UserRole.TEAMLEADER]
        }
      },
      {
        path: 'candidats',
        component: CandidatsComponent,
        // data: {
        //
        // }
        canActivate: [AuthGuard],
        data: {
          title: 'Candidats',
          allowedRoles: [UserRole.RH, UserRole.RP, UserRole.TEAMLEADER]
        }
      },
      {
        path: 'candidats/cv/:id',
        component: CvComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'CV',
          allowedRoles: [UserRole.RH, UserRole.RP, UserRole.TEAMLEADER]
        }
      },
      {
        path: 'collaborateurs',
        component: CollaborateursComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Collaborateurs',
          allowedRoles: [UserRole.RH, UserRole.RP, UserRole.TEAMLEADER]
        }
      },
      {
        path: 'collaborateurs/cv/:id',
        component: FicheInfosComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'CV',
          allowedRoles: [UserRole.RH, UserRole.RP, UserRole.TEAMLEADER]
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
        path: 'tabs',
        component: TabsComponent,
        data: {
          title: 'Tabs'
        }
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: {
          title: 'Progress'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class BaseRoutingModule {}
