
import { pluck, distinctUntilChanged } from 'rxjs/operators';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Category, Capability } from 'stix/assess/v3/baseline';
import * as assessActions from '../../store/baseline.actions';
import * as assessReducers from '../../store/baseline.reducers';

@Component({
  selector: 'unf-baseline-wizard-group',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, AfterViewInit, OnDestroy {    
  public static readonly DEFAULT_VALUE = undefined;
  
  public isAddCategory: boolean = false;
  public addCategory: Category = new Category();
  public selectedCategories: Category[] = [];
  public categories: Category[];
  private baselineCapabilities: Capability[];
  private subscriptions: Subscription[] = [];
    
  constructor(
    private wizardStore: Store<assessReducers.BaselineState>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    const catSub1$ = this.wizardStore
      .select('baseline').pipe(
      pluck('capabilityGroups'),
      distinctUntilChanged())
      .subscribe(
        (categories: Category[]) => this.categories = categories,
        (err) => console.log(err));

    const catSub2$ = this.wizardStore
      .select('baseline').pipe(
      pluck('baselineGroups'),
      distinctUntilChanged())
      .subscribe(
        (selectedCapabilityGroups: Category[]) => {
          this.selectedCategories = selectedCapabilityGroups;
        },
        (err) => console.log(err));
  
    const catSub3$ = this.wizardStore
      .select('baseline').pipe(
      pluck('baselineCapabilities'),
      distinctUntilChanged())
      .subscribe(
        (capabilities: Capability[]) => {
          this.baselineCapabilities = capabilities;
        },
        (err) => console.log(err));
    
    this.subscriptions.push(catSub1$, catSub2$, catSub3$);

    this.wizardStore.dispatch(new assessActions.FetchCapabilityGroups());
    this.wizardStore.dispatch(new assessActions.FinishedLoading(true));
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
   * @description Initialize variables to create a new category
   * @returns {void}
   */
  private createNewCategory(): void {
    this.isAddCategory = true;
    this.addCategory = new Category();
    this.addCategory.created_by_ref = this.categories[0].created_by_ref;
  }
  
  /*
   * @description Create a new category and add the category to the categories list
   * @returns {void}
   */
  private addNewCategory(): void {
    
    this.wizardStore.dispatch(new assessActions.AddCapabilityGroup(this.addCategory));
    
    this.isAddCategory = false;
    this.addCategory = new Category();
  }

  /*
   * @description Cancel creating a new category
   * @returns {void}
   */
  private cancelAddNewCategory(): void {
    this.isAddCategory = false;
    this.addCategory = new Category();
  }

  /*
   * @description Update name of category
   * @param option
   * @returns {void}
   */
  public updateCategory(option: any, index: number): void {
    const newCategory = option.selected.value;

    // If this is replacing a selected group, do a replace
    if (this.selectedCategories[index]) {
      // First remove the existing group
      const confirmed = this.confirmDelete(this.selectedCategories[index]);

      if (!confirmed) {
        return;
      }

      // Update wizard store with current category selections
      this.wizardStore.dispatch(new assessActions.RemoveCapabilityGroupFromBaseline(this.selectedCategories[index]));

      this.selectedCategories[index] = newCategory;
    } else {
      // Else, do an add
      this.selectedCategories.push(newCategory);
      option.value = CategoryComponent.DEFAULT_VALUE;
    }

    // Update wizard store with current category selections
    this.wizardStore.dispatch(new assessActions.SetBaselineGroups(this.selectedCategories));
  }

  /*
   * @description
   * @param option 
   * @param {string} category name - optional
   * @return {number}
   */
  public selectedCategory(option: any, index: number): Category {
    const selValue = this.selectedCategories[index];
    if (selValue === undefined) {
      return CategoryComponent.DEFAULT_VALUE;
    } else {
      const selIndex = this.categories.findIndex(category => category.id === selValue.id);
      return this.categories[selIndex];
    }
  }

  /**
   * @description Delete category and associated objects from the list, with confirmation
   * @param {LastModifiedAssessment} baseline
   * @return {void}
   */
  public onDeleteCategory(option: any): void {
    let catToDelete = option.value as Category;
    const confirmed = this.confirmDelete(catToDelete);

    if (confirmed) {
      // Update wizard store with current category selections
      this.wizardStore.dispatch(new assessActions.RemoveCapabilityGroupFromBaseline(catToDelete));
    }
  }

  /**
   * @description Confirm deletion of a category from the list
   * @param {string} category the category to remove
   * @param {UIEvent} optional event
   * @return {boolean} true to delete, false otherwise
   */
  public confirmDelete(category: Category, event?: UIEvent): boolean {
    // TODO: Add confirmation dialog

    return true;
  }

  public addCategoryEntry(): void {
    this.selectedCategories.push(CategoryComponent.DEFAULT_VALUE);
  }

  private shouldCategoryBeDisabled(category: Category) {
    return this.selectedCategories.findIndex((cat) => cat.id === category.id) !== -1;
  }

  public getCategoryDisabled(category: Category) {
    return (this.shouldCategoryBeDisabled(category) ? 'true' : 'false');
  }
}
