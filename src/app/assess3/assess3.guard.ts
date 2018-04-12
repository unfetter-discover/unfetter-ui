import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { UserProfile } from '../models/user/user-profile';
import { AppState } from '../root-store/app.reducers';
import { AssessService } from './services/assess.service';


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
                const o$ = this.assessService.getLatestAssessments();
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
}
