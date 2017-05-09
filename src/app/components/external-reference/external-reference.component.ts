import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { ExternalReference } from '../../models';

@Component({
  selector: 'external-reference',
  templateUrl: './external-reference.component.html'
})
export class ExternalReferenceComponent {

    @Input() public model: any;

     public addExternalReferenceButtonClicked(): void {
        let externalReference = new ExternalReference();
        externalReference.external_id = '' + Math.random();
        this.model.attributes.external_references.unshift(externalReference);
    }

    public removeExternalReferenceButtonClicked(externalReference: ExternalReference): void {
        this.model.attributes.external_references = this.model.attributes.external_references.filter((h) => h !== externalReference);
    }
}
