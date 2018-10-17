import { Component, Input, ViewChild, ElementRef, TemplateRef } from '@angular/core';

/**
 * A generic carousel component. This type of carousel displays items horizontally, each item the same width and height,
 * and spacing between. This component is agnostic to how each item is actually drawn; a component using this one would
 * need to insert an element with a [carousel-item] attribute that would draw them. This component draws the carousel,
 * buttons for scrolling left and right, and pager bullets for faster jumping. It will also handle resizing on the
 * component, recalculating the width of each page, and how many pager bullets there are, etc.
 */
@Component({
    selector: 'feed-carousel',
    templateUrl: './feed-carousel.component.html',
    styleUrls: ['./feed-carousel.component.scss']
})
export class FeedCarouselComponent {

    /**
     * Whether the data has actually been loaded. Distinguishes between having zero elements.
     */
    @Input() loaded: boolean = false;

    /**
     * This component writes a header for the carousel, so a label will let users know what they are seeing.
     */
    @Input() label: string = '';

    /**
     * How many items there are. Note we don't actually need the items themselves, as the user of this component will
     * have to draw them on their own.
     */
    @Input() itemCount: number = 0;

    /**
     * How wide each element in the carousel will be. We have no way to enforce this of the user. We use it for
     * left/right scrolling.
     */
    @Input() itemWidth: number = 210;

    /**
     * How tall each element in the carousel will be. We have no way to enforce this of the user. We use it to properly
     * set the height of glass the scroll buttons are framed in, and for the height of the loading spinner that appears
     * before data has been loaded by the user.
     */
    @Input() itemHeight: number = 210;

    /**
     * The number of pixels between each element in the carousel. We have no way to enforce this of the user. We use it
     * for left/right scrolling.
     */
    @Input() itemSpacing: number = 7;

    @ViewChild('view') itemView: ElementRef;

    /**
     * Notes whenever the mouse is over the carousel, for displaying the scroll buttons.
     */
    public hovering: boolean = false;

    private _itemsPerPage: number;

    private _pages: number = 0;

    private _page: number = 0;

    /**
     * Number of calculated pages in the scroll window.
     */
    public get pages() { return this._pages; }

    /**
     * Current page the carousel is on.
     */
    public get page() { return this._page; }

    /**
     * Calculates the number of pixels to the left the window needs to be at to scroll to the current page.
     */
    public get offset() { return this._page * this._itemsPerPage * -(this.itemWidth + this.itemSpacing); }

    /**
     * Only the resize directive and using components need to call this method. Components should call it after they
     * have loaded data for display within the carousel.
     */
    public calculateWindow() {
        if (!this.itemView) {
            requestAnimationFrame(() => this.calculateWindow());
        } else {
            let perPage = 1;
            const itemWidth = this.itemWidth + this.itemSpacing;
            const itemsWidth = this.itemView.nativeElement.offsetWidth +
                    (Number.parseInt(this.itemView.nativeElement.style['margin-left'] || 0, 10));
            perPage = Math.floor(itemsWidth / itemWidth);
            if (itemsWidth - perPage * itemWidth < this.itemSpacing) {
                perPage++;
            }
            this._itemsPerPage = Math.max(perPage, 1);
            this._pages = Math.ceil(this.itemCount / this._itemsPerPage);
            if (this._page >= this._pages) {
                this._page = this._pages - 1;
            }
        }
    }

    public isFirstPage() {
        return this._page === 0;
    }

    public isLastPage() {
        return this._page >= this._pages - 1;
    }

    public scrollLeft() {
        if (this._page > 0) {
            this._page--;
        }
    }

    public scrollRight() {
        if (this._page < this._pages - 1) {
            this._page++;
        }
    }

    public scrollToPage(pg) {
        const page = Math.max(0, Math.min(pg, this._pages - 1));
        if (this._page !== page) {
            this._page = page;
        }
    }

}
