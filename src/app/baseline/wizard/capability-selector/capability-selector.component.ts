import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Capability, Category } from 'stix/assess/v3';
import { SetBaselineCapabilities } from '../../store/baseline.actions';
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
        },
        (err) => console.log(err));

    const capSub3$ = this.wizardStore
      .select('baseline')
      .pluck('baselineCapabilities')
      .distinctUntilChanged()
      .subscribe(
        (selectedCapabilities: Capability[]) => {
          this.selectedCapabilities = selectedCapabilities;
        },
        (err) => console.log(err));
  
    this.subscriptions.push(capSub1$, capSub2$, capSub3$);
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
    const newCapabilityName = option.selected.value;

    // Verify a selection and that this capability doesn't already exist
    const indexInList = this.selectedCapabilities.indexOf(newCapabilityName);
    if (indexInList < 0 && option.value !== CapabilitySelectorComponent.DEFAULT_VALUE) {
      if (index === -1) {
        this.selectedCapabilities.push(newCapabilityName);
        option.value = CapabilitySelectorComponent.DEFAULT_VALUE;
      } else {
        this.selectedCapabilities[index] = newCapabilityName;
      }
    } else {
      // TODO: error message to user here saying this capability is already selected

      option.value = CapabilitySelectorComponent.DEFAULT_VALUE;
    }

    // Update wizard store with current capability selections
    this.wizardStore.dispatch(new SetBaselineCapabilities(this.selectedCapabilities));
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

      // Update wizard store with current capability selections
      this.wizardStore.dispatch(new SetBaselineCapabilities(this.selectedCapabilities));
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

  public addCapabilityEntry(): void {
    this.selectedCapabilities.push(CapabilitySelectorComponent.DEFAULT_VALUE);
  }


}
