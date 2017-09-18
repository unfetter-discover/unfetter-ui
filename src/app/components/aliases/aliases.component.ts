import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'aliases',
  templateUrl: './aliases.component.html'
})

export class AliasesComponent {

    @Input() public model: any;

    constructor() {}

    public addAliasButtonClicked(): void {
        this.model.attributes.aliases.unshift('  ');
    }

    public removeAliasButtonClicked(alias: string): void {
        this.model.attributes.aliases = this.model.attributes.aliases.filter((h) => h !== alias);
    }

     public update(index: number, value: string): void {
        this.model.attributes.aliases[index] = value;
    }
}
