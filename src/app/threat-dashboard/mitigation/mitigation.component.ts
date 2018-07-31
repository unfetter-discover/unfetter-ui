import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '../../../../node_modules/@angular/forms';
import { Store } from '../../../../node_modules/@ngrx/store';
import { filter, map } from '../../../../node_modules/rxjs/operators';
import { Tactic } from '../../global/components/tactics-pane/tactics.model';
import { AppState } from '../../root-store/app.reducers';
import { ThreatReport } from '../models/threat-report.model';

@Component({
  selector: 'unf-mitigation-component',
  templateUrl: 'mitigation.component.html',
  styleUrls: ['./mitigation.component.scss']
})
export class MitigationComponent implements OnInit, OnDestroy {
  @Input() public threatReport: ThreatReport;

  isAttackerTurn = true;
  // attack pattern ids used across all reports in this threat report
  currentReportAttackPatternIds;
  // reports used by the reports included in this threat report
  currentReportAttackPatterns;
  // current attack patterns listed in this mitigation timeline
  currentMitigationAttackPatterns;
  // all attack patterns across all kill chains and phases
  allAttackPatterns: Tactic[];
  attackerForm: FormGroup;
  private readonly subscriptions: Subscription[] = [];

  /**
   * event name
   * attack patterns
   * citations:
   * 
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
    if (this.threatReport) {
      this.currentReportAttackPatternIds = this.threatReport.reports
        .map((report) => {
          return report.attributes.object_refs;
        })
        .reduce((memo, el) => {
          return memo.concat(el);
        }, []);
    }

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
          this.currentReportAttackPatterns =
            this.attackPatternIdsToTactics(this.currentReportAttackPatternIds, this.allAttackPatterns);
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
    this.attackerForm = new FormGroup({
      attackPattern: new FormControl(''),
    });
  }

  /**
   * @param  {string[]} attackPatternIds
   * @param  {Tactic[]} tactics
   * @returns Tactic
   */
  public attackPatternIdsToTactics(attackPatternIds: string[], tactics: Tactic[]): Tactic[] {
    const attackPatternSet = new Set<string>(attackPatternIds);
    return tactics.filter((tactic) => attackPatternSet.has(tactic.id));
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

}
