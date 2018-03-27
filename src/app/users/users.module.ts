import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatProgressBarModule, MatSelectModule, MatCardModule, MatInputModule, MatButtonModule, MatListModule, MatCheckboxModule, MatStepperModule } from '@angular/material';

import { routing } from './users-routing.module';
import { ComponentModule } from '../components'
import { GlobalModule } from '../global/global.module';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

const matModules = [
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatStepperModule
];

@NgModule({
    imports: [
        CommonModule,
        GlobalModule,
        ComponentModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        ...matModules
    ],
    declarations: [
        LoginCallbackComponent,
        RegisterComponent,
        ProfileComponent,
        SettingsComponent
    ]
})
export class UsersModule { }
