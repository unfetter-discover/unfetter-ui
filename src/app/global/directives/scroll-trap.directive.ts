import { Directive, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { ElementRef } from '@angular/core';

@Directive({
  selector: '[scrollTrap]'
})
export class ScrollTrapDirective implements AfterViewInit, OnDestroy {

  private listener;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  public ngOnDestroy() {
    if (this.listener) {
      this.listener();
    }
  }

  public ngAfterViewInit() {
    this.listener = this.renderer.listen(this.el.nativeElement, 'wheel', (event: WheelEvent) => {

      const scrollTop = this.el.nativeElement.scrollTop;
      const clientHeight = this.el.nativeElement.clientHeight;
      const scrollHeight = this.el.nativeElement.scrollHeight;
      const wheelDeltaY = event.wheelDeltaY;

      // In case a browser doesn't produce the predicted properties
      if (screenTop === undefined || clientHeight === undefined || scrollHeight === undefined || wheelDeltaY === undefined) {
        return true;
      }

      // At top of element
      if (wheelDeltaY > 0 && scrollTop <= 0 ) {
        return false;
      
      // At bottom of element
      } else if (wheelDeltaY < 0 && scrollTop + clientHeight >= scrollHeight) {
        return false;
      }
      return true;
    });
  }

}
