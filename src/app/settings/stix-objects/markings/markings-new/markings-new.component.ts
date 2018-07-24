import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';

import { MarkingDefinition, Identity, Relationship } from '../../../../models';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';
import { Constance } from '../../../../utils/constance';

interface MarkingDefinitionType {
    label: string;
    value: string;
};

@Component({
    selector: 'markings-new',
    templateUrl: './markings-new.component.html',
    styleUrls: ['./markings-new.component.scss']
})
export class MarkingsNewComponent extends BaseStixComponent implements OnInit {

    public marking: MarkingDefinition = new MarkingDefinition();

    public markingDefinitionTypes: Array<MarkingDefinitionType> = [
        {label: 'CAPCO', value: 'capco'},
        {label: 'Rating', value: 'rating'},
        {label: 'TLP', value: 'tlp'},
        {label: 'Statement', value: 'statement'},
    ];
    public definitionTypeCtrl: FormControl = new FormControl();
    private definitionType: MarkingDefinitionType = { label: undefined, value: undefined };

    public identities: Identity[] = [];

    public newRelationships: Relationship[] = [];
    public savedRelationships: Relationship[] = [];
    public deletedRelationships: Relationship[] = [];

    constructor(
        stixService: StixService,
        route: ActivatedRoute,
        router: Router,
        dialog: MatDialog,
        location: Location,
        snackBar: MatSnackBar
    ) {
        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = Constance.MARKINGS_URL;
    }

    ngOnInit() {
        this.loadMarking();
        console.log('marking', this.marking);
    }

    private loadMarking(): void {
        const subscription =  super.get()
            .subscribe(
                (data) => this.marking = new MarkingDefinition(data),
                (error) => console.log('error ' + error),
                () => {
                    // prevent memory links
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                }
            );
    }

    public displayDefinitionType(definitionType): string | undefined {
        return definitionType ? definitionType.label : undefined;
    }

    /**
     * @param  {any} model (Any legacy STIX model)
     * @returns boolean
     * @description This is used to disable the save button in the CRUD pages
     */
    public invalidate(model: any): boolean {
        let invalid = super.invalidate(model);
        if (!this.definitionType || !this.definitionType.value) {
            this.validationErrorMessages.push('Definition type is required');
            invalid = true;
        } else {
            model.attributes.definition_type = this.definitionType.value;
        }
        return invalid;
    }

    public saveButtonClicked(): Observable<any> {
        return Observable.create(observer => {
            const subscription = super.save(this.marking)
                .subscribe(
                    (data) => {
                        observer.next(data);
                        observer.complete();
                    },
                    (error) => console.error(error),
                    () => {
                        // prevent memory links
                        if (subscription) {
                            subscription.unsubscribe();
                        }
                    }
                );
        });
    }

}
