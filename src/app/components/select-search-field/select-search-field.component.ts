import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { Observable } from 'rxjs/Observable';
import { BaseComponentService } from '../base-service.component';

@Component({
  selector: 'select-search-field',
  templateUrl: './select-search-field.component.html'
})
export class SelectSearchFieldComponent implements OnInit {
    @Input() public placeholder: string;
    @Input() public searchUrl: any;
    @Input() public labelField: string;

    private formCtrl: FormControl  = new FormControl();
    private filteredOptions: Observable<string[]>;
    private selections: string;
    private options = [ ];

    constructor(public baseComponentService: BaseComponentService) {
        console.log('Initial SelectSearchFieldComponent');
        this.filteredOptions = this.formCtrl.valueChanges
            .startWith(null)
            .map((val) => val ? this.filter(val) : this.options.slice());
    }
    public ngOnInit() {
        let url = 'cti-stix-store-api/' + this.searchUrl;
        this.baseComponentService.autoCompelet(url).subscribe(
            (data) => {
                data.forEach(
                    (record) => {
                        this.options.push(record.attributes.name);
                    }
                );
            }
        );
    }

    private filter(val: string) {
         return val ? this.options.filter((s) => new RegExp(`^${val}`, 'gi').test(s))
               : this.options;
    }
}
