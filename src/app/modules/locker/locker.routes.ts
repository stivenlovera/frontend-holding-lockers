import { Routes } from '@angular/router';
import { StatusLockerComponent } from './pages/status-locker/status-locker.component';
import { LockerComponent } from '../dashboard/pages/locker/locker.component';

export default [

    {
        path: 'create',
        component: LockerComponent,
    },
    {
        path: 'edit/:id',
        component: LockerComponent,
    },
    {
        path: ':id',
        component: StatusLockerComponent,
    },
] as Routes;
