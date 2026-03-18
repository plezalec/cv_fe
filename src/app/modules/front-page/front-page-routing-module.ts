import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontPage } from './pages/front-page/front-page';
import { canActivateAuthRole } from '@guards';

const routes: Routes = [
  {
    path: '',
    component: FrontPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontPageRoutingModule { }
