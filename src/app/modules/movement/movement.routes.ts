import { Routes } from '@angular/router';
import { ListMovementComponent } from './pages/list-movement/list-movement.component';

export default [
    {
        path: ':id',
        component: ListMovementComponent,
    },
] as Routes;
