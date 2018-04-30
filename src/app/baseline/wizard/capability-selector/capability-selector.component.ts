import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Capability } from 'stix';
import { FetchCategories, SetBaselineCaps } from '../../store/baseline.actions';
import * as assessReducers from '../../store/baseline.reducers';

@Component({
  selector: 'unf-baseline-wizard-capability-selector',
  templateUrl: './capability-selector.component.html',
  styleUrls: ['./capability-selector.component.scss']
})
export class CapabilitySelectorComponent implements OnInit, AfterViewInit, OnDestroy {    
  public static readonly DEFAULT_VALUE = undefined;
  
  public tempCapabilities: Capability[] = [ CapabilitySelectorComponent.DEFAULT_VALUE ];
  public capabilities: Capability[];
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
        (capabilities: Capability[]) => this.capabilities = capabilities,
        (err) => console.log(err));

    const capSub2$ = this.wizardStore
      .select('baseline')
      .pluck('baselineCaps')
      .distinctUntilChanged()
      .subscribe(
        (baselineCaps: Capability[]) => this.tempCapabilities = baselineCaps,
        (err) => console.log(err));
  
    this.subscriptions.push(capSub1$, capSub2$);

    this.wizardStore.dispatch(new FetchCategories());
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
    const indexInList = this.tempCapabilities.indexOf(newCapabilityName);
    if (indexInList < 0 && option.value !== CapabilitySelectorComponent.DEFAULT_VALUE) {
      this.tempCapabilities[index] = newCapabilityName;
    } else {
      // TODO: error message to user here saying this capability is already selected

      option.value = CapabilitySelectorComponent.DEFAULT_VALUE;
    }

    // Update wizard store with current capability selections
    this.wizardStore.dispatch(new SetBaselineCaps(this.tempCapabilities));
  }

  /*
   * @description
   * @param option 
   * @param {number} index of option in list of capability mat-select's
   * @return {number}
   */
  public selectedCapability(option: any, index: number): Capability {
    const selValue = this.tempCapabilities[index];
    if (selValue === undefined) {
      return CapabilitySelectorComponent.DEFAULT_VALUE;
    } else {
      const selIndex = this.capabilities.findIndex(capability => capability.id === selValue.id);
      console.log(`value is -` + JSON.stringify(selValue) + `- and index is ` + selIndex);
      return this.capabilities[selIndex];
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
      const index = this.tempCapabilities.indexOf(option.value);
      this.tempCapabilities.splice(index, 1); 

      // Update wizard store with current capability selections
      this.wizardStore.dispatch(new SetBaselineCaps(this.tempCapabilities));
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
    this.tempCapabilities.push(CapabilitySelectorComponent.DEFAULT_VALUE);
  }


}
