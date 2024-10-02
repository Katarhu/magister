import { Routes } from '@angular/router';
import { canMatchPrivateGuard } from 'src/app/features/auth/guards/can-match-private.guard';

export const routes: Routes = [
  {
    path: '',
    canMatch: [canMatchPrivateGuard],
    loadChildren: () => import('./pages/private/private.routes'),
  },
  {
    path: '',
    loadChildren: () => import('./pages/public/public.routes'),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/public/not-found/not-found-page.component'),
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },
];
