
import {of as observableOf,  Observable } from 'rxjs';

import {pluck, map, catchError, take, switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../root-store/app.reducers';
import { UserState } from '../root-store/users/users.reducers';
import { UserProfile } from '../models/user/user-profile';
import { ThreatReportOverviewService } from './services/threat-report-overview.service';
import { LastModifiedThreatReport } from './models/last-modified-threat-report';
import { environment } from '../../environments/environment';

@Injectable()
export class ThreatReportNavigateGuard implements CanActivate {

    public readonly demoMode: boolean = (environment.runMode === 'DEMO');
    private readonly CREATE_URL = '/threat-dashboard/create';

    constructor(
        private router: Router,
        private store: Store<AppState>,
        private service: ThreatReportOverviewService,
    ) { }

    /**
     * @description
     * @param route
     * @param state 
     */
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.select('users').pipe(
            take(1),
            pluck('userProfile'),
            switchMap((user: UserProfile) => {
                const o$ = this.service.getLatestReports();
                return o$.pipe(
                    map((data) => {
                        if (data === undefined || data.length === 0) {
                            // nothing found, navigate to creation page
                            this.router.navigate([this.CREATE_URL]);
                            return false;
                        } else {
                            // has results,
                            //  navigate to the last modified
                            const lastMod = data[0];
                            this.router.navigate(['/threat-dashboard/view', lastMod.workproductId]);
                            return true;
                        }
                    }),
                    catchError((err) => {
                        console.log('error in route gaurd, routing to create page', err);
                        this.router.navigate([this.CREATE_URL]);
                        return observableOf(false);
                    }));
            }));
    }
}
