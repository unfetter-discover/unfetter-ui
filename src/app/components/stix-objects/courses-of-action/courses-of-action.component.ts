import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Navigation } from '../models/navigation';
@Component({
  selector: 'courses-of-action',
  styleUrls: ['./courses-of-action.component.css'],
  templateUrl: './courses-of-action.component.html'
})
export class CoursesOfActionComponent implements OnInit {

    constructor() {
        console.log('Initial CoursesOfActionComponent');
    }
    public ngOnInit() {
        console.log('Initial CoursesOfActionComponent');
    }
}
