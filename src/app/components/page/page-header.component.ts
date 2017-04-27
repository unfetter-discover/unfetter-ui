import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent implements OnInit {

     @Input() public pageTitle: string;
     @Input() public pageIcon: string;

    constructor() {
        console.log('Initial PageHeaderComponent');
    }
    public ngOnInit() {
        console.log('Initial PageHeaderComponent');
    }
}
