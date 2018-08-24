import {
    Directive,
    Component,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    OnDestroy,
    Input,
    ElementRef,
    TemplateRef,
    ContentChildren,
    ViewChild,
    QueryList,
    Renderer2,
    Output,
    EventEmitter,
    ChangeDetectorRef,
} from '@angular/core';

import { CarouselOptions } from './carousel.data';

@Directive({
    selector: '[primes]',
})
export class PrimedDirective {

    @Input() primes: string;

    constructor(
        public template: TemplateRef<any>
    ) {
    }

    getType(): string {
        return this.primes;
    }

}

@Component({
    selector: 'unf-carousel',
    templateUrl: './unf-carousel.component.html',
    styleUrls: ['./unf-carousel.component.scss']
})
export class UnfetterCarouselComponent implements AfterContentInit, AfterViewChecked, AfterViewInit, OnDestroy {

    public _items: any[];

    public differ: any;

    private itemsChanged: boolean;

    @Input() options: CarouselOptions;

    public columns: number = 3;

    public columnWidth: number = 1;

    public columnMargin: number = 1;

    public viewportPosition: any = 0;

    public page: number = 0;

    @ViewChild('container') containerViewChild: ElementRef;

    @ViewChild('viewport') viewportViewChild: ElementRef;

    @ViewChild('items') itemsViewChild: ElementRef;

    @ContentChildren(PrimedDirective) templates: QueryList<any>;

    public itemTemplate: TemplateRef<any>;

    private itemChildren: any;

    private documentResponsiveListener: any;

    @Output() onPage: EventEmitter<any> = new EventEmitter();

    constructor(
        public el: ElementRef,
        public renderer: Renderer2,
        public cd: ChangeDetectorRef,
    ) {
    }

    @Input() get value(): any[] {
        return this._items;
    }

    set value(items: any[]) {
        this._items = items;
        this.itemsChanged = true;
    }

    get totalPages(): number {
        return (this._items && this._items.length) ? Math.ceil(this._items.length / this.columns) : 1;
    }

    ngAfterContentInit() {
        this.templates.forEach(item => {
            this.itemTemplate = item.template;
        });
    }

    ngAfterViewChecked() {
        if (this.itemsChanged && this.containerViewChild.nativeElement.offsetParent) {
            this.render();
            this.itemsChanged = false;
        }
    }

    ngAfterViewInit() {
        this.documentResponsiveListener = this.renderer.listen('window', 'resize', (event) => {
            this.render();
        });
    }

    render() {
        this.itemChildren = Array.from(this.itemsViewChild.nativeElement.querySelectorAll('li'));
        this.calculateColumns();
        this.setPage(this.page, true);
        this.cd.detectChanges();
    }

    calculateColumns() {
        const offsetWidth = this.viewportViewChild.nativeElement.offsetWidth;
        const style = getComputedStyle(this.viewportViewChild.nativeElement);
        const width = offsetWidth + parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        this.columns = Math.max(1, Math.floor(width / this.options.columnWidth));
        this.columnWidth = offsetWidth / this.columns;
    }

    onNextNav() {
        this.setPage(this.page + 1);
    }

    onPrevNav() {
        this.setPage(this.page - 1);
    }

    setPageWithLink(event, p: number) {
        this.setPage(p);
        event.preventDefault();
    }

    setPage(page, enforce?: boolean) {
        if (page < 0) {
            page = 0;
        } else if (page >= this.totalPages) {
            page = this.totalPages - 1;
        }
        if (((page >= 0) && (page <= this.totalPages)) && ((page !== this.page) || enforce)) {
            this.page = page;
            const offsetWidth = this.viewportViewChild.nativeElement.offsetWidth;
            const style = getComputedStyle(this.viewportViewChild.nativeElement);
            const width = offsetWidth + parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
            this.viewportPosition = -(width * page);
            this.onPage.emit({
                page: this.page
            });
        }
    }

    ngOnDestroy() {
        if (this.documentResponsiveListener) {
            this.documentResponsiveListener();
        }
    }

}
