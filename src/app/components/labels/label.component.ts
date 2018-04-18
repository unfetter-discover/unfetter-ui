import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';

@Component({
    selector: 'labels',
    templateUrl: './label.component.html'
})
export class LabelComponent {

    @Input() public model: any;

    public addLabelButtonClicked(): void {
        this.model.attributes.labels.unshift('');
    }

    public removeLabelButtonClicked(index: number): void {
        this.model.attributes.labels.splice(index, 1);
    }

    public update(index: number, value: string): void {
        this.model.attributes.labels[index] = value;
    }

    public trackByFn(index: number, _: any): number {
        return index;
    }
}
