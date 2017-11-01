import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

import { IndicatorSharingService } from '../indicator-sharing.service';
import { FormatHelpers } from '../../global/static/format-helpers';
import { AuthService } from '../../global/services/auth.service';

@Component({
    selector: 'indicator-card',
    templateUrl: 'indicator-card.component.html',
    animations: [
        trigger('collapseLevel', [
            state('open', style({ opacity: 1, height: '*' })),
            state('closed', style({ opacity: 0, height: 0 })),
            transition('open <=> closed', animate('200ms ease-in-out')),
        ])
    ],
    styleUrls: ['indicator-card.component.scss']
})

export class IndicatorCardComponent implements OnInit {
    @Input() public indicator: any;
    @Input() public attackPatterns: any;
    @Input() public searchParameters: any;
    @Input() public creator: string;
    
    public user;
    public showCommentTextArea: boolean = false;
    public showAddLabel: boolean = false;
    public commentText: string = '';
    public newLabelText: string = '';
    public message = '';
    public alreadyLiked: boolean = false;

    constructor(private indicatorSharingService: IndicatorSharingService, private authService: AuthService) { }

    public ngOnInit() {
        this.user = this.authService.getUser();
        if (this.indicator.likes !== undefined && this.indicator.likes.length > 0) {
            const alreadyLiked = this.indicator.likes.find((like) => like.user.id === this.user._id);
            if (alreadyLiked) {
                this.alreadyLiked = true;
            }
        } 
    }

    public labelSelected(label) {
        return this.searchParameters.labels.length !== this.searchParameters.activeLabels.length && this.searchParameters.activeLabels.includes(label);
    }

    public addLabel() {
        if (this.newLabelText.length > 0) {
            const newLabel = this.newLabelText;
            this.newLabelText = '';
            this.showAddLabel = false;
            const addLabel$ = this.indicatorSharingService.addLabel(newLabel, this.indicator.id)
                .subscribe(
                    (res) => {
                        this.indicator = res.attributes;
                        this.message = 'Label sucessfully added.';
                        setTimeout(() => this.message = '', 1500); 
                    },
                    (err) => {
                        console.log(err);          
                        this.message = 'Unable to add label.';
                        setTimeout(() => this.message = '', 1500);                                    
                    },
                    () => {
                        addLabel$.unsubscribe();
                    }
                );            
        }       
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

    public likeIndicator() {               
        const addLike$ = this.indicatorSharingService.addLike(this.indicator.id)
            .subscribe(
                (res) => {
                    this.indicator = res.attributes;
                    this.alreadyLiked = true;
                },
                (err) => {
                    console.log(err);                    
                },
                () => {
                    addLike$.unsubscribe();
                }
            );
    }
}
