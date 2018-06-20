
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { UserPreferences } from '../../models/user/user-preferences';
import { UserProfile } from '../../models/user/user-profile';
import { AppState } from '../../root-store/app.reducers';
import { FetchUserOnly } from '../../root-store/users/user.actions';
import { Constance } from '../../utils/constance';
import { GenericApi } from './genericapi.service';

@Injectable()
export class UserPreferencesService {

    private readonly referencesUrl = `${Constance.AUTH_URL}/profile/preferences`;

    constructor(
        private genericApi: GenericApi,
        private store: Store<AppState>) { }

    /**
     * @param  {string} userId
     * @param  {UserPreferences} preferences
     * @returns Observable
     */
    public setUserPreferences(userId: string, preferences: UserPreferences): Observable<UserProfile> {
        userId = userId ? userId.trim() : '';
        if (!userId) {
            console.log(`cannot update preferences on empty user id`);
            return;
        }
        
        const url = `${this.referencesUrl}/${userId}`;
        return this.genericApi
            .postAs<JsonApiData<UserProfile>>(url, {data: {preferences}}).pipe(
            map((el) => el.attributes),
            map((el) => {
                // refresh the user in the app
                this.store.dispatch(new FetchUserOnly());
                return el;
            }));
    }

}
