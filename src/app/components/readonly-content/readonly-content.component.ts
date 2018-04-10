import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'readonly-content',
    templateUrl: './readonly-content.component.html'
})
export class ReadonlyContentComponent {

    @Input() public model: any;

    constructor() { }

}
