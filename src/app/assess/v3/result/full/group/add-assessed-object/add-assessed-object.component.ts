import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Question } from 'stix/assess/v3/baseline/question';
import { QuestionAnswerEnum } from 'stix/assess/v3/baseline/question-answer.enum';
import { StixCoreEnum } from 'stix/stix/stix-core.enum';
import { AttackPattern } from 'stix/unfetter/attack-pattern';
import { StixEnum } from 'stix/unfetter/stix.enum';
import { SpeedDialItem } from '../../../../../../global/components/speed-dial/speed-dial-item';
import { RxjsHelpers } from '../../../../../../global/static/rxjs-helpers';
import { Constance } from '../../../../../../utils/constance';
import { AssessService } from '../../../../services/assess.service';
import { Weighting } from './weighting';

@Component({
    selector: 'unf-add-assessed-object',
    templateUrl: './add-assessed-object.component.html',
    styleUrls: ['./add-assessed-object.component.scss']
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
    public xUnfetterCapability: any;

    @Input()
    public courseOfAction: any;

    @Input()
    public indicator: any;

    @Input()
    public displayedAssessedObjects: any[];

    @Input()
    public assessedObjects: any[];

    @Output()
    public addAssessmentEvent = new EventEmitter<boolean>();

    public addAssessedObjectName: string = '';
    public errMsg: string;
    public capabilityFormGroup: FormGroup;
    public selectWeightings: Weighting[];

    public readonly speedDialItems = [
        new SpeedDialItem('toggle', 'add', true, null, 'Add Assessed Object'),
        new SpeedDialItem('indicator', null, false, 'indicator', 'Indicator'),
        new SpeedDialItem('mitigation', null, false, 'course-of-action', 'Mitigation'),
        new SpeedDialItem('capability', null, false, 'tool', 'Capability')
    ];

    private readonly subscriptions: Subscription[] = [];

    public constructor(
        private assessService: AssessService,
        private changeDetectorRef: ChangeDetectorRef,
    ) { }

    /**
     * @description initialize this component
     */
    public ngOnInit(): void {
        this.capabilityFormGroup = this.generateCapabilityFormGroup();
        this.selectWeightings = this.generateCapabilityWeightingValues();
    }

    /**
     * @description cleans subscriptions, cleans up this component
     */
    public ngOnDestroy(): void {
        this.subscriptions
            .forEach((sub) => sub.unsubscribe());
    }

    /**
     * @description create an assessment object
     * @param newAssessedObject
     * @param attackPattern
     * @returns void
     */
    public createAssessedObject(newAssessedObject, attackPattern): void {
        const { created_by_ref } = this.assessment;
        newAssessedObject.created_by_ref = created_by_ref;
        // tslint:disable-next-line:prefer-for-of
        // calculate risk, based on question options and answers
        for (let i = 0; i < newAssessedObject.questions.length; i++) {
            newAssessedObject.questions[i].selected_value.risk =
                newAssessedObject.questions[i].risk;
            for (const option of newAssessedObject.questions[i].options) {
                if (option.risk === newAssessedObject.questions[i].risk) {
                    newAssessedObject.questions[i].selected_value.name = option.name;
                }
            }
        }

        // Update & save questions for assessment
        const questions = newAssessedObject.questions;
        // copy over assessed object, remove the questions
        const convertedObj = Object.assign({}, newAssessedObject);
        delete convertedObj.questions;

        if (convertedObj.type === StixEnum.CAPABILITY) {
            return;
        } else {
            this.inlineUpdateAssessment(convertedObj, attackPattern, questions);
        }
    }

    /**
     * @description update this component's assessment with a newly created assessed object
     * @param  {any} convertedObj
     * @returns void
     */
    public inlineUpdateAssessment(convertedObj: any, attackPattern: AttackPattern, questions: any[]): void {
        // Uploaded indicator, COA
        const assessedObjSave$ = this.generateConvertedObjSaveObservable(convertedObj);
        this.errMsg = '';
        let createdObjs;
        // save the object
        const saveChain$ = assessedObjSave$
            .pipe(
                // remember the newly created obj
                map((result) => createdObjs = result),
                // save the object's relationship to the attack pattern
                switchMap((result) => this.generateRelationshipSaveObservable(result, convertedObj, attackPattern)),
                // save the object as part of the parent assessment
                switchMap((_) => this.generateAssessmentUpdateObservable(createdObjs[0], convertedObj, questions))
            );
        const sub = saveChain$
            .subscribe(
                () => console.log('saved'),
                (err) => {
                    console.log(err);
                    this.errMsg = err.statusText || 'Unknown Error';
                    // change detection was needed to update the form
                    // even with change detection default for this component
                    this.changeDetectorRef.detectChanges();
                },
                () => console.log('done update')
            );

        this.subscriptions.push(sub);
    }

    /**
     * @description resets this components ;
     *  cleans forms for indicators, courses of action, and capabilities
     *  closes the form
     * @returns void
     */
    public resetNewAssessmentObjects(): void {
        this.addAssessedObject = false;
        this.addAssessedType = '';
        this.indicator = {
            type: StixCoreEnum.INDICATOR,
            name: '',
            description: '',
            pattern: '',
            questions: []
        };
        this.courseOfAction = {
            type: StixCoreEnum.COURSE_OF_ACTION,
            name: '',
            description: '',
            questions: []
        };
        this.xUnfetterCapability = {
            type: StixEnum.CAPABILITY,
            name: '',
            description: '',
            questions: []
        };

        for (const stixType in Constance.MEASUREMENTS) {
            for (const question in Constance.MEASUREMENTS[stixType]) {
                switch (stixType) {
                    case StixCoreEnum.INDICATOR:
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
                    case StixCoreEnum.COURSE_OF_ACTION:
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
                    case StixEnum.CAPABILITY:
                        this.xUnfetterCapability.questions.push({
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
                    default:
                        break;
                }
            }
        }
    }

    /**
     * @param  {} options
     * @returns any
     */
    public getOptions(options): any[] {
        const retVal = [];
        options.forEach((label, index) => {
            const data: any = {};
            data.name = label;
            data.risk = 1 - index / (options.length - 1);
            retVal.push(data);
        });
        return retVal;
    }

    /**
     * @param  {SpeedDialItem} speedDialItem
     * @returns void
     * @description Handler for speed dial click events
     */
    public speedDialClicked(speedDialItem: SpeedDialItem): void {
        this.addAssessedObject = true;
        switch (speedDialItem.name) {
            case 'indicator':
                this.addAssessedObjectName = 'Indicator';
                this.addAssessedType = StixCoreEnum.INDICATOR;
                break;
            case 'mitigation':
                this.addAssessedObjectName = 'Mitigation';
                this.addAssessedType = StixCoreEnum.COURSE_OF_ACTION;
                break;
            case 'capability':
                this.addAssessedObjectName = 'Capability';
                this.addAssessedType = StixEnum.CAPABILITY;
                break;
        }
    }

    /**
     * @param  {any} el
     * @param  {Event} event?
     * @returns void
     */
    public applyNewCapability(el: any, event?: Event): void {
        if (event) {
            event.preventDefault();
        }

        console.log(el);
    }

    /**
     * @param  {any} convertedObj
     * @returns Observable
     */
    private generateConvertedObjSaveObservable(convertedObj: any): Observable<any> {
        return this.assessService
            .genericPost(`api/${convertedObj.type}s`, convertedObj)
            .pipe(
                map((assessments) => assessments.map(RxjsHelpers.mapAttributes))
            );
    }

    /**
     * @param  {any} assessedObjects
     * @param  {any} convertedObj
     * @param  {AttackPattern} attackPattern
     * @returns Observable
     */
    private generateRelationshipSaveObservable(assessedObjects: any, convertedObj: any, attackPattern: AttackPattern): Observable<any> {
        const newId = assessedObjects[0].id;
        // create relationship
        const relationshipObj: any = {
            type: 'relationship',
            'created_by_ref': convertedObj.created_by_ref,
        };

        switch (convertedObj.type) {
            case 'course-of-action':
                relationshipObj.relationship_type = 'mitigates';
                break;
            case 'indicator':
                relationshipObj.relationship_type = 'indicates';
                break;
            default:
                break;
        }
        relationshipObj.source_ref = newId;
        relationshipObj.target_ref = attackPattern.id;
        return this.assessService
            .genericPost(Constance.RELATIONSHIPS_URL, relationshipObj);
    }

    private generateAssessmentUpdateObservable(createdObj: any, convertedObj: any, questions: any[]): Observable<any> {
        const newId = createdObj.id;
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

        this.assessment.assessment_objects.push(
            tempAssessmentObject
        );
        const assessmentToUpload: any = this.assessment;
        assessmentToUpload.modified = new Date().toISOString();
        return this.assessService
            .genericPatch(`${Constance.X_UNFETTER_ASSESSMENT_URL}/${this.assessment.id}`, assessmentToUpload)
            .pipe(
                map((assessmentResult) => {
                    this.displayedAssessedObjects.push(tempAssessmentObject);
                    this.assessedObjects.push({ stix: createdObj });
                    this.resetNewAssessmentObjects();
                    this.addAssessmentEvent.emit(true);
                    return assessmentResult;
                })
            );
    }

    /**
     * @description reactive form for creating and using a new capability
     * @returns FormGroup
     */
    private generateCapabilityFormGroup(): FormGroup {
        const group = new FormGroup({
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            assessmentScore: new FormControl('', [Validators.required]),
            category: new FormControl('', [Validators.required]),
            attackPattern: new FormControl(this.currentAttackPattern, [Validators.required]),
            protectWeight: new FormControl('', [Validators.required]),
            detectWeight: new FormControl('', [Validators.required]),
            respondWeight: new FormControl('', [Validators.required])
        });

        return group;
    }

    /**
     * @description weight values used when mapping a capability to an attack pattern
     * @returns Weighting[]
     */
    private generateCapabilityWeightingValues(): Weighting[] {
        // const keys = Object.keys(QuestionAnswerEnum);
        // type keys = keyof QuestionAnswerEnum;
        const keys = [
            QuestionAnswerEnum.NOT_APPLICABLE,
            QuestionAnswerEnum.NONE,
            QuestionAnswerEnum.LOW,
            QuestionAnswerEnum.MEDIUM,
            QuestionAnswerEnum.SIGNIFICANT,
        ]
        const longKeys = keys.map((k) => new Weighting(new Question().toLongForm(k), k))
        return longKeys;
    }

}
