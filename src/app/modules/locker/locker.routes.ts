import { Routes } from '@angular/router';
import { StatusLockerComponent } from './pages/status-locker/status-locker.component';
import { IndexComponent } from './pages/index/index.component';
import { LockerComponent } from './pages/locker/locker.component';

export default [

    {
        path: 'create',
        component: LockerComponent,
    },
    {
        path: 'building-lockers/:id',
        component: IndexComponent,
    },
    {
        path: 'edit/:id',
        component: LockerComponent,
    },
    {
        path: 'status/:id',
        component: StatusLockerComponent,
    },
] as Routes;
