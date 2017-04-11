import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Navigation } from '../models/navigation';
@Component({
  selector: 'relationships',
  styleUrls: ['./relationships.component.css'],
  templateUrl: './relationships.component.html'
})
export class RelationshipsComponent implements OnInit {

    constructor() {
        console.log('Initial RelationshipsComponent');
    }
    public ngOnInit() {
        console.log('Initial RelationshipsComponent');
    }
}
