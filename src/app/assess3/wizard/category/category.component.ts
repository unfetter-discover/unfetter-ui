import { Component, OnInit } from '@angular/core';
import * as assessActions from '../../store/assess.actions';
import * as assessReducers from '../../store/assess.reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'unf-assess3-wizard-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public readonly defaultValue = -1;
  public tempCategories: string[] = [];
  public dummyCategories: string[] = [ 'Generic AV', 'Standard EDR', 'Network Analysis', 'Network Firewall', 'sysmon', 'Autoruns', 'Enterprise SIEM' ];

    
  constructor(
    private wizardStore: Store<assessReducers.AssessState>
  ) { }

  ngOnInit() {
    // this.wizardStore.dispatch(new assessActions.FetchCategories());
  }

  /**
   * @description angular track by list function, uses the items id if
   *  it exists, otherwise uses the index
   * @param {number} index
   * @param {item}
   * @return {number}
   */
  public trackByFn(index: number, item: any): number {
    return item.id || index;
  }

  /*
   * @description Update name of category
   * @param option
   * @returns {void}
   */
  public updateCategory(option: any, index: number): void {
    const newCategoryName = option.selected.value;

    this.tempCategories[index] = newCategoryName;
  }

  /*
   * @description
   * @param option 
   * @param {string} category name - optional
   * @return {number}
   */
  public selectedCategory(option: any, tempCategory?: string): number {
    if (this.tempCategories) {
      const index = this.tempCategories.indexOf(tempCategory);
      const retVal = (index >= 0) ? this.dummyCategories.indexOf(tempCategory) : this.defaultValue;
      console.log(`For selector ${option}, sel value is ${tempCategory} and return is ${retVal}`);
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
      if (index >= 0) {
        this.tempCategories.splice(index, 1);
      }  
    }
  }

  /**
   * @description Confirm deletion of a category from the list
   * @param {string} category the name of the category to remove
   * @param {UIEvent} optional event
   * @return {boolean} true to delete, false otherwise
   */
  public confirmDelete(category: string, event?: UIEvent): boolean {
    if (!category) {
      console.log('no category given to delete');
      return;
    }

    // TODO: Add confirmation dialog

    return true;
  }

    /**
   * @description Add category to list
   * @param {string} category
   * @return {void}
   */
  public onAddCategory(option: any): void {
    // Verify a selection and that this category doesn't already exist
    const index = this.tempCategories.indexOf(option.value);
    if (index < 0 && option.value !== this.defaultValue) {
      this.tempCategories.push(option.value);

      option.value = this.defaultValue;
    }
  }

}
