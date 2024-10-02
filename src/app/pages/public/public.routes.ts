import { Routes } from '@angular/router';

export default [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./register/register-page.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./login/login-page.component'),
  },
] satisfies Routes;
