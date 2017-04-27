import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Navigation } from '../models/navigation';
@Component({
  selector: 'indentities',
  styleUrls: ['./indentities.component.css'],
  templateUrl: './indentities.component.html'
})
export class IndentitiesComponent implements OnInit {

    constructor() {
        console.log('Initial IndentitiesComponent');
    }
    public ngOnInit() {
        console.log('Initial IndentitiesComponent');
    }
}
