import { Component, OnInit, Input } from '@angular/core';

import { ThreatBoard } from 'stix/unfetter/index';

@Component({
    selector: 'contributor-list',
    templateUrl: './contributor-list.component.html',
    styleUrls: ['./contributor-list.component.scss']
})
export class ContributorListComponent implements OnInit {

    @Input() public threatBoard: ThreatBoard;

    constructor() {}

    ngOnInit() {
    }

}
