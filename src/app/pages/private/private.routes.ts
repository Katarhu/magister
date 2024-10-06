import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component'),
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
        path: 'analyses',
        loadComponent: () => import('./analyses/analyses-page.component'),
      },
    ],
  },
] satisfies Routes;
