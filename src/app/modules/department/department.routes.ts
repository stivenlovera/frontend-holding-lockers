import { Routes } from '@angular/router';
import { ListDepartmentComponent } from './pages/list-department/list-department.component';

export default [
    {
        path: ':id',
        component: ListDepartmentComponent,
    },
] as Routes;
