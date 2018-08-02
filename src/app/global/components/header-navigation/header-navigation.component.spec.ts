import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';
import { of as observableOf, Observable } from 'rxjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material';

import { HeaderNavigationComponent } from './header-navigation.component';
import { NotificationWindowComponent } from '../notification-window/notification-window.component';
import { ConfigService } from '../../../core/services/config.service';
import { AuthService } from '../../../core/services/auth.service';
import { GenericApi } from '../../../core/services/genericapi.service';
import * as fromApp from '../../../root-store/app.reducers';
import * as userActions from '../../../root-store/users/user.actions';
import * as configActions from '../../../root-store/config/config.actions';
import { environment } from '../../../../environments/environment';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { FieldSortPipe } from '../../pipes/field-sort.pipe';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';

describe('HeaderNavigationComponent', () => {

    let fixture: ComponentFixture<HeaderNavigationComponent>;
    let component: HeaderNavigationComponent;
    let store: Store<fromApp.AppState>;

    const runConfig = {
        'showBanner': false,
        'bannerText': '',
        'authServices': [ 'github' ]
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [
                    HeaderNavigationComponent,
                    NotificationWindowComponent,
                    CapitalizePipe,
                    TimeAgoPipe,
                    FieldSortPipe,
                ],
                imports: [
                    MatMenuModule,
                    RouterTestingModule,
                    HttpClientTestingModule,
                    BrowserAnimationsModule,
                    StoreModule.forRoot(fromApp.reducers),
                ],
                providers: [
                    // { provide: AuthService, useValue: MockAuthService },
                    AuthService,
                    GenericApi,
                    ConfigService,
                ],
                schemas: [ NO_ERRORS_SCHEMA ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        environment.runMode = 'UAC';
        fixture = TestBed.createComponent(HeaderNavigationComponent);
        component = fixture.componentInstance;
        store = component['store'];
        store.dispatch(new configActions.LoadRunConfig(runConfig));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(fixture.debugElement.query(By.css('mat-toolbar')).nativeElement.className).not.toContain('demoMode');
    });

    it('displays the proper title', () => {
        const titleEl = 'span#titleWrapper span#titleText';
        const tests = [
            {title: '', logo: /.*logo\-default\.svg/, text: undefined},
            {title: 'assessments', logo: /.*logo\-assessments\.svg/, text: /assessments/i},
            {title: 'threat-dashboard', logo: /.*logo\-threat\-dashboard\.svg/, text: /threat dashboard/i},
            {title: 'Analytic Exchange', logo: /.*logo\-indicator\-sharing\.svg/, text: /analytic exchange/i},
        ];
        tests.forEach(test => {
            const titledFixture = TestBed.createComponent(HeaderNavigationComponent);
            const titledComponent = titledFixture.componentInstance;
            titledComponent.title = test.title;
            titledFixture.detectChanges();
            if (test.title) {
                expect(titledFixture.debugElement.query(By.css(titleEl)).nativeElement.textContent).toMatch(test.text);
            } else {
                expect(titledFixture.debugElement.query(By.css(titleEl))).toBeNull();
            }
        });

        {
            expect(component.topPx).toEqual('0px');
            runConfig.showBanner = true;
            const titledFixture = TestBed.createComponent(HeaderNavigationComponent);
            const titledComponent = titledFixture.componentInstance;
            titledFixture.detectChanges();
            expect(titledComponent.topPx).toEqual('17px');
            runConfig.showBanner = false;
        }
    });

    it('can run in demo mode', () => {
        environment.runMode = 'DEMO';
        const demoFixture = TestBed.createComponent(HeaderNavigationComponent);
        const demoComponent = demoFixture.componentInstance;
        demoFixture.detectChanges();
        expect(demoComponent).toBeTruthy();
        expect(demoFixture.debugElement.query(By.css('mat-toolbar')).nativeElement.className).toContain('demoMode');
        expect(demoFixture.debugElement.query(By.css('#login-button'))).toBeNull();
        expect(demoFixture.debugElement.query(By.css('notification-window'))).toBeNull();
        expect(demoFixture.debugElement.query(By.css('#appMenuWrapper .navButton'))).toBeNull();
        expect(demoFixture.debugElement.query(By.css('#accountWrapper'))).toBeNull();
    });

    it('displays the sign in button, when not logged in', () => {
        const authService = fixture.debugElement.injector.get(AuthService);
        spyOn(authService, 'loggedIn').and.returnValue(false);
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('#login-button')).nativeElement).toBeDefined();
        expect(fixture.debugElement.query(By.css('notification-window'))).toBeNull();
        expect(fixture.debugElement.query(By.css('#accountWrapper'))).toBeNull();
    });

    describe('with a logged in user', () => {

        let authService: AuthService;

        const demoUser = {
            _id: '123',
            userName: 'Demo-User',
            firstName: 'Demo',
            lastName: 'User',
            role: 'STANDARD_USER',
            auth: {
                service: 'testauth',
                id: 1,
                userName: 'demo'
            },
            approved: true
        };
        const adminUser = {
            _id: '456',
            userName: 'Admin-User',
            firstName: 'Admin',
            lastName: 'User',
            role: 'ADMIN',
            auth: {
                service: 'testauth',
                id: 2,
                userName: 'admin',
                avatar_url: 'assets/icon/stix-icons/svg/identity-b.svg'
            },
            approved: true
        };
        const orgUser = {
            _id: '789',
            userName: 'Org-Leader',
            firstName: 'Org',
            lastName: 'Chief',
            organizations : [{ 'approved': true, 'role': 'STANDARD_USER' }],
            role: 'ORG_LEADER',
            auth: {
                service: 'testauth',
                id: 3,
                userName: 'chief',
                avatar_url: 'assets/icon/stix-icons/svg/identity-b.svg'
            },
            approved: true
        };
    
        beforeEach(() => {
            store = fixture.debugElement.injector.get(Store) as Store<fromApp.AppState>;
            store.dispatch({type: userActions.LOGIN_USER, payload: { token: 'Bearer 123', userData: demoUser }});

            authService = fixture.debugElement.injector.get(AuthService);
            spyOn(authService, 'loggedIn').and.returnValue(true);

            fixture.detectChanges();
        });

        it('does not display the sign in button', async(() => {
            spyOn(authService, 'getUser').and.returnValue(demoUser);
            expect(store).toBeDefined();
            expect(fixture.debugElement.query(By.css('#login-button'))).toBeNull();
            expect(fixture.debugElement.query(By.css('notification-window')).nativeElement).toBeDefined();
        }));

        it('displays the account dropdown when clicked', async(() => {
            spyOn(authService, 'getUser').and.returnValue(demoUser);
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(component.showAccountMenu).toBeFalsy();
                expect(fixture.debugElement.query(By.css('#accountWrapper')).nativeElement).toBeDefined();
                // @todo fix this later; can't get a handle on the avatar any more
                // expect(fixture.debugElement.query(By.css('#accountWrapper div img#avatar')).nativeElement.src)
                //     .toMatch(new RegExp(`${demoUser.auth.avatar_url}$`));
                expect(fixture.debugElement.query(By.css('#accountMenuWindow'))).toBeNull();
                fixture.debugElement.query(By.css('#accountWrapper div.cursor-pointer'))
                    .triggerEventHandler('click', null);
                fixture.detectChanges();

                expect(component.showAccountMenu).toBeTruthy();
                expect(fixture.debugElement.query(By.css('#accountMenuWindow div strong')).nativeElement.textContent)
                    .toContain(demoUser.userName);

                // let's also prove clicking outside the dropdown closes it
                component.clickedOutside(new MouseEvent('click', {
                    relatedTarget: fixture.debugElement.query(By.css('.flex1')).nativeElement
                }));
                fixture.detectChanges();
                expect(component.showAccountMenu).toBeFalsy();

                // test the logout button
                fixture.debugElement.query(By.css('#accountWrapper div.cursor-pointer'))
                    .triggerEventHandler('click', null);
                fixture.detectChanges();
                const spy = spyOn(store, 'dispatch').and.returnValue(false);
                fixture.debugElement.query(By.css('#accountWrapper .accountMenuLine:last-child a'))
                    .triggerEventHandler('click', null);
                fixture.detectChanges();
                expect(store.dispatch).toHaveBeenCalledWith(new userActions.LogoutUser());
            });
        }));

        it('as regular user, the app menu displays the correct icons', () => {
            spyOn(authService, 'getUser').and.returnValue(demoUser);
            expect(component.showAppMenu).toBeFalsy();
            expect(fixture.debugElement.query(By.css('#appMenuWindow'))).toBeNull();
            fixture.debugElement.query(By.css('#appMenuWrapper .navButton')).triggerEventHandler('click', null);
            fixture.detectChanges();
            expect(component.showAppMenu).toBeTruthy();
            expect(fixture.debugElement.query(By.css('#appMenuWindow')).nativeElement).toBeDefined();
            const links = fixture.debugElement.queryAllNodes(By.css('.appLinkWrapper a .appItemText'))
                .map(node => node.nativeNode.innerText);
            expect(links).not.toContain('Organizations');
            expect(links).not.toContain('Admin');

            // let's also prove clicking outside the dropdown closes it
            component.clickedOutside(new MouseEvent('click', {
                relatedTarget: fixture.debugElement.query(By.css('.flex1')).nativeElement
            }));
            fixture.detectChanges();
            expect(component.showAppMenu).toBeFalsy();
        });

        it('as Org Leader, the app menu still displays the correct icons', () => {
            spyOn(authService, 'getUser').and.returnValue(orgUser);
            store.dispatch({type: userActions.LOGIN_USER, payload: { token: 'Bearer 456', userData: orgUser }});
            fixture.detectChanges();
            expect(component.showAppMenu).toBeFalsy();
            fixture.debugElement.query(By.css('#appMenuWrapper .navButton')).triggerEventHandler('click', null);
            fixture.detectChanges();
            const links = fixture.debugElement.queryAllNodes(By.css('.appLinkWrapper a .appItemText'))
                .map(node => node.nativeNode.innerText);
            expect(links).toContain('Organizations');
            expect(links).not.toContain('Admin');

            // let's also prove clicking outside the dropdown closes it
            component.clickedOutside(new MouseEvent('click', {
                relatedTarget: fixture.debugElement.query(By.css('.flex1')).nativeElement
            }));
            fixture.detectChanges();
            expect(component.showAppMenu).toBeFalsy();
        });

        it('as Admin, the app menu STILL displays the correct icons', () => {
            spyOn(authService, 'getUser').and.returnValue(adminUser);
            store.dispatch({type: userActions.LOGIN_USER, payload: { token: 'Bearer 789', userData: adminUser }});
            fixture.detectChanges();
            fixture.debugElement.query(By.css('#appMenuWrapper .navButton')).triggerEventHandler('click', null);
            fixture.detectChanges();
            const links = fixture.debugElement.queryAllNodes(By.css('.appLinkWrapper a .appItemText'))
                .map(node => node.nativeNode.innerText);
            expect(links).toContain('Organizations');
            expect(links).toContain('Admin');

            // let's also prove clicking outside the dropdown closes it
            component.clickedOutside(new MouseEvent('click', {
                relatedTarget: fixture.debugElement.query(By.css('.flex1')).nativeElement
            }));
            fixture.detectChanges();
            expect(component.showAppMenu).toBeFalsy();
        });

    });

});
