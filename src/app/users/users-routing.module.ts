import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { RegisterComponent } from './register/register.component';

const routes = [
    {
        path: 'login-callback/:token/:registered/:method', component: LoginCallbackComponent,        
    },
    {
        path: 'register', component: RegisterComponent,
    }
]

export const routing = RouterModule.forChild(routes);
