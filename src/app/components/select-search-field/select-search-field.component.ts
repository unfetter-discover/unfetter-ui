import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'select-search-field',
  templateUrl: './select-search-field.component.html'
})
export class SelectSearchFieldComponent implements OnInit {
    @Input() public placeholder: string;
    @Input() public search: any;

    @Input() public labelField: string;

    private formCtrl: FormControl;
    private filtered: any;
    private selections: string;
    private states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    ];

    constructor() {
        console.log('Initial SelectSearchFieldComponent');
        this.formCtrl = new FormControl();
        this.filtered = this.formCtrl.valueChanges
            .startWith(null)
            .map((name) => this.filterStates(name));
    }
    public ngOnInit() {
        console.log('Initial SelectSearchFieldComponent');
    }

    private filterStates(val: string) {
        return val ? this.states.filter((s) => new RegExp(`^${val}`, 'gi').test(s))
               : this.states;
    }
    private filter(val: string) {
        // this.stixService.load().subscribe(
        //      (data) => {
        //         this.filtered = data.filter((s) => new RegExp(`^${val}`, 'gi').test(s));
        //     }
        // );

    }
}
