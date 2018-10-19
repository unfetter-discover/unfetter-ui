import { Component, ElementRef, ViewChild, Input, HostListener, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { Observable, of as observableOf} from 'rxjs';
import { startWith, withLatestFrom, switchMap, debounceTime, map } from 'rxjs/operators';
import { RxjsHelpers } from '../../static/rxjs-helpers';

@Component({
  selector: 'text-highlight',
  templateUrl: './text-highlight.component.html',
  styleUrls: ['./text-highlight.component.scss']
})
export class TextHighlightComponent implements OnInit {

  @Input()
  public action: 'QUOTE' | 'TAG' = 'QUOTE';
  @Input()
  public toolTipText = 'Quote Text';
  @Input()
  public stix$: Observable<any[]> = observableOf([]);
  @Output()
  public fabClicked = new EventEmitter<Selection>();
  @Output()
  public tagClicked = new EventEmitter<{ selection: Selection, id: string }>();
  @ViewChild('fab')
  public fab: ElementRef;
  @ViewChild('searchList')
  public searchList: ElementRef;
  public get showFab() { return this._showFab; }
  public set showFab(v: boolean) { 
    if (!v) { this.selection = null; }
    this._showFab = v;
  }

  public searchListHeight = '338';
  public searchListWidth = '226';

  public searchTerm$ = new FormControl('');
  public searchResults$: Observable<any[]> = observableOf([]);

  public preferredPosition: ConnectedPosition = { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'top' };
  public positions: ConnectedPosition[] = [
    this.preferredPosition,
    { ...this.preferredPosition, overlayY: 'bottom' },
    { ...this.preferredPosition, originX: 'start', overlayX: 'end' }
  ];

  private readonly FAB_HEIGHT = 40;
  private _showFab = false;
  private selection: Selection;  
  private recentTagIds: string[] = [];

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.searchResults$ = this.searchTerm$.valueChanges
      .pipe(
        startWith(this.searchTerm$.value),
        map((searchTerm) => searchTerm.toLowerCase()),
        debounceTime(30),
        withLatestFrom(this.stix$),
        map(([searchTerm, stix]) => {
          if (!searchTerm) {
            return stix;
          } else {
            return stix.filter((st) => st.name && st.name.toLowerCase().indexOf(searchTerm) > -1);
          }
        }),
        RxjsHelpers.sortByField('name', 'ASCENDING')
      );
  }

  @HostListener('document:mousedown', ['$event'])
  public clickedOutside(event) {
    if (this.showFab && !this.fab.nativeElement.contains(event.target)) {
      if (this.action === 'TAG' && this.searchList && this.searchList.nativeElement && this.searchList.nativeElement.contains(event.target)) {
        event.preventDefault();
        return;
      }
      this.showFab = false;
      this.searchTerm$.patchValue('');
    }
  }

  public mouseUp(e: MouseEvent) {
    this.selection = window.getSelection();
    const selectedText = this.selection.toString();
    const selectionRange = this.selection.getRangeAt(0);
    if (selectedText && selectedText.match(/\w/) && this.elementRef.nativeElement.contains(this.selection.anchorNode)) {
      const { top: relativeTop, left: relativeLeft } = this.elementRef.nativeElement.getBoundingClientRect();
      const { left, height, top, width } = this.selection.getRangeAt(0).getBoundingClientRect();
      this.fab.nativeElement.style.left = `${(left + width) - relativeLeft}px`;
      this.fab.nativeElement.style.top = `${(top + (height / 2 - this.FAB_HEIGHT / 2)) - relativeTop}px`;
      this.showFab = true;
    }
  }

  public onClick() {
    this.fabClicked.emit(this.selection);
    this.showFab = false;
  }

  public onTagClick(id: string) {
    const idSet = new Set([...this.recentTagIds, id]);
    this.recentTagIds = Array.from(idSet);
    this.tagClicked.emit({
      id,
      selection: this.selection 
    });
    this.showFab = false;
    this.searchTerm$.patchValue('');
  }
}
