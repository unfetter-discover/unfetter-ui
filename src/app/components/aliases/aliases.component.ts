import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'aliases',
  templateUrl: './aliases.component.html'
})

export class AliasesComponent {

    @Input() public model: any;

    constructor() {
        console.log('Initial AliasesComponent');
    }

    public addAliasButtonClicked(): void {
        this.model.attributes.aliases.unshift('  ');
    }

    public removeAliasButtonClicked(alias: string): void {
        this.model.attributes.alias = this.model.attributes.alias.filter((h) => h !== alias);
    }
}
