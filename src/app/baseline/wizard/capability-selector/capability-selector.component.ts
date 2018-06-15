import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Capability, Category, ObjectAssessment } from 'stix/assess/v3/baseline';
import { Stix } from 'stix/unfetter/stix';
import { StixEnum } from 'stix/unfetter/stix.enum';
import { AddCapabilityToBaseline, AddObjectAssessmentToBaseline, ReplaceCapabilityInBaseline, RemoveCapabilityFromBaseline } from '../../store/baseline.actions';
import * as assessReducers from '../../store/baseline.reducers';

@Component({
  selector: 'unf-baseline-wizard-capability-selector',
  templateUrl: './capability-selector.component.html',
  styleUrls: ['./capability-selector.component.scss']
})
export class CapabilitySelectorComponent implements OnInit, AfterViewInit, OnDestroy {    
  public static readonly DEFAULT_VALUE = undefined;
  
  public currentCapabilityGroup: Category;
  public selectedCapabilities: Capability[] = [];
  public allCapabilities: Capability[];
  private baselineCapabilities: Capability[] = [];
  private baselineObjAssessments: ObjectAssessment[] = [];

  private subscriptions: Subscription[] = [];
    
  constructor(
    private wizardStore: Store<assessReducers.BaselineState>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    const capSub1$ = this.wizardStore
      .select('baseline')
      .pluck('capabilities')
      .distinctUntilChanged()
      .subscribe(
        (allCapabilities: Capability[]) => this.allCapabilities = allCapabilities,
        (err) => console.log(err));

    const capSub2$ = this.wizardStore
      .select('baseline')
      .pluck('currentCapabilityGroup')
      .distinctUntilChanged()
      .subscribe(
        (currentCapabilityGroup: Category) => {
          this.currentCapabilityGroup = currentCapabilityGroup;
          if (this.currentCapabilityGroup) {
           this.selectedCapabilities = this.baselineCapabilities.filter((cap) => cap.category === this.currentCapabilityGroup.id);
          } else {
            this.selectedCapabilities = [];
          }
        },
        (err) => console.log(err));

    const capSub3$ = this.wizardStore
      .select('baseline')
      .pluck('baselineCapabilities')
      .distinctUntilChanged()
      .subscribe(
        (baselineCapabilities: any[]) => {
          this.baselineCapabilities = (baselineCapabilities) ? baselineCapabilities.slice() : [];
          this.selectedCapabilities = this.baselineCapabilities.filter((cap) => cap.category === this.currentCapabilityGroup.id);
        },
        (err) => console.log(err));
  
    const capSub4$ = this.wizardStore
      .select('baseline')
      .pluck('baselineObjAssessments')
      .distinctUntilChanged()
      .subscribe(
        (objAssessments: any[]) => {
          this.baselineObjAssessments = objAssessments;
        },
        (err) => console.log(err));
    
    this.subscriptions.push(capSub1$, capSub2$, capSub3$, capSub4$);
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
   * @description Update capability for given index
   * @param option
   * @returns {void}
   */
  public updateCapability(option: any, index: number): void {
    const newCapability = option.selected.value;

    // Verify a selection and that this capability doesn't already exist
    const indexInList = this.baselineCapabilities.indexOf(newCapability);
    if (indexInList < 0 && option.value !== CapabilitySelectorComponent.DEFAULT_VALUE) {
      if (index === -1) {
        // Apply category name to this capability
        newCapability.category = this.currentCapabilityGroup.id;
        this.selectedCapabilities.push(newCapability);

        this.wizardStore.dispatch(new AddCapabilityToBaseline(newCapability));
        // this.addObjectAssessment(newCapability);

        option.value = CapabilitySelectorComponent.DEFAULT_VALUE;
      } else {
        // Replace capabilities
        this.wizardStore.dispatch(new ReplaceCapabilityInBaseline( [ this.selectedCapabilities[index], newCapability ] ));

        // Replace it
        this.selectedCapabilities[index] = newCapability;
      }
    } else {
      // TODO: error message to user here saying this capability is already selected

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
      // TODO: implement action to remove a capability from a baseline
      this.wizardStore.dispatch(new RemoveCapabilityFromBaseline(removedCapability[0]));
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

  private addObjectAssessment(capability: Capability): void {
    // Determine which ones are new
    const newOA = new ObjectAssessment();
    newOA.object_ref = capability.id;
    newOA.assessed_objects = [];
    const stix = new Stix();
    stix.type = StixEnum.OBJECT_ASSESSMENT;
    stix.description = capability.description;
    stix.name = capability.name;
    stix.created_by_ref = capability.created_by_ref;
    Object.assign(newOA, stix);

    // Inherit assessed objects from category
    newOA.assessed_objects = [ ...this.currentCapabilityGroup.assessed_objects ];

    // Save new object assessments so we have IDs for them
    this.wizardStore.dispatch(new AddObjectAssessmentToBaseline(newOA));
  }
}
