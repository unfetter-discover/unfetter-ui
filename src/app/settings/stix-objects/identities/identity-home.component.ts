
import { Component } from '@angular/core';
import { Constance } from '../../../utils/constance';

@Component({
  selector: 'identity-home',
  template: `<page-header [pageTitle]='pageTitle'  [pageIcon]='pageIcon' [description]='description'></page-header>`,
})
export class IdentityHomeComponent {

    public pageTitle = 'Identity';
    public pageIcon = Constance.IDENTITY_ICON;
    public description = 'An identity can represent actual individuals, organizaitons or groups as well as classes of individuals, organizations or groups.';

}
