
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'identity-home',
  template: `<page-header [pageTitle]='pageTitle'  [pageIcon]='pageIcon' [description]='description'></page-header>`,
})
export class IdentityHomeComponent {

    private pageTitle = 'Identity';
    private pageIcon = 'assets/icon/stix-icons/svg/identity-b.svg';
    private description = 'An identity can represent actual individuals, organizaitons or groups as well as classes of individuals, organizations or groups.';

}
