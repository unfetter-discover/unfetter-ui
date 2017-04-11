import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Navigation } from '../models/navigation';
@Component({
  selector: 'attack-patterns',
  styleUrls: ['./attack-patterns.component.css'],
  templateUrl: './attack-patterns.component.html'
})
export class AttackPatternsComponent implements OnInit {

    constructor() {
        console.log('Initial AttackPatternsComponent');
    }
    public ngOnInit() {
        console.log('Initial AttackPatternsComponent');
    }

    public download(): void {
        alert('download clicked');
    }
}
