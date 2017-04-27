
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'indicator-pattern-field',
  templateUrl: './indicator-pattern-field.html'
})
export class IndicatorPatternFieldComponent implements OnInit {

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
    public indicators: any[];

    constructor() {
        console.log('Initial PageHeaderComponent');
    }
    public ngOnInit() {
        console.log('Initial PageHeaderComponent');
    }
}
