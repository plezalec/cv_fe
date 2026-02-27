import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren: () => 
            import('./modules/front-page/front-page-module').then(m => m.FrontPageModule),
    },
    {
        path:'main-chat',
        loadChildren: () => 
            import('./modules/main-chat/main-chat-module').then(m => m.MainChatModule),
    },
    {
        path:'unauthorised',
        loadComponent: () => import('./modules/login/pages/unauthorised/unauthorised').then(m => m.Unauthorised)
    },
    {
        path: '**',
        loadComponent: () => import('./modules/front-page/page-not-found/page-not-found').then(m => m.PageNotFound)
    }
];
