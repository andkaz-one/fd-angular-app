import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'events'},
    {
        path: 'events',
        loadComponent: () => import('./events-list/events-list.component').then(m => m.EventsListComponent)
    }
];
