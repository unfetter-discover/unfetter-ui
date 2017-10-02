import { Component, Input, Output, OnChanges, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/startWith';
import { ExternalReference } from '../../models';

@Component({
    selector: 'filter-search-box',
    templateUrl: './filter-search-box.component.html'
})

export class FilterSearchBoxComponent implements OnInit {
    @Input() public items: any[];
    @Output() private filterItemsChange = new EventEmitter<any[]>();
    private filterItems: any[];
    private searchTerms = new Subject<string>();

    public ngOnInit() {
        this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()
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
                let matach = false;
                Object.keys(item.attributes).forEach((key) => {
                    if (!matach) {
                        matach = this.findMatach(item.attributes[key], term);
                    }
                });
                return matach;
            });
    }

    private assignCopy(): any[] {
        return Object.assign([], this.items);
    }

    private findMatach(value: any, term: string): boolean {
        let matach = false;
        if (value && typeof value === 'string') {
            matach = value.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        } else if (value && typeof value === 'object') {
            if (Array.isArray(value)) {
                value.forEach(
                    (v) => {
                        if (!matach) {
                            matach = this.findMatach(v, term);
                        }
                    }
                );
            } else {
                Object.keys(value).forEach((key) => {
                    if (!matach) {
                        matach = this.findMatach(value[key], term);
                    }
                });
            }
        }
        return matach;
    }
}
