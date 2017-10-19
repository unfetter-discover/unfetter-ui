import { Component, Input } from '@angular/core';

import { IndicatorSharingService } from '../indicator-sharing.service';
import { FormatHelpers } from '../../global/static/format-helpers';

@Component({
    selector: 'indicator-card',
    templateUrl: 'indicator-card.component.html',
    styleUrls: ['indicator-card.component.scss']
})

export class IndicatorCardComponent {
    @Input() public indicator: any;
    @Input() public attackPatterns: any;
    @Input() public searchParameters: any;
    
    public showCommentTextArea: boolean = false;
    public commentText: string = '';
    public message = '';

    constructor(private indicatorSharingService: IndicatorSharingService) { }

    public labelSelected(label) {
        return this.searchParameters.labels.length !== this.searchParameters.activeLabels.length && this.searchParameters.activeLabels.includes(label);
    }

    public submitComment() {
        const comment = this.commentText;
        this.showCommentTextArea = false;
        this.message = 'Comment Submitted...';
        const addComment$ = this.indicatorSharingService.addComment(comment, this.indicator.id)
            .subscribe(
                (res) => {
                    this.indicator = res.attributes;
                    this.commentText = ''; 
                    this.message = 'Comment sucessfully added.';
                    setTimeout(() => this.message = '', 1500);
                },
                (err) => {
                    console.log(err);                    
                },
                () => {
                    addComment$.unsubscribe();
                }
            );        
    }

    public formatComment(comment) {
        return FormatHelpers.whitespaceToBreak(comment);
    }
}
