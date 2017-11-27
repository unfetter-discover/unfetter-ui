import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { routing } from './admin-routing.module';
import { GlobalModule } from '../global/global.module';
import { AdminService } from './admin.service';
import { ApproveUsersComponent } from './approve-users/approve-users.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SiteUsageComponent } from './site-usage/site-usage.component';
import { ConfigEditComponent } from './config-edit/config-edit.component';
import { OrgLeaderApprovalComponent } from './org-leader-approval/org-leader-approval.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        GlobalModule,
        routing,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        ChartsModule
    ],
    declarations: [
        ApproveUsersComponent,
        AdminLayoutComponent,
        SiteUsageComponent,
        OrgLeaderApprovalComponent,
        ConfigEditComponent
    ],
    providers: [
        AdminService
    ]
})
export class AdminModule { }
