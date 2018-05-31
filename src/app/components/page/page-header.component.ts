import { Component, Input } from '@angular/core';

@Component({
    selector: 'page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {

    @Input() public pageTitle: string;
    @Input() public svgIcon: string;
    @Input() public pageIcon: string;
    @Input() public description: string;
    public showDescription: boolean = true;

    public toggleDescription(event): void {
        event.preventDefault();
        this.showDescription = !this.showDescription;
    }

}
