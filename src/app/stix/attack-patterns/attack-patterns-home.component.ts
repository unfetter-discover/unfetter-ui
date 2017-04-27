import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseStixComponent } from '../../base-stix.component';
import { AttackPattern } from '../../../models';
import { AttackPatternsService } from './attack-patterns.service';

@Component({
    selector: 'attack-patterns-home',
    templateUrl: './attack-patterns-home.component.html',
    // providers: [ AttackPatternsService ]
})
export class AttackPatternsHomeComponent {
    private pageTitle = 'Attack Pattern';
    private pageIcon = 'assets/icon/stix-icons/svg/attack-pattern-b.svg';

    constructor(private attackPatternsService: AttackPatternsService) {
        console.log('Initial AttackPatternsComponent');
    }
}
