import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CourseOfAction } from 'stix/stix/course-of-action';
import { AttackPattern } from 'stix/unfetter/attack-pattern';
import { Tactic } from '../../global/components/tactics-pane/tactics.model';
import { AngularHelper } from '../../global/static/angular-helper';
import { SortHelper } from '../../global/static/sort-helper';
import { AppState } from '../../root-store/app.reducers';
import { ThreatReport } from '../models/threat-report.model';

interface WithAttackPatterns { attack_patterns: AttackPattern[] };
type CustomCourseOfAction = CourseOfAction & WithAttackPatterns;
@Component({
  selector: 'unf-mitigation-component',
  templateUrl: 'mitigation.component.html',
  styleUrls: ['./mitigation.component.scss']
})
export class MitigationComponent implements OnInit, OnDestroy {
  @Input() public threatReport: ThreatReport;
  @Input() public coursesOfAction: CustomCourseOfAction[];

  isAttackerTurn = true;
  // attack pattern ids used across all reports in this threat report
  currentReportAttackPatternIds;
  // reports used by the reports included in this threat report
  currentReportAttackPatterns;
  // current attack patterns listed in this mitigation timeline
  currentMitigationAttackPatterns;
  // all attack patterns across all kill chains and phases
  allAttackPatterns: Tactic[];
  // form group to submit new mitigation lines
  mitigationLineForm: FormGroup;
  // hack to help w/ the validation error state in the drop down
  mitigationLineFormResetComplete = true;
  // mitigation lines
  mitigationLines: { attackPattern: AttackPattern, courseOfAction: CustomCourseOfAction }[];
  // show inputs to add a mitigation line
  showEdit = false;
  private readonly subscriptions: Subscription[] = [];

  /**
   * event name
   * attack patterns
   * coa
   * citations:
   */

  constructor(
    protected appStore: Store<AppState>,
    protected changeDetectorRef: ChangeDetectorRef,
    protected route: ActivatedRoute,
    protected router: Router,
  ) { }

  /**
   * @description init this component
   */
  public ngOnInit(): void {
    this.mitigationLines = [];
    this.initListeners();
    this.initFormGroup();
  }

  /**
   * @description 
   */
  public ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
  }

  /**
   * @returns void
   */
  public initListeners(): void {
    const sub$ = this.appStore
      .select('config')
      .pipe(
        filter((config) => config.tactics !== undefined && config.tacticsChains !== undefined),
        map((config) => {
          const tactics = config.tactics;
          this.allAttackPatterns = tactics;
        })
      )
      .subscribe(
        () => {
          if (this.threatReport) {
            this.currentReportAttackPatternIds = this.threatReportToUniqueAttackPatternIds(this.threatReport);
          }
          this.currentReportAttackPatterns =
            this.attackPatternIdsToTactics(this.currentReportAttackPatternIds, this.allAttackPatterns)
              .sort(SortHelper.sortDescByField('name'));
          
          if (this.coursesOfAction) {
            // TODO: sort courses of action numerically
            this.coursesOfAction = this.coursesOfAction.sort(SortHelper.sortDescByField('name'));
          }
        },
        (err) => console.log(err),
        () => {
          if (sub$) {
            sub$.unsubscribe();
          }
        }
      );
  }

  /**
   * @returns void
   */
  public initFormGroup(): void {
    this.mitigationLineForm = new FormGroup({
      attackPattern: new FormControl('', Validators.required),
      courseOfAction: new FormControl('', Validators.required),
    });
  }

  /**
   * @param  {string[]} attackPatternIds
   * @param  {Tactic[]} tactics
   * @returns Tactic
   */
  public attackPatternIdsToTactics(attackPatternIds: string[], tactics: Tactic[]): Tactic[] {
    const attackPatternSet = new Set<string>(attackPatternIds);
    const foundIds = new Set<string>();
    const foundTactics = tactics.filter((tactic) => {
      const id = tactic.id;
      const hasId = attackPatternSet.has(tactic.id);
      const firstIdFind = hasId && !foundIds.has(id);
      // tactics are listed once per phase
      //  dedup tactics found across phases
      if (hasId) {
        foundIds.add(tactic.id);
      }
      return firstIdFind;
    });
    return foundTactics;
  }

  /**
 * @param  {string[]} attackPatternIds
 * @param  {Tactic[]} tactics
 * @returns Tactic
 */
  public attackPatternIdToTactic(attackPatternId: string, tactics: Tactic[]): Tactic {
    let matchedTactic;
    const matchedTactics = tactics.filter((tactic) => tactic.id === attackPatternId);
    if (matchedTactics && matchedTactics.length > 0) {
      matchedTactic = matchedTactics[0];
    }

    return matchedTactic;
  }

  /**
   * @param  {ThreatReport} threatReport
   * @returns string
   */
  public threatReportToUniqueAttackPatternIds(threatReport: ThreatReport): string[] {
    if (!threatReport) {
      return [];
    }

    // flatten attack pattern ids
    const ids = this.threatReport.reports
      .map((report) => {
        return report.attributes.object_refs;
      })
      .reduce((memo, el) => {
        return memo.concat(el);
      }, []);
    // uniq and sort the ids
    const set = new Set<string>(ids);
    const sortedAndUniqIds = Array.from(set).sort(SortHelper.sortDesc());
    return sortedAndUniqIds;
  }

  public relatedCoursesOfAction(attackPatternId: string, coursesOfAction: CustomCourseOfAction[]): void {

  }

  /**
   * @param  {AttackPattern} attackPattern
   * @param  {Event} event?
   * @returns void
   */
  public citationLinksFor(attackPattern: AttackPattern, event?: Event): string[] {
    if (event) {
      event.preventDefault();
    }

    // flatten all urls that match this attack pattern
    const urls = this.threatReport.reports
      .map((report) => report.attributes)
      // .map((report) => report.attack_patterns.)
      .map((report) => report.external_references.map((ref) => ref.url))
      .reduce((memo, curEl) => {
        return memo.concat(curEl);
      }, []);

    // uniq and sort the ids
    const set = new Set<string>(urls);
    const sortedAndUniqIds = Array.from(set).sort(SortHelper.sortDesc());
    return sortedAndUniqIds;
  }

  /**
   * @param  {Event} event
   * @returns void
   */
  public handleNewMitigationLineClick(event: Event): void {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    const val = this.mitigationLineForm.value;
    const line = { ...val };
    if (!line || !line.attackPattern || !line.courseOfAction) {
      console.log('invalid mitigation form data. moving on...');
      return;
    }
    this.mitigationLines = this.mitigationLines.concat(line);
    this.mitigationLineFormResetComplete = false;
    this.initFormGroup();
    this.changeDetectorRef.detectChanges();
    this.mitigationLineFormResetComplete = true;
  }

  /**
   * @description angular track by list function, 
   *  uses the items id iff (if and only if) it exists, 
   *  otherwise uses the index
   * @param {number} index
   * @param {item}
   * @return {number}
   */
  public trackByFn(index: number, item: any): number {
    return AngularHelper.genericTrackBy(index, item);
  }

}
