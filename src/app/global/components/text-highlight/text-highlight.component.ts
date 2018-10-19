import { Component, ElementRef, ViewChild, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { Observable, of as observableOf} from 'rxjs';

@Component({
  selector: 'text-highlight',
  templateUrl: './text-highlight.component.html',
  styleUrls: ['./text-highlight.component.scss']
})
export class TextHighlightComponent {

  @Input()
  public action: 'QUOTE' | 'TAG' = 'QUOTE';
  @Input()
  public toolTipText = 'Quote Text';
  @Input()
  public stix$: Observable<any> = observableOf([]);
  @Output()
  public fabClicked = new EventEmitter<Selection>();
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

  public preferredPosition: ConnectedPosition = { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'top' };
  public positions: ConnectedPosition[] = [
    this.preferredPosition,
    { ...this.preferredPosition, overlayY: 'bottom' },
    { ...this.preferredPosition, originX: 'start', overlayX: 'end' }
  ];

  private readonly FAB_HEIGHT = 40;
  private _showFab = false;
  private selection: Selection;
  

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:mousedown', ['$event'])
  public clickedOutside(event) {
    if (this.showFab && !this.fab.nativeElement.contains(event.target)) {
      if (this.action === 'TAG' && this.searchList.nativeElement && this.searchList.nativeElement.contains(event.target)) {
        return;
      }
      this.showFab = false;
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
  }
}
