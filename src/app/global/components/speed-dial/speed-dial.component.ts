import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { SpeedDialItem } from './speed-dial-item';

@Component({
  selector: 'unf-speed-dial',
  templateUrl: './speed-dial.component.html',
  styleUrls: ['./speed-dial.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeedDialComponent implements OnInit {

  @Input()
  public open = false;
  @Input()
  public items: SpeedDialItem[];

  @Output()
  public toggleEmitter = new EventEmitter<boolean>();
  @Output()
  public itemClickedEmitter = new EventEmitter<SpeedDialItem>();

  constructor() { }

  ngOnInit() {
  }

  /**
   * @description toggle open state, and emit it to listeners
   * @param event 
   */
  public onToggle(event?: UIEvent): void {
    this.open = !this.open;
    this.toggleEmitter.emit(this.open);
  }

  /**
   * @description for angular for loops and change detection
   */
  public trackByFn(index: number, item: object): number {
    return index;
  }

  /**
   * @description handle item click and emit to listeners
   * @param {SpeedDialItem} item that was clicked
   * @param {UIEvent} event optional
   */
  public onMiniFabClick(item: SpeedDialItem, event?: UIEvent): void {
    console.log(`emitting click ${item}`);
    this.itemClickedEmitter.emit(item);
  }
}
