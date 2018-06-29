
import { map, startWith } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
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

    public formCtrl: FormControl = new FormControl();
    public filteredOptions: Observable<string|string[]>;
    public selections: string;
    public options = [ ];
    public inputFieldValue;

    constructor(public baseComponentService: BaseComponentService) {
        this.filteredOptions = this.formCtrl.valueChanges
            .pipe(
                startWith(null),
                map((val) => val ? this.filter(val) : this.options.slice())
            );
    }

    public ngOnInit() {
        let url = 'api/' + this.searchUrl;
        this.baseComponentService.autoComplete(url)
            .subscribe(
                (data) => data.forEach((record) => this.options.push(record))
            );
    }

    /**
     * @param  {string} val
     * @returns string | string[]
     */
    public filter(val: string): string|string[] {
         return val ? this.options.filter((s) => new RegExp(`^${val}`, 'gi').test(s.attributes.name)) : this.options;
    }

    /**
     * @param  {string} option
     * @returns void
     */
    public onOptionChanged(option: string): void {
        this.optionChanged.emit(option);
        this.inputFieldValue = null;
    }

}
