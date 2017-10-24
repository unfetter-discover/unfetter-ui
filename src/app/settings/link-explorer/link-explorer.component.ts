import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StixService } from '../stix.service';
import { Relationship, AttackPattern, Malware, CourseOfAction, IntrusionSet, Tool, Indicator, ObservedData } from '../../models';
import { Constance } from '../../utils/constance';

@Component({
    selector: 'link-explorer',
    templateUrl: 'link-explorer.component.html',
    styleUrls: [ 'link-explorer.component.scss' ]
})
export class LinkExplorerComponent implements OnInit {
    public checked = true;
    public graph: any;
    public selectedRecord: any;
    public forcesEnabled: any;
    public forcesEnabledTemp = { center: true, charge: true, collide: true, column: true, link: true };

    constructor(private service: StixService) { }

    public ngOnInit(): void {
        this.loadRelationships();
        this.forcesEnabled = this.naiveShallowCopy(this.forcesEnabledTemp);
    }

    public loadRelationships(): void {
        const parameters = { relationship_type: -1 };
        const url = Constance.RELATIONSHIPS_URL + '?sort=' + JSON.stringify(parameters);
        const sub = this.service.getByUrl( encodeURI(url) )
                        // TODO : remove the delay when finished testing
                        // .delay(2 * 1000)
                        .subscribe(
                            (data) => {
                                const relationships = data as Relationship[];
                                this.graph = {nodes: this.getNodes(relationships), links: this.getLinks(relationships)};
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

    public getNodes(relationships: Relationship[]) {
        let references = relationships.reduce((accumulation, relationship) => {
            const sourceRef = relationship.attributes.source_ref;
            const targetRef = relationship.attributes.target_ref;
            accumulation.push(sourceRef);
            accumulation.push(targetRef);
            return accumulation;
        }, []);

        const counts = {};
        references.forEach((reference) => {
            if (counts[reference]) {
                counts[reference] += 1;
            } else {
                counts[reference] = 10;
            }
        });

        let temp = {};
        let nodes = [];
        references.forEach(
            (reference) => {
                if (!temp[reference]) {
                    let n =  {
                        id: reference,
                        classNames: reference.split('--')[0],
                        radius: counts[reference],
                        collideRadius: counts[reference]
                    };
                    temp[reference] = n;
                    nodes.push(n);
                }
            }
        );
        return nodes;
    }

    public getLinks(relationships: Relationship[]): any {
        return relationships.map((relationship) => {
            return {
                id: relationship.id,
                source: relationship.attributes.source_ref,
                target: relationship.attributes.target_ref
            };
        }, this);
    }

    public nodeMouseover(node: any): void {
        let id = node.id;
        let modelName = id.split('--')[0];
        let o = null;
        switch ( modelName ) {
            case 'attack-pattern': {
                o = new AttackPattern();
                break;
            }
            case 'indicator': {
                o = new Indicator();
                break;
            }
            case 'course-of-action': {
                o = new CourseOfAction();
                break;
            }
            case 'malware': {
                o = new Malware();
                break;
            } case 'tool': {
                o = new Tool();
                break;
            }
            case 'intrusion-set': {
                o = new IntrusionSet();
                break;
            }
            default:  {
                o = new ObservedData();
            }
        }
        let url =  o.url + '/' + id;
        this.service.getByUrl(url).subscribe(
            (data) => {
                this.selectedRecord = data;
                this.selectedRecord.type = modelName;
            }
        );
    }

    public nodeMouseout(node: any): void {
        this.selectedRecord = null;
    }

    private onChange(event: any): void {
        this.selectedRecord = null;
        this.forcesEnabledTemp[event.source.name] = event.checked;
        this.forcesEnabled = this.naiveShallowCopy(this.forcesEnabledTemp);
    }

    private naiveShallowCopy(original: {} ): any {
        // First create an empty object
        // that will receive copies of properties
        let clone = {} ;
        Object.keys(original).forEach(
            (key: string) => {
                 clone[ key ] = original[ key ] ;
            }
        );
        return clone ;
    }
}
