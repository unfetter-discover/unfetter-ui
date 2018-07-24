
import { Component } from '@angular/core';
import { Constance } from '../../../utils/constance';

@Component({
    selector: 'markings-home',
    template: `<page-header [pageTitle]='pageTitle' [pageIcon]='pageIcon' [description]="description"></page-header>`,
})
export class MarkingsHomeComponent {

    public pageTitle = 'Marking Definitions';

    public pageIcon = Constance.MALWARE_ICON;

    public description = 'Sometimes when creating STIX objects it may be useful to provide guidance or permissions' +
        'on how those objects may be used.';

}
