import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseStixComponent } from '../base-stix.component';
import { StixService } from '../stix.service';
import { Relationship } from '../../models';

@Component({
  selector: 'relationships',
  template: `<page-header [pageTitle]='pageTitle'  [pageIcon]='pageIcon' [description]="description"></page-header>`,
})
export class RelationshipsComponent {
    private pageTitle = 'Relationships';
    private pageIcon = 'assets/icon/stix-icons/svg/relationship-b.svg';
    private description = 'One type of relationship is created to ' +
            'identify that a particular Course Of Action can mitigate a particular Attack Pattern.  Another type of relationship ' +
            'describes an Attack Pattern is used by an Intrusion Set.'
}
