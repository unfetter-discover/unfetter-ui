import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseStixComponent } from '../base-stix.component';
import { StixService } from '../stix.service';
import { Relationship } from '../../models';

@Component({
  selector: 'relationships',
  templateUrl: './relationships.component.html'
})
export class RelationshipsComponent implements OnInit {
    private pageTitle = 'Relationships';
    private pageIcon = 'assets/icon/stix-icons/svg/relationship-b.svg';

    public ngOnInit() {
        console.log('Initial RelationshipsComponent');
    }
}
