import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'stix-text-array',
    templateUrl: './stix-text-array.component.html'
})
export class StixTextArrayComponent {

    @Input() public model: any;
    @Input() public propertyName: any;

    public addItemToArray(): void {
        if (!this.model.attributes[this.propertyName]) {
            this.model.attributes[this.propertyName] = [];
        }
        this.model.attributes[this.propertyName].unshift('');
    }

    public removeItemFromArray(index: number): void {
        this.model.attributes[this.propertyName].splice(index, 1);
    }

    public trackByIndex(index: number, obj: any): any {
        return index;
    }

    public makePlaceholder(prop: string) {
        let retVal = prop.replace(/e?s$/, '');
        retVal = retVal.replace(/\b([a-z])(\w+)/g, (_, g1, g2) => {
            let word = g1.concat(g2);
            if (word === 'and' || word === 'or' || word === 'the') {
                return word;
            }
            return g1.toUpperCase() + g2;
        });
        return retVal;
    }

}
