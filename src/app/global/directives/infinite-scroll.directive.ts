
import {fromEvent as observableFromEvent,  Observable } from 'rxjs';
import { Directive, ElementRef, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';

@Directive({
  selector: '[infiniteScroll]'
})
export class InfiniteScrollDirective implements AfterViewInit {

  @Input() public bottomOffset = 500;
  @Output() public atBottom = new EventEmitter();

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    const scrollEvent$: Observable<any> = observableFromEvent(window, 'scroll');

    const bottomDiv = this.el.nativeElement.querySelector('#bottom');

    const getScrolls$ = scrollEvent$.subscribe(
      () => {
        const bottomDivOffset = bottomDiv.offsetTop + bottomDiv.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;
        
        if (pageOffset > bottomDivOffset - this.bottomOffset) {
          this.atBottom.emit(null);
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        if (getScrolls$) {
          getScrolls$.unsubscribe();
        }
      }
    );
  }  
}
