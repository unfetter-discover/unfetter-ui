import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import { Capability, Category, ObjectAssessment } from 'stix/assess/v3/baseline';
import { SetBaselineCapabilities, SetBaselineObjectAssessments } from '../../store/baseline.actions';
import * as assessReducers from '../../store/baseline.reducers';
import { Stix } from 'stix/unfetter/stix';
import { Constance } from '../../../utils/constance';
import { StixCoreEnum } from 'stix';
import { StixEnum } from 'stix/unfetter/stix.enum';

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
           this.selectedCapabilities = this.baselineCapabilities.filter((cap) => cap.category === this.currentCapabilityGroup.name);
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
          this.selectedCapabilities = this.baselineCapabilities.filter((cap) => cap.category === this.currentCapabilityGroup.name);
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
        newCapability.category = this.currentCapabilityGroup.name;
        this.selectedCapabilities.push(newCapability);
        option.value = CapabilitySelectorComponent.DEFAULT_VALUE;
      } else {
        this.selectedCapabilities[index] = newCapability;
      }
    } else {
      // TODO: error message to user here saying this capability is already selected

      option.value = CapabilitySelectorComponent.DEFAULT_VALUE;
    }

    this.updateBaselineCapabilities();
    this.updateObjectAssessments();
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
      this.selectedCapabilities.splice(index, 1);

      this.updateBaselineCapabilities();
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

  private updateBaselineCapabilities(): void {
    // Update baseline capabilities
    this.baselineCapabilities = [ ...this.baselineCapabilities, ...this.selectedCapabilities ];
    this.baselineCapabilities = _.uniqBy(this.baselineCapabilities, 'id');

    // Update wizard store with current capability selections
    this.wizardStore.dispatch(new SetBaselineCapabilities(this.baselineCapabilities));
  }

  private updateObjectAssessments(): void {
    // Determine which ones are new
    let newCaps = this.baselineCapabilities.filter(selCap => this.baselineObjAssessments.findIndex(bOA => bOA.object_ref === selCap.id) === -1);
    let newOAs = [];
    newCaps.forEach((capability) => {
      const newOA = new ObjectAssessment();
      newOA.object_ref = capability.id;
      const stix = new Stix();
      stix.type = StixEnum.OBJECT_ASSESSMENT;
      stix.description = capability.description;
      stix.name = capability.name;
      stix.created_by_ref = capability.created_by_ref;
      Object.assign(newOA, stix);
<<<<<<< HEAD

      // Inherit assessed objects from category
      newOA.assessments_objects = [ ...this.currentCapabilityGroup.assessed_objects ];

=======
>>>>>>> Create object assessments and set current into store
      newOAs.push(newOA);
    });

    // Filter out capabilities that have been deleted
    let existingOAs = this.baselineObjAssessments.filter(bOA => this.baselineCapabilities.findIndex(blCap => bOA.object_ref === blCap.id) !== -1);

    let newOAlist = _.union(existingOAs, newOAs);

    // Update wizard store with current capability selections
    this.wizardStore.dispatch(new SetBaselineObjectAssessments(newOAlist));
  }
}
