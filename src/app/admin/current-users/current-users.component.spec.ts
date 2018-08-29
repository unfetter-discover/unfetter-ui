import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { of as observableOf, Observable } from 'rxjs';

import { CurrentUsersComponent } from './current-users.component';
import { UserRole } from '../../models/user/user-role.enum';
import { AdminService } from '../admin.service';

fdescribe('CurrentUsersComponent', () => {

    let fixture: ComponentFixture<CurrentUsersComponent>;
    let component: CurrentUsersComponent;

    const mockOrganizations = [ { attributes: { id: 'o--1', name: 'Unfetter Test Team' } } ];
    const mockUsers = [
        {
            id: 'u--1',
            userName: 'thing1',
            firstName: 'Thi',
            lastName: 'Ngy',
            email: 'thing1@net.bizcom',
            role: UserRole.ADMIN,
            organizations: [],
            locked: false,
        },
        {
            id: 'u--2',
            userName: 'thing2',
            firstName: 'Thin',
            lastName: 'Get',
            email: 'thing2@net.bizcom',
            role: UserRole.ORG_LEADER,
            organizations: [ mockOrganizations[0].attributes.id ],
            locked: false,
        },
        {
            id: 'u--3',
            userName: 'thingy',
            firstName: 'Thin',
            lastName: 'Gy',
            email: 'thing3@net.bizcom',
            role: UserRole.STANDARD_USER,
            organizations: [ 'o--2' ],
            locked: true,
        },
    ];

    const mockAdminService = {
        getOrganizations: () => observableOf(mockOrganizations),
        getCurrentUsers: () => observableOf(mockUsers),
        changeUserStatus: (data) => observableOf({}),
    };

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [
                    CurrentUsersComponent,
                ],
                providers: [
                    { provide: AdminService, useValue: mockAdminService }
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CurrentUsersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();

        // confirm the presence of the buttons
        const makeAdminCells = fixture.nativeElement.querySelectorAll('table.table tbody tr td:nth-child(6)')
        expect(makeAdminCells).toBeTruthy();
        expect(makeAdminCells.length).toBe(3);
        expect(makeAdminCells[0].querySelector('button')).toBeFalsy();
        expect(makeAdminCells[1].querySelector('button')).toBeTruthy();
        expect(makeAdminCells[2].querySelector('button')).toBeTruthy();

        const lockCells = fixture.nativeElement.querySelectorAll('table.table tbody tr td:nth-child(7) button i')
        expect(lockCells).toBeTruthy();
        expect(lockCells.length).toBe(3);
        expect(lockCells[0].textContent).toEqual('lock');
        expect(lockCells[0].textContent).toEqual('lock');
        expect(lockCells[2].textContent).toEqual('lock_open');
    });

    it('should promote a user to administrator', () => {
        const spy = spyOn(component['adminService'], 'changeUserStatus').and.callThrough();
        const firstMakeAdminButton =
                fixture.nativeElement.querySelector('table.table tbody tr:nth-child(2) td:nth-child(6) button');
        expect(firstMakeAdminButton).toBeTruthy();
        firstMakeAdminButton.dispatchEvent(new Event('click'));
        expect(spy).toHaveBeenCalledWith({ data: { attributes: { ...mockUsers[1], role: UserRole.ADMIN } } });
    });

    it('should lock a user account', () => {
        const spy = spyOn(component['adminService'], 'changeUserStatus').and.callThrough();
        const lockOrgLeaderButton =
                fixture.nativeElement.querySelector('table.table tbody tr:nth-child(2) td:nth-child(7) button');
        expect(lockOrgLeaderButton).toBeTruthy();
        lockOrgLeaderButton.dispatchEvent(new Event('click'));
        expect(spy).toHaveBeenCalledWith({ data: { attributes: { ...mockUsers[1], locked: true } } });
    });

    it('should unlock a user account', () => {
        const spy = spyOn(component['adminService'], 'changeUserStatus').and.callThrough();
        const unlockUserButton =
                fixture.nativeElement.querySelector('table.table tbody tr:nth-child(3) td:nth-child(7) button');
        expect(unlockUserButton).toBeTruthy();
        unlockUserButton.dispatchEvent(new Event('click'));
        expect(spy).toHaveBeenCalledWith({ data: { attributes: { ...mockUsers[2], locked: false } } });
    });

});
