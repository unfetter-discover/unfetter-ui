import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import * as assessActions from '../../store/assess.actions';
import * as assessReducers from '../../store/assess.reducers';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'stix';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'unf-assess3-wizard-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, AfterViewInit, OnDestroy {    
  public readonly defaultValue = undefined;
  public tempCategories: Category[] = [ this.defaultValue ];
  public categories: Category[];
  // public categories: string[] = [ 'Generic AV', 'Standard EDR', 'Network Analysis', 'Network Firewall', 'sysmon', 'Autoruns', 'Enterprise SIEM' ];

  private subscriptions: Subscription[] = [];
    
  constructor(
    private wizardStore: Store<assessReducers.AssessState>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const sub1$ = this.wizardStore
      .select('categories')
      .distinctUntilChanged()
      .subscribe(
        (categories: Category[]) => this.categories = categories,
        (err) => console.log(err));

    this.subscriptions.push(sub1$);
  }

  ngAfterViewInit() {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    
  }

  ngOnDestroy(): void {
   this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * @description
   * @param index
   * @param item
   * @returns {number}
   */
  public trackByFn(index, item) {
    return ((item !== undefined) ? item.id : item) || index;
  }

  /*
   * @description Update name of category
   * @param option
   * @returns {void}
   */
  public updateCategory(option: any, index: number): void {
    const newCategoryName = option.selected.value;

    // Verify a selection and that this category doesn't already exist
    const indexInList = this.tempCategories.indexOf(newCategoryName);
    if (indexInList < 0 && option.value !== this.defaultValue) {
      this.tempCategories[index] = newCategoryName;
    } else {
      // TODO: error message to user here saying this category is already selected

      option.value = this.defaultValue;
    }
  }

  /*
   * @description
   * @param option 
   * @param {string} category name - optional
   * @return {number}
   */
  public selectedCategory(option: any, tempCategory?: Category): number {
    if (this.tempCategories) {
      const index = this.tempCategories.indexOf(tempCategory);
      const retVal = (index >= 0) ? this.categories.indexOf(tempCategory) : this.defaultValue;
      return retVal;
    } else {
      return this.defaultValue;
    }
  }

  /**
   * @description Delete category from the list, with confirmation
   * @param {LastModifiedAssessment} assessment
   * @return {void}
   */
  public onDeleteCategory(option: any): void {
    const confirmed = this.confirmDelete(option.value);

    if (confirmed) {
      const index = this.tempCategories.indexOf(option.value);
      this.tempCategories.splice(index, 1); 
    }
  }

  /**
   * @description Confirm deletion of a category from the list
   * @param {string} category the name of the category to remove
   * @param {UIEvent} optional event
   * @return {boolean} true to delete, false otherwise
   */
  public confirmDelete(category: string, event?: UIEvent): boolean {
    // TODO: Add confirmation dialog

    return true;
  }

  public addCategoryEntry(): void {
    this.tempCategories.push(this.defaultValue);
  }


}
