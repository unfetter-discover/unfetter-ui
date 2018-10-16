import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ThreatBoard } from 'stix/unfetter/threat-board';
import { pluck, filter, withLatestFrom, map, finalize } from 'rxjs/operators';
import { Report } from 'stix';

import { MasterListDialogTableHeaders } from '../../global/components/master-list-dialog/master-list-dialog.component';
import { SideBoardDataSource } from './side-board.datasource';
import { ThreatFeatureState } from '../store/threat.reducers';
import { getSelectedBoard, getSelectedReportId } from '../store/threat.selectors';
import * as threatActions from '../store/threat.actions';

@Component({
  selector: 'side-board',
  templateUrl: './side-board.component.html',
  styleUrls: ['./side-board.component.scss']
})
export class SideBoardComponent implements OnInit {
  @Input()
  public boardId: string;
  public reports$: Observable<Report[]>;

  readonly baseThreatUrl = '/threat-beta';

  public selectedBoard$: Observable<ThreatBoard>;
  public selectedReport: string = '';


  masterListOptions = {
    dataSource: null,
    columns: new MasterListDialogTableHeaders('modified', 'Modified'),
    modifyRoute: this.baseThreatUrl + '/wizard/edit',
    createRoute: this.baseThreatUrl + '/create',
  };

  constructor(
    private router: Router,
    protected store: Store<ThreatFeatureState>
  ) { }
  
  ngOnInit() {
    this.reports$ = this.store.select('threat')
      .pipe(
        pluck<any, Report[]>('attachedReports'),
        withLatestFrom(this.store.select('stix')),
        map(([reports, stixState]) => {
          return reports.map((report): any => {
            const matchingIdentity = stixState.identities.find((identity) => identity.id === report.created_by_ref);
            const creatorName = matchingIdentity ? matchingIdentity.name : 'Unknown';
            return {
              ...report,
              creator_name: creatorName
            };
          });
        })
      );

    const selectedReport$ = this.store.select(getSelectedReportId)
        .pipe(finalize(() => selectedReport$ && selectedReport$.unsubscribe()))
        .subscribe(
          (id) => {
            this.selectedReport = id;
          },
          (err) => {
            console.log(err);
          }
        );

    this.masterListOptions.dataSource = new SideBoardDataSource(this.store);
    const isSameThreatBoard = (row: any) => row && row.id === this.boardId;
    this.masterListOptions.columns.id.classes =
      (row: any) => isSameThreatBoard(row) ? 'current-item' : 'cursor-pointer';
    this.masterListOptions.columns.id.selectable = (row: any) => !isSameThreatBoard(row);

    this.selectedBoard$ = this.store.select(getSelectedBoard);
  }

  public reportClicked(reportId: string): void {
    this.store.dispatch(new threatActions.SetSelectedReportId(reportId));
  }

  /**
   * @description
   * @return {Promise<boolean>}
   */
  public onEdit(event?: any): Promise<boolean> {
    let routePromise: Promise<boolean>;
    if (!event || (event instanceof UIEvent)) {
      routePromise = this.router.navigate([this.masterListOptions.modifyRoute, this.boardId]);
    } else {
      routePromise = this.router.navigate([this.masterListOptions.modifyRoute, event.id]);
    }

    routePromise.catch((e) => console.log(e));
    return routePromise;
  }

  /**
   * @description noop
   * @return {Promise<boolean>}
   */
  public onShare(event?: UIEvent): Promise<boolean> {
    console.log('noop');
    return Promise.resolve(false);
  }

  /**
   * @description clicked master list cell, confirm delete
   * @param {LastModifiedAssessment} assessment
   * @return {void}
   */
  public onDelete(threatBoard: ThreatBoard): void {
    console.log('noop');
    // TODO this.confirmDelete({ name: threatBoard.name, id: threatBoard.id });
  }

  /**
   * @description clicked currently viewed threatBoard, confirm delete
   * @return {void}
   */
  public onDeleteCurrent(event: Event): void {
    if (event && (event instanceof UIEvent)) {
      event.preventDefault();
    }

    console.log('noop');
    // const boardId = this.boardId;
    // const name = this.boardName;
    // this.confirmDelete({ name, boardId });
  }

  /**
   * @description noop
   * @return {Promise<boolean>}
   */
  public onFilterTabChanged($event?: UIEvent): Promise<boolean> {
    console.log('noop');
    return Promise.resolve(false);
  }

  /**
   * @description router to the create page
   * @param {event} UIEvent - optional 
   * @return {Promise<boolean>}
   */
  public onCreate(event?: UIEvent): Promise<boolean> {
    return this.router.navigateByUrl(this.masterListOptions.createRoute);
  }

  /**
   * @description
   * @param {LastModifiedAssessment} assessment - optional
   * @return {Promise<boolean>}
   */
  public onCellSelected(threatBoard: ThreatBoard): Promise<boolean> {
    if (!threatBoard || !threatBoard.id) {
      return Promise.resolve(false);
    }
    // TODO this.store.dispatch(new CleanAssessmentResultData());
    // this.riskByAttackPatternStore.dispatch(new CleanAssessmentRiskByAttackPatternData());
    this.router.navigate([this.baseThreatUrl, threatBoard.id, 'board' ]);
    return Promise.resolve(false);
  }

}
