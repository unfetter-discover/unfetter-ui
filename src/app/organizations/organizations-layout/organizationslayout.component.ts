import { Component } from '@angular/core'

@Component({
    selector: 'organizations-layout',
    templateUrl: 'organizations-layout.component.html',
    styleUrls: ['organizations-layout.component.scss']
})
export class OrganizationsLayoutComponent {
    public navigations: any[] = [
        { url: 'approval', label: 'Users Pending Approval' },
    ];
}
