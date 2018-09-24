
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Capability, Category, ObjectAssessment } from 'stix/assess/v3/baseline';
import { Stix } from 'stix/unfetter/stix';
import { StixEnum } from 'stix/unfetter/stix.enum';
import { AddCapabilityToBaseline, AddObjectAssessmentToBaseline, RemoveCapabilitiesFromBaseline, ReplaceCapabilityInBaseline, FetchCapabilityGroups, AddCapability } from '../../store/baseline.actions';
import * as assessReducers from '../../store/baseline.reducers';

@Component({
  selector: 'unf-baseline-wizard-capability-selector',
  templateUrl: './capability-selector.component.html',
  styleUrls: ['./capability-selector.component.scss']
})
export class CapabilitySelectorComponent implements OnInit, AfterViewInit, OnDestroy {
  public static readonly DEFAULT_VALUE = undefined;

  public isAddCapability: boolean = false;
  public addCapability: Capability = new Capability();
  public currentCapabilityGroup: Category;
  public selectedCapabilities: Capability[] = [];
  public allCapabilities: Capability[];
  public categories: Category[];
  private baselineCapabilities: Capability[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private wizardStore: Store<assessReducers.BaselineState>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    const capSub1$ = this.wizardStore
      .select('baseline').pipe(
      pluck('capabilities'),
      distinctUntilChanged())
      .subscribe(
        (allCapabilities: Capability[]) => {
          this.allCapabilities = allCapabilities;
        },
        (err) => console.log(err));

    const capSub2$ = this.wizardStore
      .select('baseline').pipe(
      pluck('currentCapabilityGroup'),
      distinctUntilChanged())
      .subscribe(
        (currentCapabilityGroup: Category) => {
          this.currentCapabilityGroup = currentCapabilityGroup;
          this.updateCapList();
        },
        (err) => console.log(err));

    const capSub3$ = this.wizardStore
      .select('baseline').pipe(
      pluck('baselineCapabilities'),
      distinctUntilChanged())
      .subscribe(
        (baselineCapabilities: any[]) => {
          this.baselineCapabilities = (baselineCapabilities) ? baselineCapabilities.slice() : [];
          this.updateCapList();
        },
        (err) => console.log(err));

    const catSub4$ = this.wizardStore
      .select('baseline').pipe(
      pluck('capabilityGroups'),
      distinctUntilChanged())
      .subscribe(
        (categories: Category[]) => this.categories = categories,
        (err) => console.log(err));

    this.subscriptions.push(capSub1$, capSub2$, capSub3$, catSub4$);

    this.wizardStore.dispatch(new FetchCapabilityGroups());
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
   * @description Initialize variables to create a new Capability
   * @returns {void}
   */
  private createNewCapability(): void {
    this.isAddCapability = true;
    this.addCapability = new Capability();
    this.addCapability.category = this.currentCapabilityGroup.name;
    this.addCapability.created_by_ref = this.allCapabilities[0].created_by_ref;
  }
  
  /*
   * @description Create a new Capability and add the Capability to the capabilities
   * @returns {void}
   */
  private addNewCapability(): void {
     
    this.wizardStore.dispatch(new AddCapability(this.addCapability));
    
    this.isAddCapability = false;
    this.addCapability = new Capability();
  }
  
  /*
   * @description Cancel creating a new Capability
   * @returns {void}
   */
  private cancelAddNewCapability(): void {
    this.isAddCapability = false;
    this.addCapability = new Capability();
  }

  /*
   * @description Update capability for given index
   * @param option
   * @returns {void}
   */
  public updateCapability(option: any, index: number): void {
    const newCapability = option.selected.value;

    // If this is replacing a selected group, do a replace
    if (this.selectedCapabilities[index]) {
        // Replace capabilities and associated object assessments
        this.wizardStore.dispatch(new ReplaceCapabilityInBaseline([this.selectedCapabilities[index], newCapability]));
    } else {
        // Apply category name to this capability
        newCapability.category = this.currentCapabilityGroup.id;

        this.wizardStore.dispatch(new AddCapabilityToBaseline(newCapability));

        option.value = CapabilitySelectorComponent.DEFAULT_VALUE;
    }
  }

  /*
   * @description
   * @param option 
   * @param {number} index of option in list of capability mat-select's
   * @return {number}
   */
  public selectedCapability(option: any, index: number): Capability {
    const selValue = this.selectedCapabilities[index];
    if (selValue === undefined) {
      return CapabilitySelectorComponent.DEFAULT_VALUE;
    } else {
      const selIndex = this.allCapabilities.findIndex(capability => capability.id === selValue.id);
      return this.allCapabilities[selIndex];
    }
  }

  /**
   * @description Delete capability from the list, with confirmation
   * @param {MatSelect} option
   * @return {void}
   */
  public onDeleteCapability(option: any): void {
    const confirmed = this.confirmDelete(option.value);

    if (confirmed) {
      const index = this.selectedCapabilities.indexOf(option.value);
      const removedCapability = this.selectedCapabilities.splice(index, 1);

      // Remove the capability being replaced... (always only one at a time here)
      this.wizardStore.dispatch(new RemoveCapabilitiesFromBaseline(removedCapability));
    }
  }

  /**
   * @description Confirm deletion of a capability from the list
   * @param {string} capability the name of the capability to remove
   * @param {UIEvent} optional event
   * @return {boolean} true to delete, false otherwise
   */
  public confirmDelete(capability: string, event?: UIEvent): boolean {
    // TODO: Add confirmation dialog

    return true;
  }

    /** 
   * Returns only those capabilities which are specific to current category
   * @return {any[]}
   */
  public getCapabilities(category: Category): Capability[] {
    if (!this.allCapabilities) {
      return [];
    }

    if (!category || !category.id) {
      return this.allCapabilities;
    }

    return this.allCapabilities
      .filter((capability) => capability.category === category.id)
      .sort();
  }

  private updateCapList(): void {
    if (this.currentCapabilityGroup) {
      this.selectedCapabilities = this.baselineCapabilities.filter((cap) =>
                          cap.category === this.currentCapabilityGroup.id);
    } else {
      this.selectedCapabilities = [];
    }
  }

  private shouldCapabilityBeDisabled(capability: Capability) {
    return this.selectedCapabilities.findIndex((cap) => cap.id === capability.id) !== -1;
  }

  public getCapabilityDisabled(capability: Capability) {
    return (this.shouldCapabilityBeDisabled(capability) ? 'true' : 'false');
  }
}
