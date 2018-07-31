import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';

import { MarkingDefinition } from '../../../../models';
import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';
import { Constance } from '../../../../utils/constance';

interface MarkingDefinitionType {
    label: string;
    value: string;
};

interface TLPMarkingDefinition {
    tlp: 'white' | 'green' | 'amber' | 'red';
}
interface StatementMarkingDefinition {
    statement: string;
}
interface RatingMarkingDefinition {
    rating: number;
    label: string;
}
interface CAPCOMarkingDefinition {
    category: 'Classification' | 'Compartment' | 'Access' | 'Dissemination'
    precedence: number;
    portion: string;
    text: string;
}

@Component({
    selector: 'markings-new',
    templateUrl: './markings-new.component.html',
    styleUrls: ['./markings-new.component.scss']
})
export class MarkingsNewComponent extends BaseStixComponent implements OnInit {

    public marking: MarkingDefinition = new MarkingDefinition();

    public readonly markingDefinitionTypes: Array<MarkingDefinitionType> = [
        {label: 'CAPCO', value: 'capco'},
        {label: 'Rating', value: 'rating'},
        {label: 'TLP', value: 'tlp'},
        {label: 'Statement', value: 'statement'},
    ];
    public readonly definitionTypeCtrl: FormControl = new FormControl();
    public definitionType: MarkingDefinitionType = { label: undefined, value: undefined };

    public readonly TLPValues: Array<string> = [
        'white',
        'green',
        'amber',
        'red'
    ];
    public readonly tlpCtrl: FormControl = new FormControl();
    private tlpValue: TLPMarkingDefinition = {tlp: undefined};

    public statement: StatementMarkingDefinition = {statement: undefined};

    public rating: RatingMarkingDefinition = {
        rating: undefined,
        label: undefined
    };

    public readonly CategoryValues: Array<string> = [
        'Classification',
        'Compartment',
        'Access',
        'Dissemination'
    ];
    public readonly categoryCtrl: FormControl = new FormControl();
    public capco: CAPCOMarkingDefinition = {
        category: undefined,
        precedence: 0,
        portion: undefined,
        text: undefined
    };

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
            switch (this.definitionType.value) {
                case 'tlp':
                    invalid = this.invalidateTLP(model) || invalid;
                    break;
                case 'statement':
                    invalid = this.invalidateStatement(model) || invalid;
                    break;
                case 'rating':
                    invalid = this.invalidateRating(model) || invalid;
                    break;
                case 'capco':
                    invalid = this.invalidateCAPCO(model) || invalid;
                    break;
            }
        }
        return invalid;
    }

    private invalidateTLP(model: any): boolean {
        let invalid = false;
        if (!this.tlpValue.tlp) {
            this.validationErrorMessages.push('You must select a TLP Value');
            return true;
        } else {
            model.attributes.definition = this.tlpValue;
        }
        return invalid;
    }

    private invalidateStatement(model: any): boolean {
        let invalid = false;
        if (!this.statement.statement || !this.statement.statement.trim()) {
            this.validationErrorMessages.push('You must provide a statement');
            invalid = true;
        } else {
            model.attributes.definition = this.statement;
        }
        return invalid;
    }

    private invalidateRating(model: any): boolean {
        let invalid = false;
        if (this.rating.rating === undefined) {
            this.validationErrorMessages.push('You must provide a rating value');
            invalid = true;
        } else if (this.rating.rating < 0) {
            this.validationErrorMessages.push('The rating must be a non-negative integer');
            invalid = true;
        } else if (!Number.isInteger(this.rating.rating)) {
            this.validationErrorMessages.push('The rating must be an integer');
            invalid = true;
        }
        if (!this.rating.label) {
            this.validationErrorMessages.push('You must provide a rating label');
            invalid = true;
        }
        if (!invalid) {
            model.attributes.definition = this.rating;
        }
        return invalid;
    }

    private invalidateCAPCO(model: any): boolean {
        let invalid = false;
        if (!this.capco.category) {
            this.validationErrorMessages.push('You need to select a CAPCO category');
            invalid = true;
        }
        if (this.capco.precedence === undefined) {
            this.validationErrorMessages.push('You must provide a precedence value');
            invalid = true;
        } else if (this.capco.precedence < 0) {
            this.validationErrorMessages.push('The precedence must be a non-negative integer');
            invalid = true;
        } else if (!Number.isInteger(this.capco.precedence)) {
            this.validationErrorMessages.push('The precedence must be an integer');
            invalid = true;
        }
        if (!this.capco.portion || !this.capco.portion.trim()) {
            this.validationErrorMessages.push('You must provide a portion marking');
            invalid = true;
        }
        if (!this.capco.text || !this.capco.text.trim()) {
            this.validationErrorMessages.push('You must provide the full syntax of the marking');
            invalid = true;
        }
        if (!invalid) {
            this.capco.portion = this.capco.portion.toLocaleUpperCase();
            this.capco.text = this.capco.text.toLocaleUpperCase();
            model.attributes.definition = this.capco;
        }
        return invalid;
    }

    public saveButtonClicked(): Observable<any> {
        const observable = super.create(this.marking);
        const sub = observable
            .subscribe(
                data => this.location.back(),
                error => {
                    // handle errors here
                    console.log('error', error);
                },
                () => {
                    // prevent memory links
                    if (sub) {
                        sub.unsubscribe();
                    }
                }
            );
        return observable;
    }

}
