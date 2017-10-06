import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { routing } from './users-routing.module';
import { ComponentModule } from '../components'
import { GlobalModule } from '../global/global.module';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { RegisterComponent } from './register/register.component';
import { UsersService } from './users.service';

@NgModule({
    imports: [
        CommonModule,
        GlobalModule,
        ComponentModule,
        routing,
        MaterialModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginCallbackComponent,
        RegisterComponent
    ],
    providers: [
        UsersService
    ]
})
export class UsersModule { }
