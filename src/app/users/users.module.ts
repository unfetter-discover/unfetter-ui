import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatProgressBarModule, MatSelectModule, MatCardModule, MatInputModule, MatButtonModule } from '@angular/material';

import { routing } from './users-routing.module';
import { ComponentModule } from '../components'
import { GlobalModule } from '../global/global.module';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { RegisterComponent } from './register/register.component';
import { UsersService } from './users.service';
import { ProfileComponent } from './profile/profile.component';

const matModules = [
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatButtonModule
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
        ProfileComponent
    ],
    providers: [
        UsersService
    ]
})
export class UsersModule { }
