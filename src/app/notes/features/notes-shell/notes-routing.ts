import { Routes } from '@angular/router'

export default [
    {
        path: '',
        loadComponent: () => import('../notes-list/notes-list.component'),
    },
    {
        path: '**',
        redirectTo: '',
    },
] as Routes
