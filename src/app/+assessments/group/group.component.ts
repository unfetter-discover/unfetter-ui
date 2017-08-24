import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentsDashboardService } from '../assessments-dashboard/assessments-dashboard.service';
import { Constance } from '../../utils/constance';


@Component({
    selector: 'assessments-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class AssessmentsGroupComponent implements OnInit {

    private activePhase: String;
    private assessment: any;
    private riskByAttackPattern: any;
    private assessedObjects: any;
    private unassessedPhases: String[];
    private currentAttackPattern: any;
    private id: String = '';
    private displayedAssessedObjects: any[];
    private unassessedAttackPatterns: any[];
    private addAssessedObject: boolean;
    private addAssessedType: String;

    public indicator: any;
    public courseOfAction: any;
    public xUnfetterSensor: any;

    constructor(
        private assessmentsDashboardService: AssessmentsDashboardService,
        private route: ActivatedRoute,
    ) { }

    public ngOnInit() {
        this.resetNewAssessmentObjects();
        this.id = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : '';
        let routedPhase = this.route.snapshot.params['phase'] ? this.route.snapshot.params['phase'] : '';
        this.assessmentsDashboardService.getRiskByAttackPattern(this.id)
            .subscribe(
                (res) => {
                    this.riskByAttackPattern = res ? res : {};
                    this.populateUnassessedPhases();
                    this.activePhase = routedPhase ? routedPhase : this.riskByAttackPattern.phases[0]._id;
                    this.setAttackPattern(this.getScores(this.activePhase)[0].attackPatternId);
                },
                (err) => console.log(err)
            );

        this.assessmentsDashboardService.getAssessedObjects(this.id)
            .subscribe(
                (res) => {
                    this.assessedObjects = res ? res : {};
                },
                (err) => console.log(err)
            );

        this.assessment = {};
        this.assessment['attributes'] = {};
        this.assessmentsDashboardService.getById(this.id)
            .subscribe(
                (res) => {
                    this.assessment = res ? res : {};
                },
                (err) => console.log(err)
            );
    }

    resetNewAssessmentObjects() {
        this.addAssessedObject = false;
        this.addAssessedType = '';
        this.indicator = {
            type: 'indicator',
            name: '',
            description: '',
            pattern: '',
            questions: [],
        };
        this.courseOfAction = {
            type: 'course-of-action',
            name: '',
            description: '',
            questions: [],
        };
        this.xUnfetterSensor = {
            type: 'x-unfetter-sensor',
            name: '',
            description: '',
            questions: [],
        };   

        for(let stixType in Constance.MEASUREMENTS) {
            for (let question in Constance.MEASUREMENTS[stixType]) {
                switch(stixType) {
                case 'indicator':
                    this.indicator.questions.push({
                        name: question,
                        risk: 1,
                        options: this.getOptions(Constance.MEASUREMENTS[stixType][question]),
                        selected_value: {
                            name: Constance.MEASUREMENTS[stixType][question][0].name,
                            risk: 1,
                        }
                    });
                    break;
                case 'course-of-action':
                    this.courseOfAction.questions.push({
                        name: question,
                        risk: 1,
                        options: this.getOptions(Constance.MEASUREMENTS[stixType][question]),
                        selected_value: {
                            name: Constance.MEASUREMENTS[stixType][question][0].name,
                            risk: 1,
                        }
                    });
                    break;
                case 'x-unfetter-sensor':
                    this.xUnfetterSensor.questions.push({
                        name: question,
                        risk: 1,
                        options: this.getOptions(Constance.MEASUREMENTS[stixType][question]),
                        selected_value: {
                            name: Constance.MEASUREMENTS[stixType][question][0].name,
                            risk: 1,
                        }
                    });
                    break;
                }
            }
        }
    }

    public getOptions(options) {
        let retVal = [];
        options.forEach((label, index) => {
            let data: any = {};
            data.name = label;
            data.risk = 1 - (index / (options.length - 1));
            retVal.push(data);
        });
        return retVal;
    }

    public getNumAttackPatterns(phaseName) {
        let attackPatternsByKillChain = this.riskByAttackPattern.attackPatternsByKillChain;

        for (let killPhase of attackPatternsByKillChain) {
            if (killPhase._id === phaseName && killPhase.attackPatterns !== undefined) {
                return killPhase.attackPatterns.length;
            }
        }
        return 0;
    }

    public populateUnassessedPhases() {
        let assessedPhases = this.riskByAttackPattern.phases.map((phase) => phase._id);
        this.unassessedPhases = Constance.KILL_CHAIN_PHASES
            .filter((phase) => assessedPhases.indexOf(phase) < 0);
    }

    public setPhase(phaseName) {
        this.resetNewAssessmentObjects();
        this.activePhase = phaseName;
        this.getScores(this.activePhase).length > 0 ? this.setAttackPattern(this.getScores(this.activePhase)[0].attackPatternId) : '';
    }

    public getScores(phaseName) {        
        return this.riskByAttackPattern.phases.find((phase) => phase._id === phaseName) ? this.riskByAttackPattern.phases.find((phase) => phase._id === phaseName).scores : [];
    }

    public setAttackPattern(attackPatternId) {
        // Get attack pattern details
        this.resetNewAssessmentObjects();
        this.currentAttackPattern = this.riskByAttackPattern.attackPatternsByKillChain
            .find((killChain) => killChain._id === this.activePhase)
            .attackPatterns
            .find((attackPattern) => attackPattern.id === attackPatternId);

        // Get relationships for attack pattern, link to assessed objects
        this.assessmentsDashboardService.getAttackPatternRelationships(attackPatternId)
            .subscribe(
                res => {
                    let assessmentCanidates = res.map(relationship => relationship.attributes.source_ref);
                    this.displayedAssessedObjects = this.assessedObjects
                        .filter(assessedObj => assessmentCanidates.indexOf(assessedObj.stix.id) > -1)
                        .map(assessedObj => {
                            let retObj = assessedObj;
                            retObj.risk = this.getRisk(assessedObj.stix.id);
                            retObj.editActive = false;
                            retObj.questions = this.getQuestions(assessedObj.stix.id);
                            return retObj;
                        });                      
                },
                err => console.log(err)
            );

        // Get unassessed attack patterns
        let assessedAps = this.getScores(this.activePhase)
            .map(score => score.attackPatternId);
        
        let query = { 'stix.kill_chain_phases.phase_name': this.activePhase };
        this.assessmentsDashboardService.genericGet(`${Constance.ATTACK_PATTERN_URL}?filter=${encodeURI(JSON.stringify(query))}`)
            .subscribe(
                res => {
                    let dat: any = res;
                    this.unassessedAttackPatterns = dat
                        .filter(ap => !assessedAps.includes(ap.id));                                          
                },
                err => console.log(err)                
            );
    }

    public getStixIcon(stixType) {
        let convertedStixType = stixType.replace(/-/g, '_').toUpperCase().concat('_ICON');       
        if (Constance[convertedStixType] !== undefined) {
            return Constance[convertedStixType];
        } else {
            // Return error icon?
            return '';
        }    
    }

    public getRisk(id) {
        for (let assessment_object of this.assessment.attributes.assessment_objects) {
            if (assessment_object.stix.id === id) {
                return assessment_object.risk;                 
            }
        }  
    }

    public getQuestions(id) {
        for (let assessment_object of this.assessment.attributes.assessment_objects) {
            if (assessment_object.stix.id === id) {
                return assessment_object.questions;
            }
        }
    }

    public createAssessedObject(newAssessedObject, attackPattern) {

        // Update & save questions for assessment
        for (let i = 0; i < newAssessedObject.questions.length; i++) {
            newAssessedObject.questions[i].selected_value.risk = newAssessedObject.questions[i].risk;
            for (let option of newAssessedObject.questions[i].options) {
                if (option.risk === newAssessedObject.questions[i].risk) {
                    newAssessedObject.questions[i].selected_value.name = option.name;
                }
            }
        }
        let questions = newAssessedObject.questions;
        delete newAssessedObject.questions;
        
        let convertedObj: any = {};
        for (let prop in newAssessedObject) {
            if (newAssessedObject[prop]) {
                convertedObj[prop] = newAssessedObject[prop];
            }
        }  

        // Uploaded indicator, COA, or sensor
        this.assessmentsDashboardService.genericPost(`api/${convertedObj.type}s`, convertedObj)
            .subscribe(
                assessedRes => {
                    let newId = assessedRes[0].attributes.id;   
                    let createdObj = assessedRes[0].attributes;

                    // create relationship
                    let relationshipObj: any = {type:'relationship'};
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
                    this.assessmentsDashboardService.genericPost(Constance.RELATIONSHIPS_URL, relationshipObj)
                        .subscribe(
                            relationshipRes => {
                                console.log('Relationship uploaded successfully');                                
                            },
                            relationshipErr => console.log(relationshipErr)                            
                        );

                    // update assessment
                    let tempAssessmentObject: any = {};
                    tempAssessmentObject.questions = questions;
                    tempAssessmentObject.stix = {
                        id: newId,
                        type: convertedObj.type,
                        name: convertedObj.name,                       
                    };
                    if (convertedObj.description !== undefined) {
                        tempAssessmentObject.stix.description = convertedObj.description;
                    }
                    tempAssessmentObject.risk = questions
                        .map(question => question.risk)
                        .reduce((prev, cur) => prev += cur, 0)
                        / questions.length;                   

                    this.assessment.attributes.assessment_objects.push(tempAssessmentObject);
                    let assessmentToUpload: any = this.assessment.attributes;
                    assessmentToUpload.modified = new Date().toISOString();
                    console.log(assessmentToUpload);
                    this.assessmentsDashboardService.genericPatch(`${Constance.X_UNFETTER_ASSESSMENT_URL}/${this.assessment.id}`, assessmentToUpload)
                        .subscribe(
                            assessmentRes => {
                                console.log('Assessment updated successfully');
                                this.displayedAssessedObjects.push(tempAssessmentObject);
                                this.assessedObjects.push({ 'stix': createdObj});
                                this.resetNewAssessmentObjects();
                            },
                            assessmentErr => console.log(assessmentErr)
                        );                                       
                }, 
                assessedErr => console.log(assessedErr)                
            );             
    }

    editAssessedObject(assessedObj) {
        // Set new question value
        for (let i = 0; i < assessedObj.questions.length; i++) {
            assessedObj.questions[i].selected_value.risk = assessedObj.questions[i].risk;
            for (let option of assessedObj.questions[i].options) {
                if (option.risk === assessedObj.questions[i].risk) {
                    assessedObj.questions[i].selected_value.name = option.name;
                    break;
                }
            }
        }

        // Recalculate risk
        assessedObj.risk = assessedObj.questions
            .map(question => question.risk)
            .reduce((prev, cur) => prev += cur, 0)
            / assessedObj.questions.length;        
        
        for (let i = 0; i < this.assessment.attributes.assessment_objects.length; i++) {
            if (this.assessment.attributes.assessment_objects[i].stix.id === assessedObj.stix.id) {
                this.assessment.attributes.assessment_objects[i].risk = assessedObj.risk;
                this.assessment.attributes.assessment_objects[i].questions = assessedObj.questions;
                break;
            }
        }
        let objToPatch = this.assessment.attributes;
        objToPatch.modified = new Date().toISOString();
        console.log(objToPatch);
        this.assessmentsDashboardService.genericPatch(`${Constance.X_UNFETTER_ASSESSMENT_URL}/${this.assessment.id}`, objToPatch)
            .subscribe(
                assessmentRes => {
                    console.log('Assessment updated successfully');
                    this.resetNewAssessmentObjects();
                },
                assessmentErr => console.log(assessmentErr)
            );                                       
    }
}
