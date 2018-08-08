import { Component, OnInit, } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { BaseStixComponent } from '../../../base-stix.component';
import { StixService } from '../../../stix.service';
import { MarkingDefinition } from '../../../../models';
import { Constance } from '../../../../utils/constance';

@Component({
    selector: 'markings-list',
    templateUrl: './markings-list.component.html',
    styleUrls: ['./markings-list.component.scss']
})
export class MarkingsListComponent extends BaseStixComponent implements OnInit {

    public markings: MarkingDefinition[];

    public url: string;

    private definitionTypeOrder = ['capco', 'tlp', 'rating', 'statement'];
    private capcoOrder = ['Classification', 'Compartment', 'Access', 'Dissemination'];
    private tlpOrder = ['white', 'green', 'amber', 'red'];

    constructor(
            public stixService: StixService,
            public route: ActivatedRoute,
            public router: Router,
            public dialog: MatDialog,
            public location: Location,
            public snackBar: MatSnackBar) {
        super(stixService, route, router, dialog, location, snackBar);
        stixService.url = Constance.MARKINGS_URL;
        this.url = stixService.url;
    }

    public ngOnInit() {
        let filter = 'sort=' + encodeURIComponent(JSON.stringify({ 'stix.id': '1' }));
        let subscription = super.load(filter)
            .subscribe(
                (data: MarkingDefinition[]) => {
                    this.markings = data.sort((a, b) => this.sortMarkings(a, b));
                },
                (error) => {
                    // handle errors here
                    console.log('error ' + error);
                },
                () => {
                    // prevent memory links
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                }
            );
    }

    private sortMarkings(a: MarkingDefinition, b: MarkingDefinition) {
        const aType = this.definitionTypeOrder.indexOf(a.attributes.definition_type);
        const bType = this.definitionTypeOrder.indexOf(b.attributes.definition_type);
        const typeOrder = aType - bType;
        if (typeOrder !== 0) {
            return typeOrder;
        }
        if (a.attributes.definition_type === 'capco') {
            const aCat = this.capcoOrder.indexOf(a.attributes.definition.category);
            const bCat = this.capcoOrder.indexOf(b.attributes.definition.category);
            const catOrder = aCat - bCat;
            if (catOrder !== 0) {
                return catOrder;
            }
            const precedence = a.attributes.definition.precedence - b.attributes.definition.precedence;
            if (precedence !== 0) {
                return precedence;
            }
            return a.attributes.definition.text.localeCompare(b.attributes.definition.text);
        }
        if (a.attributes.definition_type === 'tlp') {
            return this.tlpOrder.indexOf(a.attributes.definition.tlp) -
                    this.tlpOrder.indexOf(b.attributes.definition.tlp);
        }
        if (a.attributes.definition_type === 'rating') {
            return a.attributes.definition.rating - b.attributes.definition.rating;
        }
        if (a.attributes.definition_type === 'statement') {
            return a.attributes.definition.statement.localeCompare(b.attributes.definition.statement);
        }
        return 0;
    }

}
