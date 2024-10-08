import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('@pages/private/private-page/private-page.component'),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./main/main-page.component'),
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile-page.component'),
      },
      {
        path: 'analyses',
        loadComponent: () => import('./analyses/analyses-page.component'),
      },
      {
        path: 'analyses/:id',
        loadComponent: () => import('./analysis/analysis-page.component'),
      },
    ],
  },
] satisfies Routes;
