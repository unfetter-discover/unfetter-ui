import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatTooltip } from '@angular/material/tooltip';
import { ThreatReport } from '../models/threat-report.model';

@Component({
  selector: 'unf-export-component',
  templateUrl: 'export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit, OnDestroy {
  @Input() public threatReport: ThreatReport;
  public copyText: string;
  public jsonText: string;

  private readonly FLASH_TOOLTIP_TIMER = 500;
  private readonly subscriptions: Subscription[] = [];

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
  ) { }

  /**
   * @description init this component
   */
  public ngOnInit() {
    this.jsonText = this.generateJson();
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
   * @description take this components threat report and JSON stringify
   */
  public generateJson(): string {
    return JSON.stringify(this.threatReport, undefined, 2);
  }

  /**
   * @description flash a tool tip stating if the copy succeeded or failed
   * @param  {{isSuccess:true}} event
   * @param  {MatTooltip} toolTip
   * @returns void
   */
  public onCopy(event: { isSuccess: true }, toolTip: MatTooltip): void {
    if (!event.isSuccess) {
      this.copyText = 'Copy Failed';
    } else {
      this.copyText = 'Copied';
    }
    this.flashTooltip(toolTip);
  }

  /**
   * @description flash a tool tip stating if the copy succeeded or failed
   * @param  {MatTooltip} toolTip
   * @returns void
   */
  public flashTooltip(toolTip: MatTooltip): void {
    toolTip.show();
    setTimeout(() => toolTip.hide(), this.FLASH_TOOLTIP_TIMER);
  }

}
