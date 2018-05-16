import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Category, Capability } from 'stix/assess/v3/baseline';
import * as assessActions from '../../store/baseline.actions';
import { SetBaselineGroups } from '../../store/baseline.actions';
import * as assessReducers from '../../store/baseline.reducers';

@Component({
  selector: 'unf-baseline-wizard-group',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, AfterViewInit, OnDestroy {    
  public static readonly DEFAULT_VALUE = undefined;
  
  public selectedCapabilityGroups: Category[] = [];
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
      .select('baseline')
      .pluck('capabilityGroups')
      .distinctUntilChanged()
      .subscribe(
        (categories: Category[]) => this.categories = categories,
        (err) => console.log(err));

    const catSub2$ = this.wizardStore
      .select('baseline')
      .pluck('baselineGroups')
      .distinctUntilChanged()
      .subscribe(
        (selectedCapabilityGroups: Category[]) => {
          this.selectedCapabilityGroups = selectedCapabilityGroups;
        },
        (err) => console.log(err));
  
    const catSub3$ = this.wizardStore
      .select('baseline')
      .pluck('baselineCapabilities')
      .distinctUntilChanged()
      .subscribe(
        (capabilities: Capability[]) => {
          this.baselineCapabilities = capabilities;
        },
        (err) => console.log(err));
    
    this.subscriptions.push(catSub1$, catSub2$, catSub3$);

    this.wizardStore.dispatch(new assessActions.FetchCapabilityGroups());
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
    const indexInList = this.selectedCapabilityGroups.indexOf(newCategoryName);
    if (indexInList < 0 && option.value !== CategoryComponent.DEFAULT_VALUE) {
      if (index === -1) {
        this.selectedCapabilityGroups.push(newCategoryName);
        option.value = CategoryComponent.DEFAULT_VALUE;
      } else {
        this.selectedCapabilityGroups[index] = newCategoryName;
      }
    } else {
      // TODO: error message to user here saying this category is already selected

      option.value = CategoryComponent.DEFAULT_VALUE;
    }

    // Update wizard store with current category selections
    this.wizardStore.dispatch(new SetBaselineGroups(this.selectedCapabilityGroups));
  }

  /*
   * @description
   * @param option 
   * @param {string} category name - optional
   * @return {number}
   */
  public selectedCategory(option: any, index: number): Category {
    const selValue = this.selectedCapabilityGroups[index];
    if (selValue === undefined) {
      return CategoryComponent.DEFAULT_VALUE;
    } else {
      const selIndex = this.categories.findIndex(category => category.id === selValue.id);
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
      let catToDelete = option.value as Category;
      const index = this.selectedCapabilityGroups.findIndex(category => category.id === catToDelete.id);
      this.selectedCapabilityGroups.splice(index, 1); 

      // Must remove any capabilities for which this category were associated
      this.wizardStore.dispatch(new assessActions.SetBaselineCapabilities(this.baselineCapabilities.filter(capability => capability.category !== option.value.name)));

      // Update wizard store with current category selections
      this.wizardStore.dispatch(new SetBaselineGroups(this.selectedCapabilityGroups.filter((capabilityGroup) => capabilityGroup !== undefined)));
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
    this.selectedCapabilityGroups.push(CategoryComponent.DEFAULT_VALUE);
  }


}
