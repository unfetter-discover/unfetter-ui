import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from '../core/services/auth.guard';

const routes = [
    {
        path: 'login-callback/:token/:registered/:method', component: LoginCallbackComponent,        
    },
    {
        path: 'register', component: RegisterComponent,
    },
    {
        path: 'profile/:id', 
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'settings', 
        component: SettingsComponent,
        canActivate: [AuthGuard]
    }
]

export const routing = RouterModule.forChild(routes);
