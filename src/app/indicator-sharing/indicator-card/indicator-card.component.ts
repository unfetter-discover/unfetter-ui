import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, transition, style, animate, query } from '@angular/animations';
import { Observable } from 'rxjs/Observable';

import { IndicatorSharingService } from '../indicator-sharing.service';
import { FormatHelpers } from '../../global/static/format-helpers';
import { AuthService } from '../../core/services/auth.service';
import { heightCollapse } from '../../global/animations/height-collapse';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'indicator-card',
    templateUrl: 'indicator-card.component.html',
    animations: [heightCollapse],
    styleUrls: ['indicator-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class IndicatorCardComponent implements OnInit, AfterViewInit {
    @Input() public indicator: any;
    @Input() public attackPatterns: any;
    @Input() public searchParameters: any;
    @Input() public creator: string;
    @Input() public sensors: any;

    @Output() public stateChange: EventEmitter<any> = new EventEmitter();

    public user;
    public showCommentTextArea: boolean = false;
    public commentText: string = '';
    public message = '';
    public messageTimeout: any;
    public alreadyLiked: boolean = false;
    public alreadyInteracted: boolean = false;
    public readonly runMode = environment.runMode;

    private readonly FLASH_MSG_TIMER: number = 1500;

    @ViewChild('card') private card: ElementRef;

    constructor(
        private indicatorSharingService: IndicatorSharingService, 
        private authService: AuthService,
        private renderer: Renderer2
    ) { }

    public ngOnInit() {
        this.user = this.authService.getUser();
        if (this.indicator.metaProperties !== undefined && this.indicator.metaProperties.likes !== undefined && this.indicator.metaProperties.likes.length > 0) {
            const alreadyLiked = this.indicator.metaProperties.likes.find((like) => like.user.id === this.user._id);
            if (alreadyLiked) {
                this.alreadyLiked = true;
            }
        } 

        if (this.indicator.metaProperties !== undefined && this.indicator.metaProperties.interactions !== undefined && this.indicator.metaProperties.interactions.length > 0) {
            const alreadyInteracted = this.indicator.metaProperties.interactions.find((interactions) => interactions.user.id === this.user._id);
            if (alreadyInteracted) {
                this.alreadyInteracted = true;
            }
        } 
    }

    public ngAfterViewInit() {
        // Only add listener for interactions if the user never interacted with it
        if (!this.alreadyInteracted && this.runMode !== undefined && this.runMode === 'UAC') {
            const removeListener = this.renderer.listen(this.card.nativeElement, 'click', () => {
                this.addInteraction();
                // Remove listener after interaction
                // NOTE renderer.listen returns a method to remove the listener, slightly counterintuitive
                removeListener();
            });  
        }           
    }

    public highlightPhase(phase) {
        return this.searchParameters.killChainPhases.length > 0 && this.searchParameters.killChainPhases.includes(phase);
    }

    public labelSelected(label) {
        return this.searchParameters.labels.length > 0 && this.searchParameters.labels.includes(label);
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

    public whitespaceToBreak(comment) {
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

    public unlikeIndicator() {
        const unLike$ = this.indicatorSharingService.unlike(this.indicator.id)
            .subscribe(
                (res) => {
                    this.updateIndicatorState(res.attributes);
                    this.alreadyLiked = false;
                },
                (err) => {
                    this.flashMessage('Unable to unlike indicator.');
                    console.log(err);
                },
                () => {
                    unLike$.unsubscribe();
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
