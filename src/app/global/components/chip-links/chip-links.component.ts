import { Component, Input } from '@angular/core';

@Component({
    selector: 'chip-links',
    templateUrl: 'chip-links.component.html',
    styleUrls: ['chip-links.component.scss']
})

export class ChipLinksComponent {

    @Input() public data: any[];
    @Input() public maxChips: number = 10;
    @Input() public nameField: string;
    @Input() public urlField: string;
    @Input() public chipColor: string = 'default';

    constructor() { }

    public navigate(url) {
        window.open(url);
    }

    public toolTipGen(externalReferences): string {
        return externalReferences
            .filter((er) => er.source_name !== undefined)
            .map((er) => er.source_name)
            .join(', ');
    }
}
