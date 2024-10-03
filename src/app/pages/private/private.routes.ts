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
    ],
  },
] satisfies Routes;
