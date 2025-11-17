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
    path: 'create-edit',
    loadComponent: () => import('./create-edit/create-edit.page').then(m => m.CreateEditPage)
  },
  {
    path: 'create-edit/:id',
    loadComponent: () => import('./create-edit/create-edit.page').then(m => m.CreateEditPage)
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./detail/detail.page').then(m => m.DetailPage)
  },
  {
    path: 'modal-confirm',
    loadComponent: () => import('./modal-confirm/modal-confirm.page').then(m => m.ModalConfirmPage)
  },
  {
    path: 'empty-state',
    loadComponent: () => import('./empty-state/empty-state.page').then(m => m.EmptyStatePage)
  },
];
