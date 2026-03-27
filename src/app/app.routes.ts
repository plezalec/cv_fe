import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren: () => 
            import('./modules/front-page/front-page-module').then(m => m.FrontPageModule),
    },
    {
        path:'chat',
        loadChildren: () => 
            import('./modules/cv-chat/cv-chat-module').then(m => m.CvChatModule),
    },
    {
        path:'cv',
        loadChildren: () => 
            import('./modules/cv/cv-module').then(m => m.CvModule),
    },
    {
        path:'unauthorised',
        loadComponent: () => import('./modules/login/pages/unauthorised/unauthorised').then(m => m.Unauthorised)
    },
    {
        path: '**',
        loadComponent: () => import('./modules/front-page/pages/page-not-found/page-not-found').then(m => m.PageNotFound)
    }
];
