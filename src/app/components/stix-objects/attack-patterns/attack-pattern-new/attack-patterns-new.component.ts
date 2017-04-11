import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Navigation } from '../models/navigation';
@Component({
    selector: 'attack-pattern-new',
    styleUrls: ['./attack-pattern-new.component.css'],
    templateUrl: './attack-pattern-new.component.html'
})
export class AttackPatternNewComponent implements OnInit {

    constructor() {
        console.log('Initial AttackPatternNewComponent');
    }
    public ngOnInit() {
        console.log('Initial AttackPatternNewComponent');
    }
}
