
import {of as observableOf,  Observable } from 'rxjs';

import {pluck, map, catchError, take, switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { UserProfile } from '../models/user/user-profile';
import { AppState } from '../root-store/app.reducers';
import { BaselineService } from './services/baseline.service';


@Injectable()
export class BaselineGuard implements CanActivate {
    public readonly demoMode: boolean = (environment.runMode === 'DEMO');
    private readonly CREATE_URL = 'baseline/create';

    constructor(
        private router: Router,
        public store: Store<AppState>,
        public baselineService: BaselineService,
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
                const o$ = this.baselineService.getLatestAssessments();
                return o$.pipe(
                    map((data) => {
                        if (data === undefined || data.length === 0) {
                            // no baselines found, navigate to creation page
                            this.router.navigate([this.CREATE_URL]);
                            return false;
                        } else {
                            // has baselines,
                            //  navigate to the last modified
                            const lastModAssessment = data[0];
                            this.router.navigate(['/baseline/result/summary', lastModAssessment.id]);
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
