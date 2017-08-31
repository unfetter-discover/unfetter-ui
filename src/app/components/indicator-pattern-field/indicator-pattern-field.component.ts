
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'indicator-pattern-field',
  templateUrl: './indicator-pattern-field.html'
})
export class IndicatorPatternFieldComponent {
    public objectTypes = [
        {label: 'domain-name'},
        {label: 'email-addr'},
        {label: 'file'},
        {label: 'ipv4-addr'},
        {label: 'ipv6-addr'},
        {label: 'mac-addr'},
        {label: 'url'}
    ];

     public objectProperties = [
        {label: 'hashes.MD5'},
        {label: 'hashes.SHA-256'},
        {label: 'name'},
        {label: 'value'}];

    public selectedObjectType: string;
    public selectedObjectProperty: string;
    public selectedObjectValue: string;
    public indicators = [];
    private disabled = true;

    private onInputChange(): void {
        if (this.selectedObjectType && this.selectedObjectProperty, this.selectedObjectValue ) {
            this.disabled = false;
        }
    }

    private add(): void {
        let pattern = `[${this.selectedObjectType}:${this.selectedObjectProperty} = '${this.selectedObjectValue}']`;
        let indicator = { name: pattern,   pattern };
        this.indicators.push(indicator);
        this.clearFields();
    }

    private remove(indicator: any): void {
        this.indicators = this.indicators.filter((i) => i.pattern !== indicator.pattern);
    }

    private clearFields() {
        this.selectedObjectType = null;
        this.selectedObjectProperty = null;
        this.selectedObjectValue = null;
        this.disabled = true;
    }
}
