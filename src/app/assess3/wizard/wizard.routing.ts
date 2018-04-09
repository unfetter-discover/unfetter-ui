import { RouterModule } from '@angular/router';

import { WizardComponent } from './wizard.component';

const routes = [
    {
        path: '', component: WizardComponent,
    },
];

export const routing = RouterModule.forChild(routes);
