import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd, Routes } from '@angular/router';
import { inject, async, TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { StoreModule } from '@ngrx/store';

// Load the implementations that should be tested
import { AppModule } from './app.module';
import { AppState } from './app.service';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth.service';
import { ConfigService } from './core/services/config.service';
import { GenericApi } from './core/services/genericapi.service';
import { environment } from '../environments/environment';
import { reducers } from './root-store/app.reducers';
import { Themes } from './global/enums/themes.enum';

describe(`App`, () => {

    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let location: Location;
    let router: Router;

    let loggedIn: boolean;
    const mockAuthService = {
        loggedIn() {
            return loggedIn;
        },
        getUser() {
            return {
                _id: '1234',
                userName: 'Demo-User',
                firstName: 'Demo',
                lastName: 'User',
                organizations : [{
                    'id': 'identity--e240b257-5c42-402e-a0e8-7b81ecc1c09a',
                    'approved': true,
                    'role': 'STANDARD_USER'
                }],
            };
        },
        getToken() {
            return 'token';
        }
    };

    const routes: Routes = [
        { path: '', component: AppComponent },
        { path: 'home', component: AppComponent },
        { path: 'partners', component: AppComponent },
        { path: 'intrusion-set-dashboard', component: AppComponent },
        { path: 'assessments', component: AppComponent },
        { path: 'assess', component: AppComponent },
        { path: 'threat-dashboard', component: AppComponent },
        { path: 'users', component: AppComponent },
        { path: 'indicator-sharing', component: AppComponent },
        { path: 'organizations', component: AppComponent },
        { path: 'admin', component: AppComponent },
        { path: '**', component: AppComponent },
    ];

    // async beforeEach
    beforeEach(async(() => {
        const services = [
            AppState,
            { provide: AuthService, useValue: mockAuthService },
            GenericApi,
            ConfigService,
        ];

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(routes),
                HttpClientTestingModule,
                StoreModule.forRoot(reducers)
            ],
            declarations: [AppComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [...services]
        })
        .compileComponents(); // compile template and css

        router = TestBed.get(Router);
        location = TestBed.get(Location);
    }));

    it(`should be readly initialized`, () => {
        loggedIn = true;
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
        expect(fixture).toBeDefined();
        expect(comp).toBeDefined();
    });

    it(`should handle initialization with different logged-in states and run modes`, () => {
        const logins = [true, false];
        const runmodes = ['DEMO', 'UAC', undefined];
        logins.forEach(login => {
            loggedIn = login;
            runmodes.forEach(runmode => {
                environment.runMode = runmode;
                fixture = TestBed.createComponent(AppComponent);
                comp = fixture.componentInstance;
                fixture.detectChanges();
                expect(fixture).toBeDefined();
                expect(comp).toBeDefined();
                expect(comp.authService.loggedIn()).toEqual(login,
                        `user should ${login ? '' : 'not '}have been logged in`);
                expect(comp.runMode).toBe(runmode, `run mode was supposed to be ${runmode}`);
            });
        });
    });

    it(`should handle various router outlets`, fakeAsync(() => {
        const routeChecks = [
            { path: '', title: undefined, theme: Themes.DEFAULT },
            { path: 'home', title: 'home', theme: Themes.DEFAULT },
            { path: 'partners', title: 'partners', theme: Themes.DEFAULT },
            { path: 'intrusion-set-dashboard', title: 'intrusion-set-dashboard', theme: Themes.DEFAULT },
            { path: 'assess', title: 'assessments', theme: Themes.ASSESSMENTS },
            { path: 'threat-dashboard', title: 'threat-dashboard', theme: Themes.THREAT_DASHBOARD },
            { path: 'users', title: 'users', theme: Themes.DEFAULT },
            { path: 'indicator-sharing', title: 'Analytic Exchange', theme: Themes.ANALYTIC_HUB },
            { path: 'organizations', title: 'organizations', theme: Themes.DEFAULT },
            { path: 'admin', title: 'admin', theme: Themes.DEFAULT },
            { path: 'non-existent-page', title: 'non-existent-page', theme: Themes.DEFAULT },
        ];

        loggedIn = true;
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
        router.initialNavigation();

        routeChecks.forEach((check, index, checks) => {
            router.navigate([check.path]).then(
                () => {
                    comp.ngOnInit();
                    expect(comp.theme).toBe(check.theme);
                    expect(comp.title).toBe(check.title);
                }
            );
            tick();
        });
    }));

    it(`stub AppState class`, () => {
        let appState = fixture.debugElement.injector.get(AppState);
        appState.set('user', 'pat');
        expect(appState.get('user')).toEqual('pat');
        expect(appState.get()).toEqual({'user': 'pat'});
        expect(function() {appState.state = {'user': 'chris'}}).toThrowError();
    });

});
