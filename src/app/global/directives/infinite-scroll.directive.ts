
import { fromEvent as observableFromEvent,  Observable  } from 'rxjs';
import { Directive, ElementRef, AfterViewInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Directive({
  selector: '[infiniteScroll]'
})
export class InfiniteScrollDirective implements AfterViewInit, OnDestroy {

  @Input() public bottomOffset = 500;
  @Output() public atBottom = new EventEmitter();
  
  private getScrolls$;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    const scrollEvent$: Observable<any> = observableFromEvent(window, 'scroll');

    const bottomDiv = this.el.nativeElement.querySelector('#bottom');

    this.getScrolls$ = scrollEvent$
      .pipe(
        finalize(() => this.getScrolls$ && this.getScrolls$.unsubscribe())
      )
      .subscribe(
        () => {
          const bottomDivOffset = bottomDiv.offsetTop + bottomDiv.clientHeight;
          const pageOffset = window.pageYOffset + window.innerHeight;
          
          if (pageOffset > bottomDivOffset - this.bottomOffset) {
            this.atBottom.emit(null);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
  
  ngOnDestroy() {
    if (this.getScrolls$) {
       this.getScrolls$.unsubscribe()
    }
  }
}
