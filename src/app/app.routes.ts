import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '500',
    pathMatch: 'full',
    loadComponent: () =>
      import('./view/error-page/error-page.component').then(
        (m) => m.ErrorPageComponent
      ),
  },
];
