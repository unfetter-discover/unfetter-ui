import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttackPattern } from '../../models/attack-pattern';
import { AssessmentsDashboardService } from '../../assessments-dashboard/assessments-dashboard.service';
import { Constance } from '../../../utils/constance';
import { Subscription } from 'rxjs';

@Component({
    selector: 'add-assessed-object',
    templateUrl: './add-assessed-object.component.html',
    styleUrls: ['./add-assessed-object.component.css']
})
export class AddAssessedObjectComponent implements OnInit, OnDestroy {

    @Input()
    public addAssessedObject = false;

    @Input()
    public addAssessedType: string;

    @Input()
    public currentAttackPattern: string;

    @Input()
    public assessment: any;

    @Input()
    public xUnfetterSensor: any;

    @Input()
    public courseOfAction: any;

    @Input()
    public indicator: any;

    @Input()
    public displayedAssessedObjects: any[];

    @Input()
    public assessedObjects: any[];

    @Output('addAssessmentEvent')
    public addAssessmentEvent = new EventEmitter<boolean>();

    private readonly subscriptions: Subscription[] = [];

    public constructor(private assessmentsDashboardService: AssessmentsDashboardService) {
        console.log('ctor');
    }

    /**
     * @description initialize this component
     */
    public ngOnInit(): void {
        console.log('oninit');
    }

    /**
     * @description unsubscribes from subscriptions, cleans up this component
     */
    public ngOnDestroy(): void {
        this.subscriptions
            .filter((el) => el !== undefined)
            .forEach((sub) => sub.unsubscribe());
    }

    /**
     * @description create an assessment object
     * @param newAssessedObject
     * @param attackPattern
     */
    public createAssessedObject(newAssessedObject, attackPattern) {
        console.log('createAssessedObject', this.addAssessedType, attackPattern, newAssessedObject);
        // Update & save questions for assessment
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < newAssessedObject.questions.length; i++) {
            newAssessedObject.questions[i].selected_value.risk =
                newAssessedObject.questions[i].risk;
            for (const option of newAssessedObject.questions[i].options) {
                if (option.risk === newAssessedObject.questions[i].risk) {
                    newAssessedObject.questions[i].selected_value.name = option.name;
                }
            }
        }
        const questions = newAssessedObject.questions;
        delete newAssessedObject.questions;

        const convertedObj: any = {};
        for (const prop in newAssessedObject) {
            if (newAssessedObject[prop]) {
                convertedObj[prop] = newAssessedObject[prop];
            }
        }

        // Uploaded indicator, COA, or sensor
        const sub = this.assessmentsDashboardService
            .genericPost(`api/${convertedObj.type}s`, convertedObj)
            .subscribe(
            (assessedRes) => {
                const newId = assessedRes[0].attributes.id;
                const createdObj = assessedRes[0].attributes;

                // create relationship
                const relationshipObj: any = { type: 'relationship' };
                switch (newAssessedObject.type) {
                    case 'x-unfetter-sensor':
                    case 'course-of-action':
                        relationshipObj.relationship_type = 'mitigates';
                        break;
                    case 'indicator':
                        relationshipObj.relationship_type = 'indicates';
                        break;
                }
                relationshipObj.source_ref = newId;
                relationshipObj.target_ref = attackPattern.id;
                const sub1 = this.assessmentsDashboardService
                    .genericPost(Constance.RELATIONSHIPS_URL, relationshipObj)
                    .subscribe(
                    (relationshipRes) => {
                        console.log('Relationship uploaded successfully');
                    },
                    (relationshipErr) => console.log(relationshipErr)
                    );
                this.subscriptions.push(sub1);

                // update assessment
                const tempAssessmentObject: any = {};
                tempAssessmentObject.questions = questions;
                tempAssessmentObject.stix = {
                    id: newId,
                    type: convertedObj.type,
                    name: convertedObj.name
                };
                if (convertedObj.description !== undefined) {
                    tempAssessmentObject.stix.description = convertedObj.description;
                }
                tempAssessmentObject.risk =
                    questions
                        .map((question) => question.risk)
                        .reduce((prev, cur) => (prev += cur), 0) / questions.length;

                this.assessment.attributes.assessment_objects.push(
                    tempAssessmentObject
                );
                const assessmentToUpload: any = this.assessment.attributes;
                assessmentToUpload.modified = new Date().toISOString();
                console.log(assessmentToUpload);
                const sub2 = this.assessmentsDashboardService
                    .genericPatch(`${Constance.X_UNFETTER_ASSESSMENT_URL}/${this.assessment.id}`, assessmentToUpload)
                    .subscribe((assessmentRes) => {
                        console.log('Assessment updated successfully');
                        this.displayedAssessedObjects.push(tempAssessmentObject);
                        this.assessedObjects.push({ stix: createdObj });
                        this.resetNewAssessmentObjects();
                    },
                    (assessmentErr) => console.log(assessmentErr)
                    );
                this.subscriptions.push(sub2);
                this.addAssessmentEvent.emit(true);
            },
            (assessedErr) => console.log(assessedErr)
            );

        this.subscriptions.push(sub);
    }

    /**
     * @description
     */
    public resetNewAssessmentObjects(): void {
        this.addAssessedObject = false;
        this.addAssessedType = '';
        this.indicator = {
            type: 'indicator',
            name: '',
            description: '',
            pattern: '',
            questions: []
        };
        this.courseOfAction = {
            type: 'course-of-action',
            name: '',
            description: '',
            questions: []
        };
        this.xUnfetterSensor = {
            type: 'x-unfetter-sensor',
            name: '',
            description: '',
            questions: []
        };

        for (const stixType in Constance.MEASUREMENTS) {
            for (const question in Constance.MEASUREMENTS[stixType]) {
                switch (stixType) {
                    case 'indicator':
                        this.indicator.questions.push({
                            name: question,
                            risk: 1,
                            options: this.getOptions(
                                Constance.MEASUREMENTS[stixType][question]
                            ),
                            selected_value: {
                                name: Constance.MEASUREMENTS[stixType][question][0].name,
                                risk: 1
                            }
                        });
                        break;
                    case 'course-of-action':
                        this.courseOfAction.questions.push({
                            name: question,
                            risk: 1,
                            options: this.getOptions(
                                Constance.MEASUREMENTS[stixType][question]
                            ),
                            selected_value: {
                                name: Constance.MEASUREMENTS[stixType][question][0].name,
                                risk: 1
                            }
                        });
                        break;
                    case 'x-unfetter-sensor':
                        this.xUnfetterSensor.questions.push({
                            name: question,
                            risk: 1,
                            options: this.getOptions(
                                Constance.MEASUREMENTS[stixType][question]
                            ),
                            selected_value: {
                                name: Constance.MEASUREMENTS[stixType][question][0].name,
                                risk: 1
                            }
                        });
                        break;
                }
            }
        }
    }

    public getOptions(options) {
        const retVal = [];
        options.forEach((label, index) => {
          const data: any = {};
          data.name = label;
          data.risk = 1 - index / (options.length - 1);
          retVal.push(data);
        });
        return retVal;
      }

}
