import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'uf-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBarComponent implements OnInit {

  @Input()
  public shouldShow = true;
  @Input()
  public message = '';
  @Input()
  public dismissBtnMsg = 'DISMISS';
  @Input()
  public completeBtnMsg = 'COMPLETE';
  @Input()
  public completeActionUrl = '';

  constructor(
    protected router: Router,
  ) { }

  /**
   * @returns void
   */
  public ngOnInit(): void {
  }

  /**
   * @param  {UIEvent} event?
   * @returns void
   */
  public onDismissClick(event?: UIEvent): void {
    this.shouldShow = false;
  }

}
