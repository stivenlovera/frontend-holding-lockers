import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';

export default [
    {
        path: '',
        component: IndexComponent,
    },
    {
        path: 'create',
        component: CreateComponent,
    },
    {
        path: 'edit/:id',
        component: EditComponent,
    }
] as Routes;
