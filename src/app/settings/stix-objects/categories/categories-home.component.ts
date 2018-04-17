import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'categories-home',
  templateUrl: './categories-home.component.html',
  styleUrls: ['./categories-home.component.scss']
})
export class CategoriesHomeComponent implements OnInit {

  public pageTitle = 'Categories';
  public svgIcon = 'assets/icon/stix-icons/svg/all-defs.svg#tool';
  public description = 'A Category is used in assessments.  It represents a generic class of product.';

  constructor() { }

  ngOnInit() {
  }

}
