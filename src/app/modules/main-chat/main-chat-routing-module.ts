import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPage } from './pages/main-page/main-page';
import { canActivateAuthRole } from '@guards';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    data: {
      role: [ 'default-roles-cv']
    },
    canActivate: [canActivateAuthRole]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainChatRoutingModule { }
