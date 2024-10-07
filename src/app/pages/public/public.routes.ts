import { Routes } from '@angular/router';
import { getCanActivateLoginGuard } from '@features/auth/guards/can-activate-login.guard';

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
        canActivate: [getCanActivateLoginGuard],
        loadComponent: () => import('./login/login-page.component'),
      },
      {
        path: 'register',
        loadComponent: () => import('./register/register-page.component'),
      },
    ],
  },
] satisfies Routes;
