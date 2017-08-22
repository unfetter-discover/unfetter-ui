import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentsSummaryService } from './assessments-summary.service';
import { Constance } from '../../utils/constance';
<<<<<<< 3785c6b885c1506af9e445b70d5c282404638dca
import { AssessmentsCalculationService } from './assessments-calculation.service';
import { SortHelper } from './sort-helper';
import { Risk } from './risk';
import { AverageRisk } from "./average-risk";
import { AttackPattern } from "../../models/attack-pattern";
=======
>>>>>>> issue #332 router for assessments summary page

@Component({
    selector: 'assessments-summary',
    templateUrl: './assessments-summary.component.html',
    styleUrls: ['./assessments-summary.component.css']
})
<<<<<<< 3785c6b885c1506af9e445b70d5c282404638dca
export class AssessmentsSummaryComponent implements OnInit {
    public assessedObjects: any;
    public summary: any;
    public id: string;
    public phaseNameGroups: any[];
    // public attackKillChains: any[];
    public model: any;
    public totalRiskValue: string;
    public riskLabelClass = 'label-info';
    public riskPerKillChain;
    public sortedRisks;
    public topNRisks = 3;
    public weakestAttackPatterns: AttackPattern[];

    /**
     *  Computed property that will return the option types for the assessments.  This is assuming
     *  each option type is similar.  Or, we just hardcode it?
     */
    public readonly riskLevel = 0.50;

    public readonly killChainDescription = [
            {
                kill_chain_name: 'mitre-attack',
                phase_name: 'collection',
                description: 'Collection consists of techniques used to identify and gather information, such as sensitive files, from a target network prior to exfiltration. This category also covers locations on a system or network where the adversary may look for information to exfiltrate.'
            },
            {
                kill_chain_name: 'mitre-attack',
                phase_name: 'persistence',
                // tslint:disable-next-line:max-line-length
                description: 'Persistence is any access, action, or configuration change to a system that gives an adversary a persistent presence on that system. Adversaries will often need to maintain access to systems through interruptions such as system restarts, loss of credentials, or other failures that would require a remote access tool to restart or alternate backdoor for them to regain access.'
            },
            {
                kill_chain_name: 'mitre-attack',
                phase_name: 'privilege-escalation',
                // tslint:disable-next-line:max-line-length
                description: 'Privilege escalation is the result of actions that allow an adversary to obtain a higher level of permissions on a system or network. Certain tools or actions require a higher level of privilege to work and are likely necessary at many points throughout an operation. Adversaries can enter a system with unprivileged access and must take advantage of a system weakness to obtain local administrator or SYSTEM privileges. A user account with administrator-like access can also be used. User accounts with permissions to access specific systems or perform specific functions necessary for adversaries to achieve their objective may also be considered an escalation of privilege.'
            },
            {
                kill_chain_name: 'mitre-attack',
                phase_name: 'defense-evasion',
                // tslint:disable-next-line:max-line-length
                description: 'Defense evasion consists of techniques an adversary may use to evade detection or avoid other defenses. Sometimes these actions are the same as or variations of techniques in other categories that have the added benefit of subverting a particular defense or mitigation. Defense evasion may be considered a set of attributes the adversary applies to all other phases of the operation.'
            },
            {
                kill_chain_name: 'mitre-attack',
                phase_name: 'credential-access',
                // tslint:disable-next-line:max-line-length
                description: `Credential access represents techniques resulting in access to or control over system, domain, or service credentials that are used within an enterprise environment. Adversaries will likely attempt to obtain legitimate credentials from users or administrator accounts (local system administrator or domain users with administrator access) to use within the network. 
                This allows the adversary to assume the identity of the account, with all of that account'"s" permissions "on" the "system" and network, "and" makes "it" harder "for" defenders "to" detect "the" adversary. With "sufficient" access "within" a network, "an" adversary "can" create "accounts" "for" later "use" within "the" environment.
                `
            },
            {
                kill_chain_name: 'mitre-attack',
                phase_name: 'discovery',
                // tslint:disable-next-line:max-line-length
                description: `Discovery consists of techniques that allow the adversary to gain knowledge about the system and internal network. When adversaries gain access to a new system, they must orient themselves to what they now have control of and what benefits operating from that system give to their current objective or overall goals during the intrusion. The operating system provides many native tools that aid in this post-compromise information-gathering phase.`
            },
            {
                'kill_chain_name': 'mitre-attack',
                'phase_name': 'lateral-movement',
                // tslint:disable-next-line:max-line-length
                'description': `Lateral movement consists of techniques that enable an adversary to access and control remote systems on a network and could, but does not necessarily, include execution of tools on remote systems. The lateral movement techniques could allow an adversary to gather information from a system without needing additional tools, such as a remote access tool. An adversary can use lateral movement for many purposes, including remote Execution of tools, pivoting to additional systems, access to specific information or files, access to additional credentials, or to cause an effect. The ability to remotely execute scripts or code can be a feature of adversary remote access tools, but adversaries may also reduce their tool footprint on the network by using legitimate credentials alongside inherent network and operating system functionality to remotely connect to systems.Movement across a network from one system to another may be necessary to achieve an adversary’s goals. Thus lateral movement, and the techniques that lateral movement relies on, are often very important to an adversary'"s" set "of" capabilities "and" part "of" a "broader" set "of" information "and" access "dependencies" that "the" adversary "takes" advantage "of" within "a" network. To "understand" intrinsic "security" dependencies, "it" is "important" to "know" the "relationships" between "accounts" and "access" privileges "across" all "systems" on "a" network'.1' Lateral 'movement' may 'not' always 'be' a 'requirement' 'for' 'an' 'adversary'. If 'an' adversary 'can' reach 'the' goal 'with' access 'to' the 'initial' system, 'then' additional 'movement' throughout 'a' network 'may' be 'unnecessary'.`
            },
            {
                kill_chain_name: 'mitre-attack',
                phase_name: 'execution',
                description: 'The execution tactic represents techniques that result in execution of adversary-controlled code on a local or remote system. This tactic is often used in conjunction with lateral movement to expand access to remote systems on a network.'
            },
            {
                kill_chain_name: 'mitre-attack',
                phase_name: 'exfiltration',
                description: 'Exfiltration refers to techniques and attributes that result or aid in the adversary removing files and information from a target network. This category also covers locations on a system or network where the adversary may look for information to exfiltrate.'
            },
            {
                'kill_chain_name': 'mitre-attack',
                'phase_name': 'command-and-control',
                // tslint:disable-next-line:max-line-length
                'description': `The command and control tactic represents how adversaries communicate with systems under their control within a target network. There are many ways an adversary can establish command and control with various levels of covertness, depending on system configuration and network topology. Due to the wide degree of variation available to the adversary at the network level, only the most common factors were used to describe the differences in command and control. There are still a great many specific techniques within the documented methods, largely due to how easy it is to define new protocols and use existing, legitimate protocols and network services for communication. 
                    The resulting breakdown should help convey the concept that detecting intrusion through command and control protocols without prior knowledge is a difficult proposition over the long term. Adversaries' 'main' constraints in network - level 'defense' avoidance 'are' testing 'and' deployment 'of' tools 'to' rapidly 'change' their protocols, 'awareness' of 'existing' defensive technologies, 'and' access 'to' legitimate 'Web' services that, 'when' used appropriately, 'make' their 'tools' difficult 'to' distinguish 'from' benign 'traffic'.'
                    `
            },
            {
                kill_chain_name: 'csc',
                phase_name: 'CSC1 Hardware Inventory',
                description: 'Actively manage (inventory, track, and correct) all software on the network so that only authorized software is installed and can execute, and that unauthorized and unmanaged software is found and prevented from installation or execution.'
            },
            {
                kill_chain_name: 'csc',
                phase_name: 'CSC2 Software Inventory',
                description: 'Actively manage (inventory, track, and correct) all software on the network so that only authorized software is installed and can execute, and that unauthorized and unmanaged software is found and prevented from installation or execution.'
            },
            {
                kill_chain_name: 'csc',
                phase_name: 'CSC3 Secure Configurations for Hardware and Software',
                // tslint:disable-next-line:max-line-length
                description: 'Establish, implement, and actively manage (track, report on, correct) the security configuration of laptops, servers, and workstations using a rigorous configuration management and change control process in order to prevent attackers from exploiting vulnerable services and settings.'
            },
            {
                kill_chain_name: 'csc',
                phase_name: 'CSC4 Vulnerability Assessment',
                description: 'Continuously acquire, assess, and take action on new information in order to identify vulnerabilities, remediate, and minimize the window of opportunity for attackers.'
            },

            {
                kill_chain_name: 'csc',
                phase_name: 'CSC5 Controlled Use of Administrative Privileges',
                description: 'The processes and tools used to track/control/prevent/correct the use, assignment, and configuration of administrative privileges on computers, networks, and applications.'
            },
            {
                kill_chain_name: 'csc',
                phase_name: 'CSC6 Audit Logs',
                description: 'Collect, manage, and analyze audit logs of events that could help detect, understand, or recover from an attack.'
            },
            {
                kill_chain_name: 'csc',
                phase_name: 'CSC7 Email and Browser Protections',
                description: 'Minimize the attack surface and the opportunities for attackers to manipulate human behavior though their interaction with web browsers and email systems.'
            },
            {
                kill_chain_name: 'csc',
                phase_name: 'CSC8 Malware Defense',
                description: 'Control the installation, spread, and execution of malicious code at multiple points in the enterprise, while optimizing the use of automation to enable rapid updating of defense, data gathering, and corrective action.'
            },
            {
                kill_chain_name: 'csc',
                phase_name: 'CSC9 Control of Network Ports',
                description: 'Manage (track/control/correct) the ongoing operational use of ports, protocols, and services on networked devices in order to minimize windows of vulnerability available to attackers.'
            },
            {
                kill_chain_name: 'csc',
                phase_name: 'CSC10 Data Recovery',
                description: 'The processes and tools used to properly back up critical information with a proven methodology for timely recovery of it.'
            },
            {
                kill_chain_name: 'sensors',
                phase_name: 'network',
                description: 'Network sensors do sensing on the network.'
            },
            {
                kill_chain_name: 'sensors',
                phase_name: 'host',
                description: 'host sensors sense host stuff.'
            }
    ];

    constructor(
        private assessmentsSummaryService: AssessmentsSummaryService,
        private assessmentsCalculationService: AssessmentsCalculationService,
=======

export class AssessmentsSummaryComponent implements OnInit {

    public summary: any;
    public id: string;

    constructor(
        private assessmentsSummaryService: AssessmentsSummaryService,
>>>>>>> issue #332 router for assessments summary page
        private route: ActivatedRoute
    ) {}

    public ngOnInit() {
<<<<<<< 3785c6b885c1506af9e445b70d5c282404638dca
        this.id = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : '';
        const getById$ = this.assessmentsSummaryService.getById(this.id).subscribe(
            (res) => {
                console.log(res);
                this.summary = res;
                const assessments = this.summary.attributes['assessment_objects'];
                if (assessments) {
                    const risk = this.assessmentsCalculationService.calculateRisk(assessments);
                    this.totalRiskValue = this.assessmentsCalculationService.formatRisk(risk);
                    this.riskLabelClass = risk > this.riskLevel ? 'label-warning' : 'label-default';
                }
            },
            (err) => console.log(err),
            () => getById$.unsubscribe()
        );

        const killChain$ = this.assessmentsSummaryService.getRiskPerKillChain(this.id).subscribe(
            (res) => {
                console.log(res);
                this.riskPerKillChain = res;
                const risks: Risk[] = this.retrieveAssessmentRisks(this.riskPerKillChain);
                this.sortedRisks = risks.sort(SortHelper.sortByRiskDesc());
                this.sortedRisks = this.sortedRisks.slice(0, this.topNRisks);
                this.sortedRisks.forEach((el) => {
                    const objects = el.objects || [];
                    el.objects = objects.sort(SortHelper.sortByRiskDesc());
                    el.objects = el.objects.slice(0, this.topNRisks);
                });
            },
            (err) => console.log(err),
            () => killChain$.unsubscribe());

        const attackPattern$ = this.assessmentsSummaryService.getRiskPerAttackPattern(this.id).subscribe(
            (res) => {
                console.log(res);
                const phases: AverageRisk[] = res.phases;
                const weakestPhaseId = phases.sort(SortHelper.sortByAvgRiskDesc())[0]._id || '';

                const attackPatternsByKillChain = res.attackPatternsByKillChain;
                const riskiestAttackPattern = attackPatternsByKillChain.find((el) => el._id === weakestPhaseId);

                if (!riskiestAttackPattern) {
                    console.error('did not find the riskiest attack pattern! attempting to move on...');
                    return;
                }

                console.log(riskiestAttackPattern);
                const attackPatterns = riskiestAttackPattern.attackPatterns;
                this.weakestAttackPatterns = attackPatterns.sort(SortHelper.sortBySophisticationLevelAsc()) || [];
                this.weakestAttackPatterns = this.weakestAttackPatterns.slice(0, 1);
            },
            (err) => console.log(err),
            () => attackPattern$.unsubscribe());
    }

    private calculateRisk(riskArr: Risk[]): string {
        const risk = this.assessmentsCalculationService.calculateRisk(riskArr);
        return this.assessmentsCalculationService.formatRisk(risk);
    }

    private retrieveAssessmentRisks(assessment): Risk[] {
        if (assessment.courseOfActions && assessment.courseOfActions.length > 0) {
            return assessment.courseOfActions;
        } else if (assessment.indicators && assessment.indicators.length > 0) {
            return assessment.indicators;
        } else if(assessment.sensors && assessment.sensors.length > 0) {
            return assessment.sensors;
        } else {
            console.error('could not find assessment type and thier risks!');
            return [];
        }
    }

    // public sortedPhaseGroups(): any[] {
    //     return this.phaseNameGroups.sort(
    //         (a, b) => {
    //             if (a.risk > b.risk){
    //                 return -1;
    //             } else if (a.risk < b.risk) {
    //                 return 1;
    //             }
    //             return 0;
    //         }
    //     );
    // }

    // public totalRiskValue() {
    //     const assessments = this.model.assessments;
    //     return this.calculateRisk(assessments);
    // }

    // public weakestKillChain() {
    //     const sortedPhaseNameGroups = this.sortedPhaseGroups
    //     const killChains = this.attackKillChains;
    //     const weakestKillChain: any= {};
    //     weakestKillChain.name = sortedPhaseNameGroups[0].phaseName;
    //     // We don't always have descriptions for kill chains
    //     const killChainObject = killChains.find((el) => el.name === weakestKillChain.name);
    //     if (killChainObject.description) {
    //         weakestKillChain.description = killChains.find((el) => el.name === weakestKillChain.name).description;
    //     } else {
    //         const killChainDescription = this.killChainDescription;
    //         const descriptionObject = killChainDescription.find((el) => el.phase_name === weakestKillChain.name);
    //         if (descriptionObject) {
    //               weakestKillChain.description = descriptionObject.description;
    //         } else {
    //         weakestKillChain.description = weakestKillChain.name;
    //         }
    //     }

    //     return weakestKillChain;
    // }

    // public attackKillChains() {
    //     const killChains = [];
    //     const assessedObjects = this.model.attackPatterns;
    //     assessedObjects.forEach(function(stixObject){
    //         let killChainPhases = stixObject.get('kill_chain_phases');
    //         if (!(killChainPhases)){
    //             const killChain: any = {};
    //             killChain.name = 'unknown';
    //             killChain.description = 'unknown';
    //             killChain.killChainName = 'unknown';
    //             killChains.push(killChain);
    //         } else {
    //             killChainPhases.forEach(function(killChainPhase){
    //                 const phaseName = killChainPhase.phase_name;
    //                 // tslint:disable-next-line:one-line
    //                 if (!(killChains.find((el) => el.name === phaseName)) {
    //                     let description = killChainPhase.description;
    //                     if (description === null){
    //                         description = phaseName;
    //                     }
    //                     const killChain: any = {};
    //                     killChain.name = phaseName;
    //                     killChain.description = description;
    //                     killChains.push(killChain);
    //                 }

    //             });
    //         }


    //     });
    //     return killChains;
    // }

    // killChains() { 
    //     // this.assessedObjects;
    //     const killChains = [];
    //     const assessedObjects = this.assessedObjects;
    //     assessedObjects.forEach(function(stixObject){
    //         let killChainPhases = stixObject.get('kill_chain_phases');
    //         if (!(killChainPhases)){
    //             let killChain: any = {};
    //             killChain.name = 'unknown';
    //             killChain.description = 'unknown';
    //             killChain.killChainName = 'unknown';
    //             killChains.push(killChain);
    //         } else {

    //             killChainPhases.forEach(function(killChainPhase){
    //                 let killChainName = killChainPhase.kill_chain_name;
    //                 let phaseName = killChainPhase.phase_name;
    //                 if (!(killChains.find((el) => el.name === phaseName))){
    //                     let description = killChainPhase.description;
    //                     if (description === null){
    //                         description = phaseName;
    //                     }
    //                     let killChain: any= {};
    //                     killChain.killChainName = killChainName;
    //                     killChain.name = phaseName;
    //                     killChain.description = description;
    //                     killChains.push(killChain);
    //                 }

    //             });
    //         }
    //     });
    //     return killChains;
    // }

    // public assessedCOAs() {
    //     return this.model.courseOfActions.filter((coa) => {
    //         let assessments = this.model.assessments;
    //         let objectIDs = assessments.mapBy('course_of_action_id');
    //         if (objectIDs.indexOf(coa.id) >= 0){
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     });
    // }

    // public assessedIndicators() {
    //     const self = this;
    //     return this.model.indicators.filter((indicator) => {
    //         let assessments = self.model.assessments;
    //         let objectIDs = assessments.mapBy('course_of_action_id');
    //         if (objectIDs.indexOf(indicator.id) >= 0) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     });
    // }

    // public assessedSensors() {
    //     const self = this;
    //     return this.model.sensors.filter((sensor) => {
    //         let assessments = self.model.assessments;
    //         let objectIDs = assessments.mapBy('course_of_action_id');
    //         if (objectIDs.indexOf(sensor.id) >= 0) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     });
    // }

    // public assessedObjects() {
    //     // const self = this;
    //     // this.model.coursesOfActions;', 'model.indicators', 'model.assessments', function(){
    //     // let assessedIndicators = this.get('assessedIndicators');
    //     // let assessedCOAs = this.get('assessedCOAs');
    //     // let assessedSensors = this.get('assessedSensors');
    //     // let mergedArrays = Ember.merge(assessedIndicators, assessedCOAs);
    //     // return Ember.merge(mergedArrays, assessedSensors);
    // }

/**
    sortedPhaseAssessments: Ember.computed.sort('phaseAssessments', function(a, b){
        if (a.risk > b.risk){
            return -1;
        } else if (a.risk < b.risk) {
            return 1;
        }
        return 0;
    }),



    phaseAssessments: Ember.computed('model.assessments', 'assessedObjects', function(){
        let assessments = this.get('model.assessments');
        let killChains = this.get('killChains');

        let phaseAssessmentGroup = [];
        let self = this;
        let assessedObjects = this.get('assessedObjects');

        killChains.forEach(function(killChain){
            const phaseName = killChain.name;
            let assessedGroup = {};
            // TODO - This isn't finding anything at all
            let phaseAssessedObjects = assessedObjects.filter(function(object){
                try {
                    if (object.get('kill_chain_phases').findBy(phase_name, phaseName)){
                    return true;
                    } else {
                        return false;
                    }
                } catch (err) {
                    return false;
                }
            });

            let phaseAssessments = assessments.filter(function(object){
                let coaID = object.get('course_of_action_id');
                if (phaseAssessedObjects.findBy('id', coaID)){
                    return true;
                } else {
                    return false;
                }
            });

            phaseAssessments.forEach(function(assessment){

                let assessedObject = phaseAssessedObjects.findBy('id', assessment.get('course_of_action_id'));

                if (assessedObject){
                    assessment.set('name', assessedObject.get('name'));
                    assessment.set(description, assessedObject.get(description));

                    // Calculate the risk and assign
                    Ember.set(assessment, 'risk', self.getRisk(Ember.get(assessment, 'measurements')));
                }
            });

            let sortedAssessments = phaseAssessments.sortBy('risk:desc');
            assessedGroup.phaseName = phaseName;
            assessedGroup.risk = self.calculateRisk(sortedAssessments);
            assessedGroup.assessments = sortedAssessments;
            phaseAssessmentGroup.pushObject(assessedGroup);
       });
       return phaseAssessmentGroup;
    }),


    riskName: Ember.computed('riskLevel', 'assessedOptions', function(){
        let riskLevel = Number(this.get('riskLevel'));
        let assessedOptions = this.get('assessedOptions');
        let foundAssessment = assessedOptions.findBy('risk', riskLevel);
        return foundAssessment.name;
    }),

//  * Assessment By Technique will determine which assessments, per phase, are below risk level of riskLevel
    assessmentsAboveRisk: Ember.computed('assessedOptions', 'phaseAssessments', 'riskLevel', function(){
        let phaseAssessments = this.get('phaseAssessments');
        let riskLevel = this.get('riskLevel');
        let assessmentsAboveRisk = [];
        phaseAssessments.forEach(function(phaseAssessment){
            let object = {};
            object.phaseName = phaseAssessment.phaseName;
            let assessments = phaseAssessment.assessments;
            let total = assessments.length;
            let count = 0;
            object.total = total;
            assessments.forEach(function(assessment){
                let risk = assessment.get('risk');
                if (risk <= riskLevel){
                    count = count + 1;
                }
            });
            object.count = count;
            object.percentAboveRisk = count / total;
            assessmentsAboveRisk.push(object);
        });
        return assessmentsAboveRisk;
    }),
 * assessmentAboveRiskChart Will display the values of techniques detectable per risk level
 * Object {phaseNames:[]},{values:[]},{annotates}
 * @module
undasherizeLabel(value) {
    let label = value;

    if (Ember.isPresent(value)) {
        const valueElements = value.split('-');
        const labelElements = [];
        valueElements.forEach(function(valueElement) {
            let labelElement = Ember.String.capitalize(valueElement);
            if (valueElement === 'and') {
                labelElements.push(valueElement);
            } else if (valueElement === 'or') {
                labelElements.push(valueElement);
            } else {
                labelElements.push(labelElement);
            }
            label = labelElements.join(' ');
        });
    }

    return label;
},
    riskChartXAxis: [0, 100],
    assessmentAboveRiskChart: Ember.computed('assessmentsAboveRisk', function(){
        let assessmentsAboveRisk = this.get('assessmentsAboveRisk');
        let object = {};
        let self = this;
        object.phaseNames = assessmentsAboveRisk.mapBy('phaseName');
        object.phaseNames.forEach(function(phaseName, index, theArray){
            theArray[index] = self.undasherizeLabel(phaseName);
        });

        object.values = assessmentsAboveRisk.mapBy('percentAboveRisk');
        object.values.forEach(function(value, index, theArray){
            theArray[index] = value * 100;
        });
        object.annotations = [];
        assessmentsAboveRisk.forEach(function(assessmentPhase){
            let annotation = assessmentPhase.count + ' out of ' + assessmentPhase.total;
            object.annotations.push(annotation);
        });
        return object;

    }),
//  assessedOptions Will build an array of options
    assessedOptions: Ember.computed('model.assessments', function(){
        let assessments = this.get('model.assessments');
        let measurements = assessments[0].get('measurements');
        let options = measurements[0].options;
        return options;
    }),


    attackSophisticationGraph: Ember.computed('attackSophisticationMaturity', function(){
        let detectionMaturity = this.get('attackSophisticationMaturity');
        let detectionMaturityGraph = {};
        detectionMaturityGraph.names = detectionMaturity.mapBy('name');
        detectionMaturityGraph.counts = detectionMaturity.mapBy('count');
        return detectionMaturityGraph;
    }),

    attackSophisticationMaturity: Ember.computed('model.attackPatterns', function(){
        let attackPatterns = this.get('model.attackPatterns');
        let detectionMaturity = [];
        let sophisticationName = this.get('sophisticationName');
        let sophisticationDescription = this.get('sophisticationDescription');


        sophisticationName.forEach(function(name, index){
            let object = {};
            object.name = name;
            object.description = sophisticationDescription[index];

            let arrayReduce = attackPatterns.filterBy('x_unfetter_sophistication_level', index);
            object.count = arrayReduce.length;
            detectionMaturity.push(object);
        });
        return detectionMaturity;

    }),
//  * assessmentPerSophisticationGraph Will build an array of objects that have the sophistication and assessment pairs
    sophisticationLevels : ['Novice', 'Practitioner', 'Expert', 'Innovator'],
    assessmentPerSophisticationGraph: Ember.computed('assessmentPerSophistication', 'riskLevel', function(){
        const assessmentPerSophistication = this.get('assessmentPerSophistication');
        let riskLevel = Number(this.get('riskLevel'));
        let groupObject = [];
        let sophisticationLevels = this.get('sophisticationLevels');
        sophisticationLevels.forEach(function(level){
            let object = {};
            object.total = 0;
            object.percent = 0;
            object.atRiskThreshold = 0;
            object.sophisticationName = level;
            groupObject.push(object);
        });
        assessmentPerSophistication.forEach(function(object){
            //The sophistication level has been seen
            let foundObject = groupObject.findBy('sophisticationName', object.sophisticationName);
            if (foundObject){
                foundObject.total = foundObject.total + 1;
                if (object.risk <= riskLevel){
                    foundObject.atRiskThreshold = foundObject.atRiskThreshold + 1;
                }
            } else {
                console.log('Found unknown sophistication level' + object.sophisticationName);
            }
        });
        groupObject.forEach(function(object){
            object.percent = (object.atRiskThreshold / object.total) * 100;
        });
        let assessmentPerSophisticationGraph = {};
        assessmentPerSophisticationGraph.totals = groupObject.mapBy('total');
        assessmentPerSophisticationGraph.atRiskThresholds = groupObject.mapBy('atRiskThreshold');
        assessmentPerSophisticationGraph.percents = groupObject.mapBy('percent');
        assessmentPerSophisticationGraph.sophisticationNames = groupObject.mapBy('sophisticationName');
        return assessmentPerSophisticationGraph;
    }),
//  * assessmentAtSophistication Will build an array of objects that have the sophistication and assessment pairs
    assessmentPerSophistication: Ember.computed('phaseNameGroups', function(){
       const phaseNameGroups = this.get('phaseNameGroups');
       let assessmentPerSophistication = [];

       phaseNameGroups.forEach(function(phaseNameGroup){
            let attackPatterns = phaseNameGroup.get('attackPatterns');
            attackPatterns.forEach(function(attackPattern){
                let measurements = attackPattern.get('measurements');
                if (measurements.length){
                    let object = {};
                    object.sophisticationName = attackPattern.get('sophisticationName');
                    object.sophisticationDescription = attackPattern.get('sophisticationDescription');
                    object.risk = attackPattern.get('risk');
                    assessmentPerSophistication.push(object);
                }
            });
       });
       return assessmentPerSophistication;
    }),
//  * attackPatternSophistication Will build an array of objects that have the sophistication regardless of sophistication
    attackPatternSophistication: Ember.computed('model.attackPatterns', function(){
       const attackPatterns = this.get('model.attackPatterns');
       let attackPatternSophistication = [];

       attackPatterns.forEach(function(attackPattern){
            let object = {};
            object.sophisticationName = attackPattern.get('sophisticationName');
            object.sophisticationDescription = attackPattern.get('sophisticationDescription');
            attackPatternSophistication.push(object);
            });

       return attackPatternSophistication;
    }),

    attackPatternSophisticationGraph: Ember.computed('attackPatternSophistication', 'riskLevel', function(){
        const attackPatternSophistication = this.get('attackPatternSophistication');
        let groupObject = [];
        let sophisticationLevels = this.get('sophisticationLevels');
        sophisticationLevels.forEach(function(level){
            let object = {};
            object.total = 0;
            object.percent = 0;
            object.sophisticationName = level;
            groupObject.push(object);
        });
        attackPatternSophistication.forEach(function(object){
            //The sophistication level has been seen
            let foundObject = groupObject.findBy('sophisticationName', object.sophisticationName);
            if (foundObject){
                foundObject.total = foundObject.total + 1;
            } else {
                console.log('Found unknown sophistication level' + object.sophisticationName);
            }
        });
        groupObject.forEach(function(object){
            object.percent = object.atRiskThreshold / object.total;
        });
        let assessmentPerSophisticationGraph = {};
        assessmentPerSophisticationGraph.totals = groupObject.mapBy('total');
        assessmentPerSophisticationGraph.sophisticationDescription = groupObject.mapBy('sophisticationDescription');
        assessmentPerSophisticationGraph.sophisticationNames = groupObject.mapBy('sophisticationName');
        return assessmentPerSophisticationGraph;
    }),

});
*/

=======
        // https://localhost/api/x-unfetter-assessments?id=%22x-unfetter-assessment--4adcb0ee-be04-4ac5-b863-aca49c2cd9f4xxx%22&sort=%7B%22stix.created%22:-1%7D
        this.id = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : '';
        const self = this;
        const subscription = this.assessmentsSummaryService.getById(this.id).subscribe(
            (res) => {
                console.log(res);
                // const assessments = res.data;
                // const assessment = assessments.find((el) => el.id === self.id);
                // if (!assessment) {
                    // console.error('Could not find assessement with id ', self.id);
                // }
                // this.summary = assessment ? assessment : {};
                this.summary = res ? res : {};
            },
            (err) => console.log(err),
            () => subscription.unsubscribe()
        );
    }

>>>>>>> issue #332 router for assessments summary page
}
