import { Component } from '@angular/core'

@Component({
    selector: 'admin-layout',
    templateUrl: 'admin-layout.component.html',
    styleUrls: ['admin-layout.component.scss']
})
export class AdminLayoutComponent {
    public navigations: any[] = [
        { url: 'approve-users', label: 'Users Pending Approval' },
        { url: 'site-usage', label: 'Site Usage Data' },
        { url: 'organization-leader-approval', label: 'Organization Leader Approval' }
    ];
}
