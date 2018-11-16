import { Component, OnInit, Input, ViewChild, HostListener, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { startWith, map, debounceTime, withLatestFrom } from 'rxjs/operators';
import { RxjsHelpers } from '../../static/rxjs-helpers';

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
  
  public searchTerm$ = new FormControl('');
  public searchResults$: Observable<any[]>;
  public searchListHeight = '338';
  public searchListWidth = '226';
  public preferredPosition: ConnectedPosition = { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'top' };
  public positions: ConnectedPosition[] = [
    this.preferredPosition,
    { ...this.preferredPosition, overlayY: 'bottom' },
    { ...this.preferredPosition, originX: 'start', overlayX: 'end' }
  ];
  public showList = false;

  @HostListener('document:mousedown', ['$event'])
  public clickedOutside(event) {
    if (this.showFab && !this.fab.nativeElement.contains(event.target)) {
      if (this.searchList && this.searchList.nativeElement && this.searchList.nativeElement.contains(event.target)) {
        event.preventDefault();
        return;
      }
      this.showFab = false;
      this.searchTerm$.patchValue('');
    }
  }

  ngOnInit() {
    this.searchResults$ = this.searchTerm$.valueChanges
      .pipe(
        startWith(this.searchTerm$.value),
        map((searchTerm) => searchTerm.toLowerCase()),
        debounceTime(30),
        withLatestFrom(this.items$),
        map(([searchTerm, item]) => {
          if (!searchTerm) {
            return item;
          } else {
            return item.filter((st) => st[this.itemNameProperty] && st[this.itemNameProperty].toLowerCase().indexOf(searchTerm) > -1);
          }
        }),
        RxjsHelpers.sortByField('name', 'ASCENDING')
      );
  }

  public onTagClick(val) {
    this.tagClicked.emit(val);
    this.showFabChange.emit(false);
    this.searchTerm$.patchValue('');
  }
}
