import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'readonly-content',
  templateUrl: './readonly-content.component.html'
})
export class ReadonlyContentComponent {

    @Input() public model: any;

     constructor() {
         console.log('Initial ReadonlyContentComponent');
    }
}
