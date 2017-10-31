import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { routing } from './organizations-routing.module';
import { GlobalModule } from '../global/global.module';
import { OrganizationsService } from './organizations.service';
import { OrganizationApprovalComponent } from './organization-approval/organization-approval.component';
import { OrganizationsLayoutComponent } from './organizations-layout/organizationslayout.component';
import { UsersModule } from '../users/users.module';

@NgModule({
    imports: [
        CommonModule,
        GlobalModule,
        routing,
        MatButtonModule,
        UsersModule
    ],
    declarations: [
        OrganizationApprovalComponent,
        OrganizationsLayoutComponent
    ],
    providers: [
        OrganizationsService
    ]
})
export class OrganizationsModule { }
