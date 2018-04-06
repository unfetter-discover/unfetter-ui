import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../root-store/app.reducers';
import { AssessService } from './services/assess.service';
import { environment } from '../../environments/environment';
import { LastModifiedAssessment3 } from './models/last-modified-assessment3';
import { UserState } from '../root-store/users/users.reducers';
import { UserProfile } from '../models/user/user-profile';

@Injectable()
export class Assess3Guard implements CanActivate {
    public readonly demoMode: boolean = (environment.runMode === 'DEMO');
    private readonly CREATE_URL = 'assess3/create';

    constructor(
        private router: Router,
        public store: Store<AppState>,
        public assessService: AssessService,
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
                if (!this.demoMode && user && user._id) {
                    o$ = this.fetchWithCreatorId(user._id);
                } else {
                    o$ = this.fetchWithNoCreatorId();
                }

                return o$.
                    map((data) => {
                        if (data === undefined || data.length === 0) {
                            // no assessments found, navigate to creation page
                            this.router.navigate([this.CREATE_URL]);
                            return false;
                        } else {
                            // has assessments,
                            //  navigate to the last modified
                            const lastModAssessment = data[0];
                            this.router.navigate(['/assess3/result/summary', lastModAssessment.id]);
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
     * @description
     *  fetch assessments by their owner, then fallback and show a group assessment if needed
     * @param {string} creatorId
     * @return {Observable<Partial<LastModifiedAssessment3>[]>}
     */
    public fetchWithCreatorId(creatorId: string): Observable<Partial<LastModifiedAssessment3>[]> {
        
        console.log(`User ID for latest objass by creator: ${creatorId}`);

        return this.assessService
            .getLatestAssessmentsByCreatorId(creatorId)
            .switchMap((data: any[]) => {
                if (!data || data.length < 1) {
                    return this.fetchWithNoCreatorId();
                } else {
                    return Observable.of(data);
                }
            });
    }

    /**
     * @description show last modified group assessments
     * @return {Observable<Partial<LastModifiedAssessment3>[]>}
     */
    public fetchWithNoCreatorId(): Observable<Partial<LastModifiedAssessment3>[]> {
        return this.assessService
            .getLatestAssessments();
    }
}
