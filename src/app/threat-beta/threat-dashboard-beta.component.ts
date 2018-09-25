import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { fadeInOut } from '../global/animations/fade-in-out';
import { Router } from '@angular/router';
import { MasterListDialogTableHeaders } from '../global/components/master-list-dialog/master-list-dialog.component';
import { ThreatBoard } from 'stix/unfetter/threat-board';

@Component({
  selector: 'threat-dashboard-beta',
  templateUrl: './threat-dashboard-beta.component.html',
  styleUrls: ['./threat-dashboard-beta.component.scss'],
  animations: [fadeInOut],
})
export class ThreatDashboardBetaComponent implements OnInit {

  public showBackButton = new BehaviorSubject(false).asObservable();

  public threatBoardId: string;

  public finishedLoadingAll$: Observable<boolean> = new BehaviorSubject(true).asObservable();

  public failedToLoad = new BehaviorSubject(false).asObservable();

  public title = new BehaviorSubject('').asObservable();

  private location: Location;

  readonly baseAssessUrl = '/threat-beta';

  masterListOptions = {
    dataSource: null,
    columns: new MasterListDialogTableHeaders('modified', 'Modified'),
    displayRoute: this.baseAssessUrl + '/result/summary',
    modifyRoute: this.baseAssessUrl + '/wizard/edit',
    createRoute: this.baseAssessUrl + '/create',
  };

  constructor(private router: Router) { // private location: Location) {

   }

  ngOnInit() {
  }

  /**
   * @description
   * @return {Promise<boolean>}
   */
  public onEdit(event?: any): Promise<boolean> {
    let routePromise: Promise<boolean>;
    if (!event || (event instanceof UIEvent)) {
      routePromise = this.router.navigate([this.masterListOptions.modifyRoute, this.threatBoardId]);
    } else {
      routePromise = this.router.navigate([this.masterListOptions.modifyRoute, event.id]);
    }

    routePromise.catch((e) => console.log(e));
    return routePromise;
  }


  /**
   * @description go back
   * @param event
   */
  onBack(event: UIEvent): void {
    this.location.back();
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
   * @description clicked currently viewed assessment, confirm delete
   * @return {void}
   */
  public onDeleteCurrent(): void {
    console.log('noop');
    // const boardId = this.boardId;
    // const name = this.boardName;
    // this.confirmDelete({ name, rollupId });
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
    if (!threatBoard || !threatBoard.id ) {
      return Promise.resolve(false);
    }
    // TODO this.store.dispatch(new CleanAssessmentResultData());
    // this.riskByAttackPatternStore.dispatch(new CleanAssessmentRiskByAttackPatternData());
    return this.router.navigate([this.masterListOptions.displayRoute, threatBoard.id]);
  }

}
