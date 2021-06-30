import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Base',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Dashbord',
        url: '/base/dashbord',
        icon: 'icon-pie-chart'
      },
      {
        name: "Fiche d'informations",
        url: '/base/fiche-infos',
        icon: 'fa fa-id-card-o'
      },
      {
        name: 'Historique',
        url: '/base/historique',
        icon: 'fa fa-history'
      },
      {
        name: 'Candidats',
        url: '/base/candidats',
        icon: 'icon-people'
      },
      {
        name: 'Collaborateurs',
        url: '/base/collaborateurs',
        icon: 'icon-people'
      }
    ]
  }
];

export const navItemsCol: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Base',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Dashbord',
        url: '/base/dashbord',
        icon: 'icon-pie-chart'
      },
      {
        name: "Fiche d'informations",
        url: '/base/fiche-infos',
        icon: 'fa fa-id-card-o'
      },
      {
        name: 'Historique',
        url: '/base/historique',
        icon: 'fa fa-history'
      }]
    }
]

