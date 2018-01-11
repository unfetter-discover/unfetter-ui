import { RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';

const routes = [
    {
        path: '', component: CreateComponent,
        children: [
            { path: 'create', component: CreateComponent },
        ]
    },
];

export const routing = RouterModule.forChild(routes);
