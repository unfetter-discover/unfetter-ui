import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThreatBoard } from 'stix/unfetter/threat-board';
import { MasterListDialogTableHeaders } from '../../global/components/master-list-dialog/master-list-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'side-board',
  templateUrl: './side-board.component.html',
  styleUrls: ['./side-board.component.scss']
})
export class SideBoardComponent implements OnInit {

  readonly baseThreatUrl = '/threat-beta';

  threatBoardName$: Observable<string>;

  public threatBoardId: string;

  masterListOptions = {
    dataSource: null,
    columns: new MasterListDialogTableHeaders('modified', 'Modified'),
    displayRoute: this.baseThreatUrl + '/board',
    modifyRoute: this.baseThreatUrl + '/wizard/edit',
    createRoute: this.baseThreatUrl + '/create',
  };

  constructor(private router: Router) { }

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
    return this.router.navigate([this.masterListOptions.displayRoute, threatBoard.id]);
  }

}
