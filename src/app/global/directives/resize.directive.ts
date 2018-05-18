import { ElementRef, EventEmitter, OnInit, Directive, Output, OnDestroy } from '@angular/core';
import * as CSSElementQueries from 'css-element-queries';

/**
 * @description copied from angular-resize-event by github/vdolek
 */
export class ResizeEvent {

    constructor(
        public readonly element: ElementRef,
        public readonly oldWidth: number,
        public readonly oldHeight: number,
        public readonly newWidth: number,
        public readonly newHeight: number,
    ) {
    }

}

/**
 * @description Allows a component to listen to DOM changes to its dimensions.
 */
@Directive({
    selector: '[resize]',
})
export class ResizeDirective implements OnInit {

    /**
     * @description 
     */
    private _sensor;

    /**
     * @description 
     */
    private oldWidth;

    private oldHeight;

    /**
     * @description 
     */
    @Output() public readonly resize: EventEmitter<ResizeEvent> = new EventEmitter();

    constructor(
        private readonly element: ElementRef
    ) {
    }

    /**
     * @description 
     */
    public get sensor() { return this._sensor; }

    /**
     * @description 
     */
    ngOnInit() {
        this._sensor = new CSSElementQueries.ResizeSensor(this.element.nativeElement, (x) => this.onResize());
        this.onResize();
    }

    /**
     * @description 
     */
    private onResize() {
        let newWidth = this.element.nativeElement.clientWidth;
        let newHeight = this.element.nativeElement.clientHeight;
        if ((newWidth === this.oldWidth) && (newHeight === this.oldHeight)) {
            return;
        }
        let event = new ResizeEvent(this.element, this.oldWidth, this.oldHeight, newWidth, newHeight);
        this.oldWidth = this.element.nativeElement.clientWidth;
        this.oldHeight = this.element.nativeElement.clientHeight;
        this.resize.emit(event);
    }

}
