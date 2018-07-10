import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { AssessedObject, Assessment, ObjectAssessment } from 'stix/assess/v3';
import { Capability } from 'stix/assess/v3/baseline/capability';
import { Category } from 'stix/assess/v3/baseline/category';
import { Question } from 'stix/assess/v3/baseline/question';
import { QuestionAnswerEnum } from 'stix/assess/v3/baseline/question-answer.enum';
import { StixCoreEnum } from 'stix/stix/stix-core.enum';
import { AttackPattern } from 'stix/unfetter/attack-pattern';
import { StixEnum } from 'stix/unfetter/stix.enum';
import { AngularHelper } from '../../../../../../global/static/angular-helper';
import { RxjsHelpers } from '../../../../../../global/static/rxjs-helpers';
import { Constance } from '../../../../../../utils/constance';
import { AssessService } from '../../../../services/assess.service';
import { SelectOption } from './select-option';
import { Weighting } from './weighting';

@Component({
    selector: 'unf-add-assessed-object',
    templateUrl: './add-assessed-object.component.html',
    styleUrls: ['./add-assessed-object.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAssessedObjectComponent implements OnInit, OnDestroy {
    @Input() public addAssessedObject = false;
    @Input() public addAssessedType: string;
    @Input() public assessedObjects: any[];
    @Input() public assessment: Assessment;
    @Input() public categoryLookup: Category[];
    @Input() public courseOfAction: any;
    @Input() public currentAttackPattern: AttackPattern;
    @Input() public displayedAssessedObjects: any[];
    @Input() public indicator: any;
    @Input() public xUnfetterCapability: any;
    @Output() public addAssessmentEvent = new EventEmitter<boolean>();

    public addAssessedObjectName: string = '';
    public capabilityFormGroup: FormGroup;
    public capabilitySelectWeightings: Weighting[];
    public capabiltyAssessmentSelectOptions: SelectOption[];
    public errMsg: string;

    // public readonly speedDialItems = [
    //     new SpeedDialItem('toggle', 'add', true, null, 'Add Assessed Object'),
    //     new SpeedDialItem('indicator', null, false, 'indicator', 'Indicator'),
    //     new SpeedDialItem('mitigation', null, false, 'course-of-action', 'Mitigation'),
    //     new SpeedDialItem('capability', null, false, 'tool', 'Capability')
    // ];

    private readonly subscriptions: Subscription[] = [];

    public constructor(
        private assessService: AssessService,
        private changeDetectorRef: ChangeDetectorRef,
    ) { }

    /**
     * @description initialize this component
     */
    public ngOnInit(): void {
        if (this.assessment && this.assessment.assessment_objects) {
            const firstType = this.assessment.assessment_objects[0].stix.type || '';
            this.addAssessedType = firstType;
            this.addAssessedObjectName = this.assessment.determineAssessmentType();
        }
        this.capabilityFormGroup = this.generateCapabilityFormGroup();
        this.capabilitySelectWeightings = this.generateCapabilityWeightingValues();
        this.capabiltyAssessmentSelectOptions = this.generateCapabilityRiskSelectOptions();
    }

    /**
     * @description cleans subscriptions, cleans up this component
     */
    public ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    /**
     * @description create an assessment object, update the assessment with its value
     *  this code path is for relationship derived assessments ie non capability assessments
     * @see onCapabilitySave for capability saves
     * @param newAssessedObject
     * @param attackPattern
     * @returns void
     */
    public onCreateAssessedObject(newAssessedObject, attackPattern, event?: Event): void {
        if (event) {
            event.preventDefault();
        }

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

        this.inlineUpdateAssessment(convertedObj, attackPattern, questions);
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
        // this.addAssessedType = '';
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

        for (const stixType in Constance.MEASUREMENTS) {
            for (const question in Constance.MEASUREMENTS[stixType]) {
                switch (stixType) {
                    case StixCoreEnum.INDICATOR:
                        this.indicator.questions.push({
                            name: question,
                            risk: 1,
                            options: this.generateSelectOptions(
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
                            options: this.generateSelectOptions(
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
     * @description generate select options, using given labels
     *  this method assigns risk in descending order to the given labels
     * @param  {string[]} labels
     * @returns {SelectOption[]}
     */
    public generateSelectOptions(labels: string[]): SelectOption[] {
        const selectOptions = labels.map((label, index) => {
            const risk = (1 - index / (labels.length - 1));
            const data = new SelectOption(label, risk);
            return data;
        });
        return selectOptions;
    }

    /**
     * @description Handler for speed dial click events
     * @param  {SpeedDialItem} speedDialItem
     * @returns void
     */
    // public onSpeedDialClicked(speedDialItem: SpeedDialItem): void {
    //     this.addAssessedObject = true;
    //     switch (speedDialItem.name) {
    //         case 'indicator':
    //             this.addAssessedObjectName = 'Indicator';
    //             this.addAssessedType = StixCoreEnum.INDICATOR;
    //             break;
    //         case 'mitigation':
    //             this.addAssessedObjectName = 'Mitigation';
    //             this.addAssessedType = StixCoreEnum.COURSE_OF_ACTION;
    //             break;
    //         case 'capability':
    //             this.addAssessedObjectName = 'Capability';
    //             this.addAssessedType = StixEnum.CAPABILITY;
    //             break;
    //     }
    // }

    /**
     * @description save a new capabilty and update the assessment with its value
     * @param  {any} formValues
     * @param  {Event} event?
     * @returns void
     */
    public onCapabilitySave(formValues: any, event?: Event): void {
        if (event) {
            event.preventDefault();
        }

        const { created_by_ref } = this.assessment;
        console.log(formValues);
        const capability = new Capability();
        capability.name = formValues.name;
        capability.description = formValues.description;
        capability.category = formValues.category.id;
        capability.created_by_ref = created_by_ref;
        const saveCapability$ = this.generateSaveCapabilityObservable(capability);

        const sub$ = saveCapability$
            .pipe(
                // grab first capability on list
                first(),
                // save the capability to assessment link
                switchMap((savedCapability) => {
                    return this.generateSaveObjectAssessmentObservable(formValues, savedCapability);
                }),
                // grab first object assessent on list
                first(),
                // TODO: should we save the new object assessment into the baseline?
                // save the object as part of the parent assessment
                switchMap((objectAssessment) => {
                    const options = this.generateCapabilityRiskSelectOptions();
                    const selectedRisk = formValues.assessmentRisk;
                    const selectedOpt = options
                        .find((opt) => opt.risk === selectedRisk);
                    const questions = [
                        {
                            name: 'coverage',
                            risk: selectedRisk,
                            options,
                            selected_value: selectedOpt,
                        }
                    ];
                    return this.generateAssessmentUpdateObservable(objectAssessment, objectAssessment, questions);
                })
            )
            .subscribe(
                () => {
                    console.log('capability and assessment updates');
                },
                (err) => {
                    console.log(err);
                    this.errMsg = err.statusText || 'Unknown Error';
                    // change detection was needed to update the form
                    // even with change detection default for this component
                    this.changeDetectorRef.detectChanges();
                }
            );
        this.subscriptions.push(sub$);
    }

    /**
     * @param  {number} index
     * @param  {any} item
     * @returns number
     */
    public trackByFn(index: number, item: any): number {
        return AngularHelper.genericTrackBy(index, item);
    }

    /**
     * @description generate an observable to tell the api to create a new assessed object
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
     * @description generate an observable to tell the api to create a new relationship object
     *  note: relationship objects are used for non capability assessments
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

    /**
     * @description generate an observable to tell the api to update this components assessment
     * @param  {any} createdObj
     * @param  {any} convertedObj
     * @param  {any[]} questions
     * @returns Observable
     */
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
        tempAssessmentObject.risk = this.calcTotalRisk(questions);

        this.assessment.assessment_objects.push(tempAssessmentObject);
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
     * @description generate an observable to tell the api to create a new capability object
     * @param  {Capability} capability
     * @returns Observable
     */
    private generateSaveCapabilityObservable(capability: Capability): Observable<Capability> {
        if (!capability) {
            return EMPTY;
        }

        return this.assessService
            .genericPost(`api/v3/x-unfetter-capabilities`, capability)
            .pipe(
                map((capabilities) => capabilities.map(RxjsHelpers.mapAttributes)[0])
            );
    }

    /**
     * @param  {any} form
     * @param  {Capability} capability
     * @returns Observable
     */
    private generateSaveObjectAssessmentObservable(form: any, capability: Capability): Observable<ObjectAssessment> {
        if (!capability || !capability.id) {
            return EMPTY;
        }

        const { created_by_ref } = this.assessment;
        const assessedObject = {
            assessed_object_ref: this.currentAttackPattern.id,
            questions: [
                {
                    name: 'protect',
                    score: form.protectWeight,
                } as Question,
                {
                    name: 'detect',
                    score: form.detectWeight,
                } as Question,
                {
                    name: 'respond',
                    score: form.respondWeight,
                } as Question,
            ],
        } as AssessedObject;
        const objectAssessment = {
            created_by_ref,
            name: `${capability.name}`,
            description: `${capability.description}`,
            object_ref: capability.id,
            assessed_objects: [
                assessedObject,
            ],
            type: StixEnum.OBJECT_ASSESSMENT,
        } as ObjectAssessment;

        return this.assessService
            .genericPost(`api/v3/x-unfetter-object-assessments`, objectAssessment)
            .pipe(
                map((objectAssessments) => objectAssessments.map(RxjsHelpers.mapAttributes)[0])
            );
    }

    /**
     * @param  {any[]} questions
     * @returns number
     */
    private calcTotalRisk(questions: any[]): number {
        return questions
            .map((question) => question.risk)
            .reduce((prev, cur) => (prev += cur), 0) / questions.length;
    }

    /**
     * @description reactive form for creating and using a new capability
     * @returns FormGroup
     */
    private generateCapabilityFormGroup(): FormGroup {
        const group = new FormGroup({
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            assessmentRisk: new FormControl('', [Validators.required]),
            category: new FormControl('', [Validators.required]),
            // attackPattern: new FormControl(this.currentAttackPattern, [Validators.required]),
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

    /**
     * @description generate select options for assessing a capability
     * @return any[]
     */
    private generateCapabilityRiskSelectOptions(): SelectOption[] {
        return this.generateSelectOptions([
            'no coverage',
            'some coverage',
            'half coverage',
            'most critical systems covered',
            'all critical systems covered'
        ]);
    }

}
