
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'identity-home',
  template: `<page-header [pageTitle]='pageTitle'  [pageIcon]='pageIcon' [description]='description'></page-header>`,
})
export class IdentityHomeComponent {

    public pageTitle = 'Identity';
    public pageIcon = 'assets/icon/stix-icons/svg/identity-b.svg';
    public description = 'An identity can represent actual individuals, organizaitons or groups as well as classes of individuals, organizations or groups.';

}
