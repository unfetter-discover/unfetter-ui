import { Component, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constance } from '../../../utils/constance';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { StixTableDataSource } from './stix-table.datasource';

@Component({
    selector: 'stix-table',
    styleUrls: ['stix-table.component.scss'],
    templateUrl: 'stix-table.component.html'
})
export class StixTableComponent implements OnInit {

    @Input('stixData') public stixData: any[];
    @Output() public delete: EventEmitter<any> = new EventEmitter();
    @ViewChild('paginator') public paginator: MatPaginator;

    public dataSource: any;
    public displayedColumns: string[] = ['stix'];

    constructor(router: Router, route: ActivatedRoute) {}

    public ngOnInit() {
        this.dataSource = new StixTableDataSource(this.stixData, this.paginator);
    }

    public deletButtonClicked(stixElement) {
        this.delete.emit({
            id: stixElement.id,
            type: stixElement.type,
            attributes: stixElement
        });
    }

    public externalReferencesToolTipGen(externalReferences): string {
        return externalReferences
            .filter((er) => er.source_name !== undefined)
            .map((er) => er.source_name)
            .join(', ');
    }

}
