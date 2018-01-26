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
                if (user && user.identity && user.identity.id) {
                    const id = user.identity.id;
                    const o$ = this.assessmentSummaryService
                        .getAssessmentsByUser(id, false)
                        .map((data: Assessment[]) => {
                            if (data === undefined || data.length === 0) {
                                // this.router.navigate(['/']);
                                // TODO: navigate to creation page
                                return false;
                            } else {
                                // TODO: navigate to last modified assessment summary
                                return true;
                            }
                        });
                        return o$;
                    }
            });
    }
}
