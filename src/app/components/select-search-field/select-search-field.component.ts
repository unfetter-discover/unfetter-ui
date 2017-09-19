import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    @Output() public optionChanged: EventEmitter<any> = new EventEmitter();

    public formCtrl: FormControl  = new FormControl();
    public filteredOptions: Observable<string[]>;
    public selections: string;
    public options = [ ];
    public inputFieldValue;

    constructor(public baseComponentService: BaseComponentService) {
        this.filteredOptions = this.formCtrl.valueChanges
            .startWith(null)
            .map((val) => val ? this.filter(val) : this.options.slice());
    }
    public ngOnInit() {
        let url = 'api/' + this.searchUrl;
        this.baseComponentService.autoCompelet(url).subscribe(
            (data) => {
                data.forEach(
                    (record) => {
                        this.options.push(record);
                    }
                );
            }
        );
    }

    public filter(val: string) {
         return val ? this.options.filter((s) => new RegExp(`^${val}`, 'gi').test(s.attributes.name))
               : this.options;
    }

    public onOptionChanged(option: string): void {
        this.optionChanged.emit(option);
        this.inputFieldValue = null;
    }
}
