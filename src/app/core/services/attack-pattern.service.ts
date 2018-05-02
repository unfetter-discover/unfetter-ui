import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Stix from 'stix/unfetter/attack-pattern';
import { AttackPattern } from '../../models';
import { UserProfile } from '../../models/user/user-profile';
import { Constance } from '../../utils/constance';
import { GenericApi } from './genericapi.service';

@Injectable()
export class AttackPatternService {

    constructor(
        protected genericApiService: GenericApi,
        @SkipSelf() @Optional() protected parent: AttackPatternService
    ) {
        if (parent) {
            throw new Error(
                'AttackPatternService is already loaded. Import it in one module only');
        }
    }

    /**
     * @description fetch by framework if it is given, otherwise get all the attack patterns across frameworks
     * @param  {UserProfile} userProfile
     * @returns Observable<Stix.AttackPattern[]>
     */
    public fetchAttackPatterns(userFramework?: string): Observable<Stix.AttackPattern[]> {
        return this.fetchByFramework(userFramework)
            .map((el) => {
                return el.map((_) => Object.assign(new Stix.AttackPattern(), _.attributes));
            });
    }

    /**
     * @deprecated uses the old AttackPattern model, use the new stix models
     * @see fetchAttackPatterns
     * @see Stix.AttackPattern
     * @description fetch by framework if it is given, otherwise get all the attack patterns across frameworks
     * @param  {string} userFramework?
     * @returns Observable<AttackPattern[]>
     */
    public fetchAttackPatterns1(userFramework?: string): Observable<AttackPattern[]> {
        return this.fetchByFramework(userFramework);
    }

    /**
     * @description fetch by framework if it is given, otherwise get all the attack patterns across frameworks
     * @param  {string} userFramework?
     * @returns Observable<AttackPattern[]>
     */
    public fetchByFramework(userFramework?: string): Observable<AttackPattern[]> {
        let url = '';
        const sort = `sort=${encodeURIComponent(JSON.stringify({ name: '1' }))}`;
        const projectConfig = {
            'stix.name': 1,
            'stix.description': 1,
            'stix.kill_chain_phases': 1,
            'extendedProperties.x_mitre_data_sources': 1,
            'extendedProperties.x_mitre_platforms': 1,
            'stix.id': 1
        };
        const project = `project=${encodeURI(JSON.stringify(projectConfig))}`;
        if (userFramework) {
            const userFrameworkFilter = { 'stix.kill_chain_phases.kill_chain_name': { $exists: true, $eq: userFramework } };
            const filter = 'filter=' + encodeURIComponent(JSON.stringify(userFrameworkFilter));
            url = `${Constance.ATTACK_PATTERN_URL}?${filter}&${project}&${sort}`;
        } else {
            url = `${Constance.ATTACK_PATTERN_URL}?${project}&${sort}`;
        }
        return this.genericApiService.getAs<AttackPattern[]>(url);
    }
}
