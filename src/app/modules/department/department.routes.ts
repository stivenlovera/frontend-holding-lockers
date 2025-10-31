import { Routes } from '@angular/router';
import { ListDepartmentComponent } from './pages/list-department/list-department.component';
import { ListUserComponent } from './pages/list-user/list-user.component';


export default [
    {
        path: ':id/users/:department_id',
        component: ListUserComponent,
    },
    {
        path: ':id',
        component: ListDepartmentComponent,
    },

] as Routes;
