import { Routes } from '@angular/router';
import { StatusLockerComponent } from './pages/status-locker/status-locker.component';
import { IndexComponent } from './pages/index/index.component';
import { LockerComponent } from './pages/locker/locker.component';

export default [
    {
        path: 'building-lockers/:building/create',
        component: LockerComponent,
    },
    {
        path: 'building-lockers/:building/edit/:id',
        component: LockerComponent,
    },

    {
        path: 'building-lockers/:building',
        component: IndexComponent,
    },
    {
        path: 'status/:id',
        component: StatusLockerComponent,
    },
] as Routes;
