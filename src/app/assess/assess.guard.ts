import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../root-store/app.reducers';
import { UserState } from '../root-store/users/users.reducers';
import { AssessmentSummaryService } from './services/assessment-summary.service';
import { UserProfile } from '../models/user/user-profile';
import { Assessment } from '../models/assess/assessment';
import { LastModifiedAssessment } from './models/last-modified-assessment';

@Injectable()
export class AssessGuard implements CanActivate {

    constructor(
        private router: Router,
        public store: Store<AppState>,
        public assessmentSummaryService: AssessmentSummaryService,
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
                let o$;
                if (user && user._id) {
                    o$ = this.fetchWithCreatorId(user._id);
                } else {
                    o$ = this.routeNoCreatorId();
                }

                return o$.
                    map((data) => {
                        if (data === undefined || data.length === 0) {
                            // no assessments found, navigate to creation page
                            this.router.navigate(['assess/create']);
                            return false;
                        } else {
                            // has assessments,
                            //  navigate to the last modified
                            const lastModAssessment = data[0];
                            this.router.navigate(['assess/result/summary', lastModAssessment.rollupId]);
                            return true;
                        }
                    });
            });
    }

    /**
     * @description route to a create page or the last modified summary for this user
     * @param {string} creatorId
     * @return {Observable<Partial<LastModifiedAssessment>[]> }
     */
    public fetchWithCreatorId(creatorId: string): Observable<Partial<LastModifiedAssessment>[]> {
        const id = creatorId;
        return this.assessmentSummaryService
            .getLatestAssessmentsByCreatorId(id);
    }

    /**
     * @description route to a create page or the last modified summary in the system
     * @return {Observable<Partial<LastModifiedAssessment>[]>}
     */
    public routeNoCreatorId(): Observable<Partial<LastModifiedAssessment>[]> {
        return this.assessmentSummaryService
            .getLatestAssessments();
    }
}
