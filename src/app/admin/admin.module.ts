import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { routing } from './admin-routing.module';
import { GlobalModule } from '../global/global.module';
import { AdminService } from './admin.service';
import { ApproveUsersComponent } from './approve-users/approve-users.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SiteUsageComponent } from './site-usage/site-usage.component';
import { OrgLeaderApprovalComponent } from './org-leader-approval/org-leader-approval.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        GlobalModule,
        routing,
        MatButtonModule,
        ChartsModule
    ],
    declarations: [
        ApproveUsersComponent,
        AdminLayoutComponent,
        SiteUsageComponent,
        OrgLeaderApprovalComponent
    ],
    providers: [
        AdminService
    ]
})
export class AdminModule { }
