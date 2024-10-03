import { Routes } from '@angular/router';
import { getCanActivatePrivateGuard } from 'src/app/features/auth/guards/can-activate-private.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [getCanActivatePrivateGuard],
    loadChildren: () => import('./pages/private/private.routes'),
  },
  {
    path: '',
    loadChildren: () => import('./pages/public/public.routes'),
  },
  {
    path: 'not-found',
    loadComponent: () => import('./pages/not-found/not-found-page.component'),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
