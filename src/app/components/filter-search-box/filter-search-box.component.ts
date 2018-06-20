
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Component, Input, Output, OnChanges, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

import { ExternalReference } from '../../models';

@Component({
    selector: 'filter-search-box',
    templateUrl: './filter-search-box.component.html'
})
export class FilterSearchBoxComponent implements OnInit {

    @Input() public items: any[];

    @Output() filterItemsChange = new EventEmitter<any[]>();

    private filterItems: any[];

    private searchTerms = new Subject<string>();

    public ngOnInit() {
        this.searchTerms.pipe(
            debounceTime(300),        // wait 300ms after each keystroke before considering the term
            distinctUntilChanged())
            .subscribe((term) => {
                if (term) {
                    this.filterItems = this.filter(term);
                } else {
                    this.filterItems = this.assignCopy();
                }
                this.filterItemsChange.emit(this.filterItems);
            });
        this.search(null);
    }

    public search(term: string): void {
        this.searchTerms.next(term);
    }

    private filter(term: string): any[] {
        return Object.assign([], this.items)
            .filter((item) => {
                let match = false;
                Object.keys(item.attributes).forEach((key) => {
                    if (!match) {
                        match = this.findMatch(item.attributes[key], term);
                    }
                });
                return match;
            });
    }

    private assignCopy(): any[] {
        return Object.assign([], this.items);
    }

    private findMatch(value: any, term: string): boolean {
        let match = false;
        if (value && typeof value === 'string') {
            match = value.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        } else if (value && typeof value === 'object') {
            if (Array.isArray(value)) {
                value.forEach(
                    (v) => {
                        if (!match) {
                            match = this.findMatch(v, term);
                        }
                    }
                );
            } else {
                Object.keys(value).forEach((key) => {
                    if (!match) {
                        match = this.findMatch(value[key], term);
                    }
                });
            }
        }
        return match;
    }
}
