import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable ,  Subscription ,  BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatTooltip } from '@angular/material';

import { IndicatorSharingService } from '../indicator-sharing.service';
import { FormatHelpers } from '../../global/static/format-helpers';
import { AuthService } from '../../core/services/auth.service';
import { heightCollapse } from '../../global/animations/height-collapse';
import { environment } from '../../../environments/environment';
import { downloadBundle } from '../../global/static/stix-bundle';
import { generateStixRelationship } from '../../global/static/stix-relationship';
import { StixRelationshipTypes } from '../../global/enums/stix-relationship-types.enum';
import { canCrud } from '../../global/static/stix-permissions';
import { SearchParameters } from '../models/search-parameters';
import { GridFSFile } from '../../global/models/grid-fs-file';
import { Constance } from '../../utils/constance';
import { MasterConfig } from '../../core/services/run-config.service';
import { AppState } from '../../root-store/app.reducers';
import { pluck, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'indicator-card',
    templateUrl: 'indicator-card.component.html',
    animations: [heightCollapse],
    styleUrls: ['indicator-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class IndicatorCardComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() public indicator: any;
    @Input() public attackPatterns: any;
    @Input() public intrusionSets: any;
    @Input() public creator: any;
    @Input() public sensors: any;
    @Input() public searchParameters: Observable<SearchParameters>;
    @Input() public collapseAllCardsSubject: BehaviorSubject<boolean>;
    @Input() public userToken: string;
    @Input() public highlightObj = {
        labels: {},
        intrusionSets: {},
        phases: {}
    };

    @Output() public stateChange: EventEmitter<any> = new EventEmitter();
    @Output() public indicatorDeleted: EventEmitter<any> = new EventEmitter();

    public user;
    public showCommentTextArea: boolean = false;
    public message = '';
    public messageTimeout: any;
    public alreadyLiked: boolean = false;
    public alreadyInteracted: boolean = false;
    public alreadyCommented: boolean = false;
    public showAttackPatternDetails: boolean = false;
    public canCrud: boolean = false;
    public collapseContents: boolean = false;
    public copyText: string = 'Copied';
    public blockAttachments: boolean;

    public readonly runMode = environment.runMode;

    private collapseCard$: Subscription;

    private readonly FLASH_MSG_TIMER: number = 1500;
    private readonly FLASH_TOOLTIP_TIMER: number = 500;

    @ViewChild('card') private card: ElementRef;

    constructor(
        private indicatorSharingService: IndicatorSharingService, 
        private store: Store<AppState>,
        private authService: AuthService,
        private renderer: Renderer2,
    ) { }

    public ngOnInit() {
        this.user = this.authService.getUser();
        this.canCrud = canCrud(this.indicator, this.user);

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

        if (this.indicator.metaProperties !== undefined && this.indicator.metaProperties.comments !== undefined && this.indicator.metaProperties.comments.length > 0) {
            const alreadyCommented = this.indicator.metaProperties.comments.find((comment) => comment.user.id === this.user._id);
            if (alreadyCommented) {
                this.alreadyCommented = true;
            }
        }

        if (this.collapseAllCardsSubject) {
            this.collapseCard$ = this.collapseAllCardsSubject
                .subscribe(
                    (collapseContents) => {
                        this.collapseContents = collapseContents;
                    },
                    (err) => {
                        console.log(err);
                    },
                    () => {
                        if (this.collapseCard$) {
                            this.collapseCard$.unsubscribe();
                        }
                    }
                );
        }

        this.store
            .select('config')
            .pipe(
                pluck('runConfig'),
                distinctUntilChanged(),
            )
            .subscribe(
                (cfg: MasterConfig) => {
                    this.blockAttachments = cfg.blockAttachments;
                }
            );
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

    public ngOnDestroy() {
        if (this.collapseCard$) {
            this.collapseCard$.unsubscribe();
        }
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
                        if (addLabel$) {
                            addLabel$.unsubscribe();
                        }
                    }
                );            
        }      
    }

    public submitComment(comment: string) {
        this.showCommentTextArea = false;
        this.flashMessage('Comment Submitted...');
        const addComment$ = this.indicatorSharingService.addComment(comment, this.indicator.id)
            .subscribe(
                (res) => {
                    this.updateIndicatorState(res);
                    this.flashMessage('Comment sucessfully added.');
                },
                (err) => {
                    this.flashMessage('Unable to add comment.');
                    console.log(err);                    
                },
                () => {
                    if (addComment$) {
                        addComment$.unsubscribe();
                    }
                }
            );        
    }

    public whitespaceToBreak(comment: string): string {
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
                    if (addLike$) {
                        addLike$.unsubscribe();
                    }
                }
            );
    }
    
    public publishIndicator() {
        const publish$ = this.indicatorSharingService.publishIndicator(this.indicator.id)
            .subscribe(
                (res) => {
                    this.updateIndicatorState(res.attributes);
                },
                (err) => {
                    this.flashMessage('Unable to publish indicator.');
                    console.log(err);
                },
                () => {
                    if (publish$) {
                        publish$.unsubscribe();
                    }
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
                    if (unLike$) {
                        unLike$.unsubscribe();
                    }
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
                    if (addLike$) {
                        addLike$.unsubscribe();
                    }
                }
            );
    }

    public deleteIndicator() {
        this.indicatorDeleted.emit(this.indicator);
    }

    public exportIndicator() {
        let enhancements: any = {};
        let attackPatternIds: string[] = [];
        let sensorIds: string[] = [];
        let sensorRelationships: any[] = [];
        const indicatorCopy = { ...this.indicator };

        if (indicatorCopy.metaProperties) {
            delete indicatorCopy.metaProperties;
        }

        if (this.indicator.metaProperties && this.indicator.metaProperties.queries) {
            const generatedQueries = { ...this.indicator.metaProperties.queries };
            const queryArr = [];
            for (let name in generatedQueries) {
                queryArr.push({ name, query: generatedQueries[name].query });
            }

            enhancements.x_unfetter_generated_queries = queryArr;
        }

        if (this.indicator.metaProperties && this.indicator.metaProperties.additional_queries) {
            enhancements.x_unfetter_user_queries = [ ...this.indicator.metaProperties.additional_queries ];
        }

        if (this.sensors && this.sensors.length) {
            sensorIds = this.sensors.map((sensor) => sensor.id);
            sensorIds.forEach((sensorId) => {
                sensorRelationships.push(generateStixRelationship(sensorId, this.indicator.id, StixRelationshipTypes.X_UNFETTER_CAN_RUN));
            });
        }

        if (this.attackPatterns && this.attackPatterns.length) {
            attackPatternIds = this.attackPatterns.map((ap) => ap.id);
        }

        const exportObj = {
            ...indicatorCopy,
            ...enhancements
        };

        const downloadData$ = this.indicatorSharingService.getDownloadData([indicatorCopy.id], attackPatternIds, sensorIds)
            .subscribe(
                (downloadData) => {
                    downloadBundle([exportObj, ...sensorRelationships, ...downloadData ], `${this.indicator.name}-enhanced-bundle`);
                },
                (err) => {
                    this.flashMessage('Unable to generate download.');
                    console.log(err);
                },
                () => {
                    downloadData$.unsubscribe();
                }
            );

    }

    public handleCopy(event: { isSuccess: true }, toolTip: MatTooltip) {
        if (!event.isSuccess) {
            this.copyText = 'Copy Failed';
        } else {
            this.copyText = 'Copied';
        }
        this.flashTooltip(toolTip);
    }

    public flashTooltip(toolTip: MatTooltip) {
        toolTip.show();
        setTimeout(() => toolTip.hide(), this.FLASH_TOOLTIP_TIMER);
    }

    public generateAttachmentLink(attachment: GridFSFile): string {
        return `${Constance.DOWNLOAD_URL}/file/${this.indicator.id}/${attachment._id}?authorization=${this.userToken}`;
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
