
import { distinctUntilChanged, pluck, map, withLatestFrom, filter, tap } from 'rxjs/operators';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core'; 
import { Store } from '@ngrx/store';

import * as fromIndicatorSharing from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';
import { heightCollapse } from '../../global/animations/height-collapse';
import { getPreferredKillchain } from '../../root-store/users/user.selectors';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';
import { getPreferredKillchainAttackPatterns } from '../../root-store/stix/stix.selectors';

@Component({
  selector: 'add-attack-pattern',
  templateUrl: './add-attack-pattern.component.html',
  styleUrls: ['./add-attack-pattern.component.scss'],
  animations: [heightCollapse],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAttackPatternComponent implements OnInit {
  @Input() public indicator: any;
  @Input() public createdByRef: string;
  @Input() public existingAttackPatterns: any[] = [];
  @Input() public canCrud: boolean = false;
  public selectedAttackPatterns: any[] = [];
  public displayedAttackPatterns$: any;
  public filteredAttackPatterns: any[];
  public showAddAp: boolean = false;

  constructor(public store: Store<fromIndicatorSharing.IndicatorSharingFeatureState>) { }

  ngOnInit() {
    this.displayedAttackPatterns$ = this.store.select(getPreferredKillchainAttackPatterns);

    const getFilteredAp$ = this.store.select('indicatorSharing').pipe(
      pluck('searchParameters'),
      pluck('attackPatterns'),
      distinctUntilChanged())
      .subscribe(
        (filteredAttackPatterns: any[]) => {
          this.filteredAttackPatterns = filteredAttackPatterns;
        },
        (err) => {
          console.log(err);
        },
        () => {
          if (getFilteredAp$) {
            getFilteredAp$.unsubscribe();
          }
        }
      );
  }

  public saveRelationsips() {
    this.showAddAp = false;
    this.store.dispatch(new indicatorSharingActions.CreateIndicatorToApRelationships({ 
      indicatorId: this.indicator.id, 
      attackPatternIds: this.selectedAttackPatterns, 
      createdByRef: this.createdByRef 
    }));
    this.selectedAttackPatterns = [];
  }

  public apSelected(apId): boolean {
    return this.filteredAttackPatterns.includes(apId);
  }
}
