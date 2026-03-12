import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { canActivateAuthRole } from '@guards';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/chat-page/chat-page').then(m => m.ChatPage),
    data: {
      role: [ 'default-roles-cv' ]
    },
    canActivate: [canActivateAuthRole]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvChatRoutingModule { }
