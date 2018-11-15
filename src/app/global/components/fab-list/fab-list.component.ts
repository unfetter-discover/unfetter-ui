import { Component, OnInit, Input, ViewChild, HostListener, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectedPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'fab-list',
  templateUrl: './fab-list.component.html',
  styleUrls: ['./fab-list.component.scss']
})
export class FabListComponent implements OnInit {

  // ~~~ Required Inputs ~~~
  /**
   * @description These items will populate the list, only observable data is allowed
   */
  @Input() public items$: Observable<any[]>;
  @Input() public showFab: boolean;
  @Output() public showFabChange = new EventEmitter<boolean>();

  // ~~~ Optional Inputs ~~~
  /**
   * @description This is the property of the item to be emitted
   */
  @Input() public itemIdProperty = 'id';
  /**
   * @description This is the property of the item that will be displayed in the list
   */
  @Input() public itemNameProperty = 'name';
  
  @Output() public tagClicked = new EventEmitter<string>();

  @ViewChild('fab') public fab;
  @ViewChild('searchList') public searchList;

  public searchListHeight = '338';
  public searchListWidth = '226';
  public preferredPosition: ConnectedPosition = { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'top' };
  public positions: ConnectedPosition[] = [
    this.preferredPosition,
    { ...this.preferredPosition, overlayY: 'bottom' },
    { ...this.preferredPosition, originX: 'start', overlayX: 'end' }
  ];

  @HostListener('document:mousedown', ['$event'])
  public clickedOutside(event) {
    if (this.showFab && !this.fab.nativeElement.contains(event.target)) {
      if (this.searchList && this.searchList.nativeElement && this.searchList.nativeElement.contains(event.target)) {
        event.preventDefault();
        return;
      }
      this.showFab = false;
      this.showFabChange.emit(false);
      // Searching is still mostly commented ou in text-highlight component
      // this.searchTerm$.patchValue('');
    }
  }

  constructor() { }

  ngOnInit() {
  }
}
