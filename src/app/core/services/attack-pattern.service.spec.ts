import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of as observableOf } from 'rxjs';

import { AttackPatternService } from './attack-pattern.service';
import { GenericApi } from './genericapi.service';
import { AttackPattern } from 'stix';

describe('AttackPatternService should', () => {

    let service: AttackPatternService;
    const mockAttackPatternData = [
        new AttackPattern()
    ];

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                AttackPatternService,
                GenericApi,
            ]
        });
    }));

    // synchronous beforeEach
    beforeEach(() => {
        service = TestBed.get(AttackPatternService);
    });

    it('fetch attack patterns for a particular framework', inject([GenericApi], (api: GenericApi) => {
        const framework = 'framework-x';
        const spy = spyOn(api, 'getAs').and.callThrough();
        spyOn(api, 'get').and.returnValue(observableOf(mockAttackPatternData));
        service.fetchAttackPatterns(framework)
            .subscribe(
                response => expect(response).toEqual(mockAttackPatternData)
            );
        expect(spy).toHaveBeenCalledWith(jasmine.stringMatching('filter='));
    }));

    it('fetch attack patterns for all frameworks', inject([GenericApi], (api: GenericApi) => {
        const spy = spyOn(api, 'getAs').and.callThrough();
        spyOn(api, 'get').and.returnValue(observableOf(mockAttackPatternData));
        service.fetchAttackPatterns()
            .subscribe(
                response => expect(response).toEqual(mockAttackPatternData)
            );
        expect(spy).toHaveBeenCalledWith(jasmine.stringMatching(/(?!filter=)/));
    }));

});
