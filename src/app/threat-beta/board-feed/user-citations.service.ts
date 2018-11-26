import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin, combineLatest } from 'rxjs';
import { take, pluck } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from '../../root-store/app.reducers';
import { getOrganizations } from '../../root-store/stix/stix.selectors';

@Injectable({
    providedIn: 'root'
})
export class UserCitationService {

    private users: any[] = [];

    constructor(
        private appStore: Store<AppState>,
        private sanitizer: DomSanitizer,
    ) {
        /*
         * Grab both users and organizations.
         *
         * Threatboards should probably be owned by organizations, not individual users. We currently have no concept
         * for a user, when creating a threatboard, to assign it to a particular organization.
         */
        combineLatest(
            this.appStore.select(getOrganizations),
            this.appStore.select('users').pipe(pluck('userList'))
        )
        .subscribe(
            ([orgs, users]) => {
                const morgs = orgs.map(org => ({...org, userName: org.name}));
                this.users = [...morgs, ...users as any[]];
                console['debug'](`(${new Date().toISOString()}) got user and orgs lists:`, this.users);
            },
            err => console.log('could not load users', err)
        );
    }

    /**
     * Determine who the owner of the given object is, and returning a "friendly" name for them.
     */
    public getUserName(obj: any) {
        let name = [];
        if (obj) {
            if (obj.user) {
                obj = obj.user;
            }
            name = [obj.firstName, obj.lastName].filter(n => !!n);
            if ((name.length === 0) && obj.identity) {
                name = [obj.identity.name].filter(n => !!n);
            }
            if ((name.length === 0) && obj.created_by_ref) {
                const refuser = this.users.find(u => u.id === obj.created_by_ref);
                if (refuser) {
                    name = [this.getUserName({...refuser, created_by_ref: undefined})];
                }
            }
            if ((name.length === 0) && obj.id) {
                const refuser = this.users.find(u => u.id === obj.id);
                if (refuser) {
                    name = [this.getUserName({...refuser, created_by_ref: undefined, id: undefined})];
                }
            }
            if (name.length === 0) {
                name = [obj.userName].filter(n => !!n);
            }
            if (name.length === 0) {
                name = ['Inactive Account'];
            }
        }
        return name.join(' ');
    }

    public getAvatar(obj: any) {
        if (obj) {
            if (obj.user && obj.user.avatar_url) {
                return this.sanitizer.bypassSecurityTrustStyle(`url('${obj.user.avatar_url}')`);
            } else if (obj.created_by_ref) {
                const user = this.users.find(u => u.id === obj.created_by_ref);
                if (user && user.avatar_url) {
                    return this.sanitizer.bypassSecurityTrustStyle(`url('${user.avatar_url}')`);
                }
            }
        }
        return '';
    }

}
