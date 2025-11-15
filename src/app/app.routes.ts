import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'acerca-de',
    loadComponent: () => import('./acerca-de/acerca-de.page').then( m => m.AcercaDePage)
  },
  {
    path: 'test-components-ionic',
    loadComponent: () => import('./test-components-ionic/test-components-ionic.page').then( m => m.TestComponentsIonicPage)
  },
];
