import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdDialogConfig, MdSnackBar } from '@angular/material';
import { ToolComponent } from '../tool/tool.component';
import { StixService } from '../../../stix.service';
import { Tool, AttackPattern, Indicator, IntrusionSet, CourseOfAction, Filter, Relationship } from '../../../../models';
import { Constance } from '../../../../utils/constance';

@Component({
  selector: 'tool-edit',
  templateUrl: './tool-edit.component.html',
})
export class ToolEditComponent extends ToolComponent implements OnInit {

    protected attackPatterns: AttackPattern[] = [];
    protected indicators: Indicator[] = [];
    protected courseOfActions: CourseOfAction[] = [];
    protected intrusionSets: IntrusionSet[] = [];
    protected newRelationships: Relationship[] = [];
    protected savedRelationships: Relationship[] = [];
    protected deletedRelationships: Relationship[] = [];

   constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MdDialog,
        public location: Location,
        public snackBar: MdSnackBar) {
        super(stixService, route, router, dialog, location, snackBar);
    }

    public ngOnInit() {
       let sub = super.get().subscribe(
        (data) => {
            this.tool =  new Tool(data);
            this.loadRelationships({ 'stix.target_ref': this.tool.id });
            this.loadRelationships({ 'stix.source_ref': this.tool.id });
        }, (error) => {
                // handle errors here
                 console.log('error ' + error);
            }, () => {
                // prevent memory links
                if (sub) {
                    sub.unsubscribe();
                }
            }
      );
    }

    protected saveTool(): void {
         let sub = super.saveButtonClicked().subscribe(
            (data) => {
                this.newRelationships.forEach((relationship) => {
                    this.saveRelationship(relationship);
                });
                this.deletedRelationships.forEach((relationship) => {
                    this.deleteRelationship(relationship);
                });
            }, (error) => {
                // handle errors here
                 console.log('error ' + error);
            }, () => {
                // prevent memory links
                if (sub) {
                    sub.unsubscribe();
                }
            }
        );
    }

    protected saveRelationship(relationship: Relationship): void {
        relationship.url = Constance.RELATIONSHIPS_URL;
        let subscription = super.create(relationship).subscribe(
            (data) => {
                console.log('saved');
            }, (error) => {
                // handle errors here
                console.log('error ' + error);
            }, () => {
                // prevent memory links
                if (subscription) {
                    subscription.unsubscribe();
                }
            }
        );
    }

    protected deleteRelationship(relationship: Relationship): void {
        relationship.url = Constance.RELATIONSHIPS_URL;
        let subscription = super.delete(relationship).subscribe(
            (data) => {
                console.log('delected');
            }, (error) => {
                // handle errors here
                console.log('error ' + error);
            }, () => {
                // prevent memory links
                if (subscription) {
                    subscription.unsubscribe();
                }
            }
        );
    }

    protected loadRelationships(filter: any): void {
        let url = Constance.RELATIONSHIPS_URL + '?filter=' + JSON.stringify(filter);
        let sub =  super.getByUrl(url).subscribe(
        (data) => {
            this.savedRelationships = data as Relationship[];
            this.savedRelationships.forEach(
                (relationship) => {
                     if (filter['stix.source_ref']) {
                        this.loadStixObject(relationship.attributes.target_ref);
                    } else {
                        this.loadStixObject(relationship.attributes.source_ref);
                    }
                }
            );
            }, (error) => {
                // handle errors here
                console.log('error ' + error);
            }, () => {
                // prevent memory links
                if (sub) {
                    sub.unsubscribe();
                }
            }
        );
    }

     // add chip
    protected add(event: any): void {
        console.log(event.type);
        let relationship = new Relationship();
        this.newRelationships.push(relationship);
        relationship.attributes.source_ref = this.tool.id;

        if (event.type === Constance.ATTACK_PATTERN_TYPE && !this.found(this.attackPatterns, event)) {
            let attackPattern = new AttackPattern(event);
            relationship.attributes.relationship_type = 'uses';
            relationship.attributes.target_ref = attackPattern.id;

            this.attackPatterns.push(attackPattern);
        } else if (event.type === Constance.INTRUSION_SET_TYPE && !this.found(this.intrusionSets, event)) {
            let intrusionSet = new IntrusionSet(event);
            relationship.attributes.relationship_type = 'uses';
            relationship.attributes.target_ref = intrusionSet.id;

            this.intrusionSets.push(intrusionSet);
        } else if (event.type === Constance.INDICATOR_TYPE  && !this.found(this.indicators, event)) {
            let indicator = new Indicator(event);
            relationship.attributes.relationship_type = 'uses';
            relationship.attributes.target_ref = indicator.id;

            this.indicators.push(indicator);
        } else if (event.type === Constance.COURSE_OF_ACTION_TYPE  && !this.found(this.courseOfActions, event)) {
            let courseOfAction = new CourseOfAction(event);
            relationship.attributes.relationship_type = 'uses';
            relationship.attributes.target_ref = courseOfAction.id;

            this.courseOfActions.push(courseOfAction);
        }
    }

    // remove chip
    protected remove(object: any): void {
        if (object.type === Constance.ATTACK_PATTERN_TYPE) {
            this.attackPatterns = this.attackPatterns.filter((o) => o.id !== object.id);
        } else if (object.type === Constance.INTRUSION_SET_TYPE) {
            this.intrusionSets = this.intrusionSets.filter((o) => o.id !== object.id);
        } else if (event.type === Constance.INDICATOR_TYPE) {
            this.indicators = this.indicators.filter((o) => o.id !== object.id);
        } else if (event.type === Constance.COURSE_OF_ACTION_TYPE) {
            this.courseOfActions = this.courseOfActions.filter((o) => o.id !== object.id);
        }

        this.newRelationships = this.newRelationships.filter((relationship) => relationship.attributes.target_ref !== object.id );

        let foundSavedRelationship = this.savedRelationships.find((relationship) => relationship.attributes.target_ref !== object.id );
        if (foundSavedRelationship) {
            this.deletedRelationships.push(foundSavedRelationship);
        }
    }

    private found(list: any[], object: any): any {
        return list.find( (entry) => { return entry.id === object.id; } );
    }

    private loadStixObject(id: string): void {
        if (id.indexOf('indicator') >= 0) {
            this.loadObject(Constance.INDICATOR_URL, id, this.indicators);
        } else if (id.indexOf('attack-pattern') >= 0) {
            this.loadObject(Constance.ATTACK_PATTERN_URL, id, this.attackPatterns);
        } else if (id.indexOf('course-of-action') >= 0) {
            this.loadObject(Constance.COURSE_OF_ACTION_URL, id, this.courseOfActions);
        } else if (id.indexOf('intrusion-set') >= 0) {
            this.loadObject(Constance.INTRUSION_SET_URL, id, this.intrusionSets);
        }
    }

    private loadObject(url: string, id: string, list: any ): void {
        const uri = `${url}/${id}`;
        let sub = super.getByUrl(uri).subscribe(
            (data) => {
                list.push(data);
            }, (error) => {
                console.log(error);
            }, () => {
                if (sub) {
                    sub.unsubscribe();
                }
            }
        );
    }
}
