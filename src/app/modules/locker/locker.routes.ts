import { Routes } from '@angular/router';
import { StatusLockerComponent } from './pages/status-locker/status-locker.component';

export default [
    {
        path: ':id',
        component: StatusLockerComponent,
    },
] as Routes;
