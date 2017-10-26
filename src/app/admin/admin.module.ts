import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './admin-routing.module';
import { GlobalModule } from '../global/global.module';
import { AdminService } from './admin.service';
import { ApproveUsersComponent } from './approve-users/approve-users.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SiteUsageComponent } from './site-usage/site-usage.component';

@NgModule({
    imports: [
        CommonModule,
        GlobalModule,
        routing
    ],
    declarations: [
        ApproveUsersComponent,
        AdminLayoutComponent,
        SiteUsageComponent
    ],
    providers: [
        AdminService
    ]
})
export class AdminModule { }
