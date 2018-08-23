import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreModule } from '@ngrx/store';
import { of as observableOf, Observable } from 'rxjs';

// Load the implementations that should be tested
import { AppState } from './app.service';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth.service';
import { RunConfigService } from './core/services/run-config.service';
import { GenericApi } from './core/services/genericapi.service';
import { environment } from '../environments/environment';
import { reducers } from './root-store/app.reducers';

@Component({template: 'Nothing to see here'})
class NoopComponent {
}

describe(`App`, () => {

    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
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
                organizations: [{
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

    const config = {
        'showBanner': false,
        'bannerText': '',
        'authServices': [ 'github' ]
    };
    const mockRunConfig = {
        loadPrivateConfig: () => {
            console.log('i solemnly swear i am not trying to perform an http get...');
        },
        config: observableOf(config)
    }

    // async beforeEach
    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    StoreModule.forRoot(reducers),
                ],
                declarations: [
                    NoopComponent,
                    AppComponent,
                ],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    AppState,
                    {
                        provide: AuthService,
                        useValue: mockAuthService
                    },
                    {
                        provide: RunConfigService,
                        useValue: mockRunConfig
                    },
                ]
            })
            .compileComponents();
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
                expect(comp['authService'].loggedIn()).toEqual(login,
                    `user should ${login ? '' : 'not '}have been logged in`);
                expect(comp.runMode).toBe(runmode, `run mode was supposed to be ${runmode}`);
            });
        });
    });

    it(`stub AppState class`, () => {
        fixture = TestBed.createComponent(AppComponent);
        let appState = fixture.debugElement.injector.get(AppState);
        appState.set('user', 'pat');
        expect(appState.get('user')).toEqual('pat');
        expect(appState.get()).toEqual({ 'user': 'pat' });
        expect(function () { appState.state = { 'user': 'chris' } }).toThrowError();
    });

});
