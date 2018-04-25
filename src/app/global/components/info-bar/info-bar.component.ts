import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uf-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss']
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
  constructor() { }
  
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

  /**
   * @param  {UIEvent} event?
   * @returns void
   */
  public onCompleteClick(event?: UIEvent): void {
    console.log('on complete');
  }

}
