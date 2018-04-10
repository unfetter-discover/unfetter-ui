import { Component, Input, Output, OnChanges, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'buttons-filter',
  templateUrl: './buttons-filter.component.html'
})
export class ButtonsFilterComponent {

    @Input() public model: any[];

    @Input() public filteredItems: any[];

    @Input() public showGrid = false;

    @Output() public filterItemsChange = new EventEmitter<any[]>();

    public onFilterItemsChange(filterItems: any[]): void {
        this.filterItemsChange.emit(filterItems);
    }

    public download(): void {
        alert('not implemented');
    }

}
