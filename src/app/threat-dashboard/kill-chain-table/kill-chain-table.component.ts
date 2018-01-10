import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Constance } from '../../utils/constance';
import { GenericApi } from '../../core/services/genericapi.service';
import { ThreatReport } from '../../threat-report-overview/models/threat-report.model';
import { KillChainEntry } from './kill-chain-entry';
import { AttackPattern } from '../../models/attack-pattern';
import { ThreatDashboard } from '../models/threat-dashboard';
import { topRightSlide } from '../../global/animations/top-right-slide';

@Component({
  selector: 'unf-kill-chain-table',
  templateUrl: 'kill-chain-table.component.html',
  styleUrls: ['./kill-chain-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [topRightSlide]
})
export class KillChainTableComponent implements OnInit, OnDestroy {

  @Input('threatReport')
  public threatReport: ThreatReport;
  @Input('attackPatterns')
  public attackPatterns: AttackPattern[];
  @Input('intrusionSetsDashboard')
  public intrusionSetsDashboard: ThreatDashboard;

  @ViewChild('toolboxBtn')
  public toolboxBtn: ElementRef;
  @ViewChild('toolbox')
  public toolbox: ElementRef;


  public undoToolboxOp: Partial<KillChainEntry>[] = undefined;
  public showToolbox = false;

  public readonly subscriptions: Subscription[] = [];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected genericApi: GenericApi,
  ) { }

  /**
   * @description init this component
   */
  public ngOnInit(): void {
    this.undoToolboxOp = this.copyState(this.intrusionSetsDashboard.killChainPhases);
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
   * @description close toolbox if clicked outside
   * @param event 
   */
  @HostListener('document:click', ['$event'])
  public clickedOutside(event: UIEvent) {
    const clickedInToolboxBtn = this.toolboxBtn && this.toolboxBtn.nativeElement.contains(event.target);
    const clickedInToolbox = this.toolbox && this.toolbox.nativeElement.contains(event.target);
    if (this.showToolbox && !(clickedInToolbox || clickedInToolboxBtn)) {
      this.showToolbox = false;
    }
  }

  /**
   * @description
   */
  public copyState(killChainPhases: Partial<KillChainEntry>[]): Partial<KillChainEntry>[] {
    return [
      ...killChainPhases.map((phases) => {
        const copy = {
          ...phases,
        };
        copy.attack_patterns = [...phases.attack_patterns];
        return copy;
      })
    ];
  }

  /**
   * @description tally the number of attackpatterns highlighted
   * @return {number}
   */
  public count(attackPatterns: KillChainEntry[]): number {
    let count = 0;
    if (!attackPatterns) {
      return count;
    }
    attackPatterns.forEach((attackPattern) => {
      if (attackPattern.isSelected === true) {
        count = count + 1;
      }
    });
    return count;
  }

  /**
   * @description
   * @param {UIEvent} event
   */
  public onToggleShowToolbox(event?: UIEvent): void {
    console.log(this.showToolbox);
    this.showToolbox = !this.showToolbox;
  }

  /**
   * @description
   * @param {UIEvent} event 
   */
  public onCompressColumns(event?: UIEvent): void {
    const filtered = this.intrusionSetsDashboard.killChainPhases.filter((phase) => {
      return this.count(phase.attack_patterns) > 0;
    });
    this.intrusionSetsDashboard.killChainPhases = filtered;
  }

  /**
   * @description
   * @param {UIEvent} event
   */
  public onCompressRows(event?: UIEvent): void {
    const filtered = this.intrusionSetsDashboard.killChainPhases.map((phases) => {
      phases.attack_patterns = phases.attack_patterns
        .filter((attackPattern) => attackPattern.isSelected === true);
      return phases;
    });
    this.intrusionSetsDashboard.killChainPhases = filtered;
  }

  /**
   * @description
   * @param {UIEvent} event optional
   */
  public onResetFilters(event?: UIEvent): void {
    if (!this.undoToolboxOp) {
      return;
    }
    this.intrusionSetsDashboard.killChainPhases = this.undoToolboxOp;
    this.undoToolboxOp = this.copyState(this.undoToolboxOp);
  }

}
