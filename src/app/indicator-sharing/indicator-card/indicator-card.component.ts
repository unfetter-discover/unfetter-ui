import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { trigger, state, transition, style, animate, query } from '@angular/animations';
import { Observable } from 'rxjs/Observable';

import { IndicatorSharingService } from '../indicator-sharing.service';
import { FormatHelpers } from '../../global/static/format-helpers';
import { AuthService } from '../../global/services/auth.service';
import { heightCollapse } from '../../global/animations/height-collapse';

@Component({
    selector: 'indicator-card',
    templateUrl: 'indicator-card.component.html',
    animations: [heightCollapse],
    styleUrls: ['indicator-card.component.scss']
})

export class IndicatorCardComponent implements OnInit, AfterViewInit {
    @Input() public indicator: any;
    @Input() public attackPatterns: any;
    @Input() public searchParameters: any;
    @Input() public creator: string;

    @Output() public stateChange: EventEmitter<any> = new EventEmitter();

    public user;
    public showCommentTextArea: boolean = false;
    public commentText: string = '';
    public message = '';
    public messageTimeout: any;
    public alreadyLiked: boolean = false;
    public alreadyInteracted: boolean = false;

    private readonly FLASH_MSG_TIMER: number = 1500;

    @ViewChild('card') private card: ElementRef;

    constructor(
        private indicatorSharingService: IndicatorSharingService, 
        private authService: AuthService,
        private renderer: Renderer2
    ) { }

    public ngOnInit() {
        this.user = this.authService.getUser();
        if (this.indicator.likes !== undefined && this.indicator.likes.length > 0) {
            const alreadyLiked = this.indicator.likes.find((like) => like.user.id === this.user._id);
            if (alreadyLiked) {
                this.alreadyLiked = true;
            }
        } 

        if (this.indicator.interactions !== undefined && this.indicator.interactions.length > 0) {
            const alreadyInteracted = this.indicator.interactions.find((interactions) => interactions.user.id === this.user._id);
            if (alreadyInteracted) {
                this.alreadyInteracted = true;
            }
        } 
    }

    public ngAfterViewInit() {
        // Only add listener for interactions if the user never interacted with it
        if (!this.alreadyInteracted) {
            const removeListener = this.renderer.listen(this.card.nativeElement, 'click', () => {
                this.addInteraction();
                // Remove listener after interaction
                // NOTE renderer.listen returns a method to remove the listener, slightly counterintuitive
                removeListener();
            });  
        }           
    }

    public highlightPhase(phase) {
        return this.searchParameters.activeKillChainPhases.length && this.searchParameters.activeKillChainPhases.includes(phase);
    }

    public labelSelected(label) {
        return this.searchParameters.labels.length !== this.searchParameters.activeLabels.length && this.searchParameters.activeLabels.includes(label);
    }

    public addLabel(label) {
        if (label.length > 0) {
            const newLabel = label;
            const addLabel$ = this.indicatorSharingService.addLabel(newLabel, this.indicator.id)
                .subscribe(
                    (res) => {
                        this.updateIndicatorState(res.attributes);
                        this.flashMessage('Label sucessfully added.');
                    },
                    (err) => {
                        this.flashMessage('Unable to add label.');
                        console.log(err);                                
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
        this.flashMessage('Comment Submitted...');
        const addComment$ = this.indicatorSharingService.addComment(comment, this.indicator.id)
            .subscribe(
                (res) => {
                    this.updateIndicatorState(res.attributes);
                    this.flashMessage('Comment sucessfully added.');
                    this.commentText = ''; 
                },
                (err) => {
                    this.flashMessage('Unable to add comment.');
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
                    this.updateIndicatorState(res.attributes);
                    this.alreadyLiked = true;
                },
                (err) => {
                    this.flashMessage('Unable to like indicator.');
                    console.log(err);                    
                },
                () => {
                    addLike$.unsubscribe();
                }
            );
    }

    public addInteraction() {
        // Set this to true immediantly to prevent errors from double clicking
        this.alreadyInteracted = true;
        const addLike$ = this.indicatorSharingService.addInteraction(this.indicator.id)
            .subscribe(
                (res) => {
                    this.indicator = res.attributes;                    
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    addLike$.unsubscribe();
                }
            );
    }

    private flashMessage(msg: string) {
        this.message = msg;
        clearTimeout(this.messageTimeout);
        this.messageTimeout = setTimeout(() => this.message = '', this.FLASH_MSG_TIMER); 
    }

    private updateIndicatorState(newIndicatorState) {
        this.indicator = newIndicatorState;
        this.stateChange.emit(this.indicator);
    }
}
