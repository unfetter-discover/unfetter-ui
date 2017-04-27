import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { ExternalReference } from '../../models';

@Component({
  selector: 'external-reference',
  templateUrl: './external-reference.component.html'
})
export class ExternalReferenceComponent implements OnInit {

    @Input() public model: any;

     constructor() {
        console.log('Initial ExternalReferenceComponent');
    }
    public ngOnInit() {
        console.log('Initial ExternalReferenceComponent');
    }

     public addExternalReferenceButtonClicked(): void {
        let externalReference = new ExternalReference();
        externalReference.externalId = '' + Math.random();
        externalReference.sourceName = 'source';
        externalReference.url = 'some@mail.com';
        this.model.attributes.external_references.unshift(externalReference);
    }

    public removeExternalReferenceButtonClicked(externalReference: ExternalReference): void {
        this.model.attributes.external_references = this.model.attributes.external_references.filter((h) => h !== externalReference);
    }
}
