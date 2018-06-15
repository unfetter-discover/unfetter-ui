
import { distinctUntilChanged, pluck, map } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core'; 
import { Store } from '@ngrx/store';

import * as fromIndicatorSharing from '../store/indicator-sharing.reducers';
import * as indicatorSharingActions from '../store/indicator-sharing.actions';
import { heightCollapse } from '../../global/animations/height-collapse';

@Component({
  selector: 'add-attack-pattern',
  templateUrl: './add-attack-pattern.component.html',
  styleUrls: ['./add-attack-pattern.component.scss'],
  animations: [heightCollapse]
})
export class AddAttackPatternComponent implements OnInit {
  @Input() public indicatorId: string;
  @Input() public createdByRef: string;
  @Input() public existingAttackPatterns: any[] = [];
  @Input() public canCrud: boolean = false;
  public selectedAttackPatterns: any[] = [];
  public displayedAttackPatterns$: any;
  public filteredAttackPatterns: any[];
  public showAddAp: boolean = false;

  constructor(public store: Store<fromIndicatorSharing.IndicatorSharingFeatureState>) { }

  ngOnInit() {
    this.displayedAttackPatterns$ = this.store.select('indicatorSharing').pipe(
      pluck('attackPatterns'),
      map((attackPatterns: any[]) => {
        return attackPatterns
          .filter((attackPattern) => {
            return this.existingAttackPatterns
              .find((existingAttackPattern: any) => existingAttackPattern.id === attackPattern.id) === undefined;
          });
      }));
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
    this.selectedAttackPatterns
      .forEach((attackPatternId) => { 
        this.store.dispatch(new indicatorSharingActions.CreateIndicatorToApRelationship({ indicatorId: this.indicatorId, attackPatternId, createdByRef: this.createdByRef }))
      })
    this.selectedAttackPatterns = [];
  }

  public apSelected(apId): boolean {
    return this.filteredAttackPatterns.includes(apId);
  }
}
