import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AssessmentsDashboardService } from './assessments-dashboard.service';

@Injectable()
export class MockAssessmentsDashboardService extends AssessmentsDashboardService {
    public getById(id: string): Observable<any> {
        return Observable.of({test: 'testData',
                              attributes: {assessment_objects: [{questions: [{name: 'type_of_question', risk: 55}]}]}
                            });
    }

    public getRiskByAttackPattern(id: string): Observable<any> {
        return Observable.of({test: 'testData',
                                phases: [{_id: '33', 'aaa': 33, assessedObjects: [{questions: [{name: 'type_of_question', risk: 33}]}], 
                                                                attackPatterns: [{attackPatternId: 'blue', attackPatternName: 'blueberry'},
                                                                                 {attackPatternId: 'straw', attackPatternName: 'strawberry'}]},
                                         {_id: '22', 'bbb': 22, assessedObjects: [{questions: [{name: 'type_of_question', risk: 33}]}], 
                                                                attackPatterns: [{attackPatternId: 'blue', attackPatternName: 'blueberry'},
                                                                                {attackPatternId: 'straw', attackPatternName: 'strawberry'}]},
                                         {_id: '11', 'ccc': 11, assessedObjects: [{questions: [{name: 'type_of_question', risk: 33}]}],
                                                                attackPatterns: [{attackPatternId: 'blue', attackPatternName: 'blueberry'},
                                                                                {attackPatternId: 'straw', attackPatternName: 'strawberry'}]}],
                                attackPatternsByKillChain: [{_id: '33',
                                                            attackPatterns: ['111', '222', '333']}],
                                assessedByAttackPattern: [{_id: '123',
                                                            risk: .54}]});
    }
}
