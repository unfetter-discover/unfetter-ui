import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdProgressBarModule } from '@angular/material';

import { routing } from './users-routing.module';
import { ComponentModule } from '../components'
import { GlobalModule } from '../global/global.module';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
    imports: [
        CommonModule,
        GlobalModule,
        ComponentModule,
        routing,
        MdProgressBarModule
    ],
    declarations: [
        LoginCallbackComponent,
        RegisterComponent
    ],
    providers: [

    ]
})
export class UsersModule { }
