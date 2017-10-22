import { Component } from '@angular/core'

@Component({
    selector: 'admin-layout',
    templateUrl: 'admin-layout.component.html',
    styleUrls: ['admin-layout.component.scss']
})
export class AdminLayoutComponent {
    public navigations: any[] = [
        { url: 'approve-users', label: 'Users Pending Approval' },
    ];
}
