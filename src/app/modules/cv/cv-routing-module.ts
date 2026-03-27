import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateAuthRole } from '@guards';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/cv-page/cv-page').then(m => m.CvPage),
    data: {
      role: [ 'default-roles-cv' ]
    },
    canActivate: [canActivateAuthRole]

  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvRoutingModule { }
