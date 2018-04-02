import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

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
        return this.store.select('users')
            .take(1)
            .pluck('userProfile')
            .switchMap((user: UserProfile) => {
                let o$: Observable<Partial<LastModifiedThreatReport>[]>;
                // if (!this.demoMode && user && user._id) {
                //     o$ = this.fetchWithCreatorId(user._id);
                // } else {
                //     o$ = this.routeNoCreatorId();
                // }
                o$ = this.routeNoCreatorId();
                return o$.
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
                    })
                    .catch((err) => {
                        console.log('error in route gaurd, routing to create page', err);
                        this.router.navigate([this.CREATE_URL]);
                        return Observable.of(false);
                    });
            });
    }

    /**
     * @description route to a create page or the last modified report for this user
     * @param {string} creatorId
     * @return {Observable<Partial<LastModifiedThreatReport>[]> }
     */
    public fetchWithCreatorId(creatorId: string): Observable<Partial<LastModifiedThreatReport>[]> {
        const id = creatorId;
        return this.service.getLatestReportsByCreatorId(creatorId);
    }

    /**
     * @description route to a create page or the last modified report in the system
     * @return {Observable<Partial<LastModifiedThreatReport>[]>}
     */
    public routeNoCreatorId(): Observable<Partial<LastModifiedThreatReport>[]> {
        return this.service.getLatestReports();
    }
}
