import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component'),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () => import('./login/login-page.component'),
      },
      {
        path: 'register',
        loadComponent: () => import('./register/register-page.component'),
      },
    ],
  },
] satisfies Routes;
