import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then((m) => m.DashboardComponent),
  },
  {
    path: 'sample-page',
    title: 'Sample page',
    loadComponent: () =>
      import('./pages/sample-page/sample-page').then((m) => m.SamplePageComponent),
  },
];
