import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import * as assessActions from '../../store/baseline.actions';
import * as assessReducers from '../../store/baseline.reducers';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'stix';
import { Subscription } from 'rxjs/Subscription';
import { SetCategorySteps } from '../../store/baseline.actions';

@Component({
  selector: 'unf-baseline-wizard-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, AfterViewInit, OnDestroy {    
  public static readonly DEFAULT_VALUE = undefined;
  
  public tempCategories: Category[] = [ CategoryComponent.DEFAULT_VALUE ];
  public categories: Category[];
  private subscriptions: Subscription[] = [];
    
  constructor(
    private wizardStore: Store<assessReducers.BaselineState>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    const catSub1$ = this.wizardStore
      .select('baseline')
      .pluck('categories')
      .distinctUntilChanged()
      .subscribe(
        (categories: Category[]) => this.categories = categories,
        (err) => console.log(err));

    const catSub2$ = this.wizardStore
      .select('baseline')
      .pluck('categorySteps')
      .distinctUntilChanged()
      .subscribe(
        (categorySteps: Category[]) => this.tempCategories = categorySteps,
        (err) => console.log(err));
  
    this.subscriptions.push(catSub1$, catSub2$);

    this.wizardStore.dispatch(new assessActions.FetchCategories());
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
    if (indexInList < 0 && option.value !== CategoryComponent.DEFAULT_VALUE) {
      this.tempCategories[index] = newCategoryName;
    } else {
      // TODO: error message to user here saying this category is already selected

      option.value = CategoryComponent.DEFAULT_VALUE;
    }

    // Update wizard store with current category selections
    this.wizardStore.dispatch(new SetCategorySteps(this.tempCategories));
  }

  /*
   * @description
   * @param option 
   * @param {string} category name - optional
   * @return {number}
   */
  public selectedCategory(option: any, index: number): Category {
    const selValue = this.tempCategories[index];
    if (selValue === undefined) {
      return CategoryComponent.DEFAULT_VALUE;
    } else {
      const selIndex = this.categories.findIndex(category => category.id === selValue.id);
      // console.log(`value is -` + JSON.stringify(selValue) + `- and index is ` + selIndex);
      return this.categories[selIndex];
    }
  }

  /**
   * @description Delete category from the list, with confirmation
   * @param {LastModifiedAssessment} baseline
   * @return {void}
   */
  public onDeleteCategory(option: any): void {
    const confirmed = this.confirmDelete(option.value);

    if (confirmed) {
      const index = this.tempCategories.indexOf(option.value);
      this.tempCategories.splice(index, 1); 

      // Update wizard store with current category selections
      this.wizardStore.dispatch(new SetCategorySteps(this.tempCategories));
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
    this.tempCategories.push(CategoryComponent.DEFAULT_VALUE);
  }


}
