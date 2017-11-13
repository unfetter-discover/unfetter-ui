import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatProgressBarModule, MatSelectModule, MatCardModule, MatInputModule, MatButtonModule, MatListModule } from '@angular/material';

import { routing } from './users-routing.module';
import { ComponentModule } from '../components'
import { GlobalModule } from '../global/global.module';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { RegisterComponent } from './register/register.component';
import { UsersService } from './users.service';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

const matModules = [
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatButtonModule,
    MatListModule
];

@NgModule({
    imports: [
        CommonModule,
        GlobalModule,
        ComponentModule,
        routing,
        ReactiveFormsModule,
        ...matModules
    ],
    declarations: [
        LoginCallbackComponent,
        RegisterComponent,
        ProfileComponent,
        SettingsComponent
    ],
    providers: [
        UsersService
    ]
})
export class UsersModule { }
