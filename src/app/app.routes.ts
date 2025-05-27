import { Routes } from '@angular/router'
import { privateGuard } from './shared/guards/auth.guard'

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/features/auth-shell/auth-routing'),
    },
    {
        path: '',
        canActivate: [privateGuard],
        loadChildren: () => import('./notes/features/notes-shell/notes-routing'),
    },
]
