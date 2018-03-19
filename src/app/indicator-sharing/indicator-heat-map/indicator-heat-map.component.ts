import {
        Component,
        OnInit,
        Inject,
        Input,
        ViewChild,
        ElementRef,
        TemplateRef,
        ViewContainerRef,
        ChangeDetectorRef,
    } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { IndicatorSharingFeatureState } from '../store/indicator-sharing.reducers';
import { GenericApi } from '../../core/services/genericapi.service';
import { Constance } from '../../utils/constance';

@Component({
    selector: 'indicator-heat-map',
    templateUrl: './indicator-heat-map.component.html',
    styleUrls: ['./indicator-heat-map.component.scss']
})
export class IndicatorHeatMapComponent implements OnInit {

    public heatmap: any[] = [];
    @Input() heatmapOptions = {
        batchColors: [
            {header: {bg: 'transparent', fg: '#333'}, body: {bg: 'transparent', fg: 'black'}},
        ],
        heatColors: {
            'true': {bg: '#b2ebf2', fg: 'black'},
            'false': {bg: '#ccc', fg: 'black'},
            'selected': {bg: '#33a0b0', fg: 'black'},
        },
        showText: false
    }

    public attackPatterns = {};
    public attackPattern = null;
    public selectedPatterns = [];

    /**
     * @description "indicators" is the old reference to "analytics" used in this page
     */
    private indicators: any[];
    private displayIndicators: any[];
    private indicatorsToAttackPatternMap: any;

    @ViewChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;
    private overlayRef: OverlayRef;
    private portal: TemplatePortal<any>;

    @ViewChild('indicatorsGrid') indicatorsGrid: ElementRef;

    constructor(
        public store: Store<IndicatorSharingFeatureState>,
        public dialogRef: MatDialogRef<IndicatorHeatMapComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public genericApi: GenericApi,
        private overlay: Overlay,
        private vcr: ViewContainerRef,
        private changeDetector: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        this.indicators = this.displayIndicators = this.data.indicators || [];
        this.loadIndicatorMap();
        this.loadAttackPatterns();
    }

    /**
     * @description retrieve the indicators-to-attack-patterns map from the ngrx store
     */
    private loadIndicatorMap() {
        const getIndicatorToAttackPatternMap$ = this.store
            .select('indicatorSharing')
            .pluck('indicatorToApMap')
            .distinctUntilChanged()
            .finally(() => getIndicatorToAttackPatternMap$.unsubscribe())
            .subscribe(
                (indicatorToAttackPatternMap) => this.indicatorsToAttackPatternMap = indicatorToAttackPatternMap,
                (err) => console.log(err)
            );
    }

    /**
     * @description retrieve the attack patterns and their tactics phases from the backend database
     */
    private loadAttackPatterns() {
        const sort = { 'stix.name': '1' };
        const project = {
            'stix.name': 1,
            'stix.description': 1,
            'stix.kill_chain_phases': 1,
            'extendedProperties.x_mitre_data_sources': 1,
            'extendedProperties.x_mitre_platforms': 1,
            'stix.id': 1,
        };
        const filter = encodeURI(`sort=${JSON.stringify(sort)}&project=${JSON.stringify(project)}`);
        const initData$ = this.genericApi.get(`${Constance.ATTACK_PATTERN_URL}?${filter}`)
            .finally(() => initData$.unsubscribe())
            .subscribe(
                (results: any[]) => {
                    const indicators = this.groupIndicatorsByAttackPatterns();
                    const collects = {attackPatterns: {}, phases: {}};
                    this.attackPatterns = results.reduce(
                        (collect, pattern) => this.collectAttackPatterns(collect, pattern), collects).attackPatterns;
                    this.heatmap = this.groupAttackPatternsByKillchain(collects.phases, indicators);
                    console.log('resulting heatmap', this.heatmap);
                },
                (err) => console.log(err)
            );
    }

    /**
     * @description create a map of attack patterns and their indicators (inverted indicators-to-attack-patterns map)
     */
    private groupIndicatorsByAttackPatterns() {
        const indicatorIds = this.indicators.map(indicator => indicator.id);
        const patternIndicators = {};
        Object.entries(this.indicatorsToAttackPatternMap)
            .filter(indicator => indicatorIds.includes(indicator[0]))
            .forEach(([indicator, patterns]) => {
                if (patterns && (patterns as any[]).length) {
                    (patterns as any[]).forEach((p: any) => {
                        if (!patternIndicators[p.name]) {
                            patternIndicators[p.name] = [];
                        }
                        patternIndicators[p.name].push(indicator);
                    });
                }
            });
        return patternIndicators;
    }

    /**
     * @description now group up all the phases and the attack patterns they have, for the heatmap display
     */
    private collectAttackPatterns(collects, pattern) {
        const name = pattern.attributes.name;
        if (name) {
            collects.attackPatterns[name] = Object.assign({}, {
                batch: name,
                name: name,
                id: pattern.attributes.id,
                description: pattern.attributes.description,
                phases: (pattern.attributes.kill_chain_phases || []).map(p => p.phase_name),
                sources: pattern.attributes.x_mitre_data_sources,
                platforms: pattern.attributes.x_mitre_platforms,
                indicators: [],
                active: false,
            });
        }

        (pattern.attributes.kill_chain_phases || [])
            .forEach(p => {
                const batch = p.phase_name
                    .replace(/\-/g, ' ')
                    .split(/\s+/)
                    .map(w => w[0].toUpperCase() + w.slice(1))
                    .join(' ')
                    .replace(/\sAnd\s/g, ' and ')
                    ;
                collects.phases[p.phase_name] = {
                    batch: batch,
                    active: null,
                    columns: [[]],
                };
            });

        return collects;
    }

    private groupAttackPatternsByKillchain(tactics: any, indicators: any): any[] {
        Object.values(this.attackPatterns).forEach((attackPattern: any) => {
            const phases = attackPattern.phases;
            if (phases) {
                phases.forEach((phase) => {
                    let group = tactics[phase];
                    if (group) {
                        attackPattern.indicators = indicators[attackPattern.name] || [];
                        attackPattern.active = attackPattern.indicators.length > 0;
                        group.columns[0].push(attackPattern);
                    }
                });
            }
        });
        return Object.values(tactics);
    }

    /**
     * @description display a tooltip for the attack pattern the user is hovering over
     */
    public onTooltip(selection?: any) {
        if (!selection || !selection.row || !selection.row.name) {
            this.hideTooltip();
        } else {
            let attackPattern = this.attackPatterns[selection.row.name];
            if (attackPattern && (!this.attackPattern || (this.attackPattern.name !== attackPattern.name))) {
                this.attackPattern = attackPattern;
                this.showTooltip(selection.event);
            } else {
                this.hideTooltip();
            }
        }
    }

    private showTooltip(event: UIEvent) {
        if (!this.overlayRef) {
            const elem = new ElementRef(event.target);

            const positionStrategy = this.overlay.position()
              .connectedTo(elem,
                {originX: 'center', originY: 'bottom'},
                {overlayX: 'start', overlayY: 'top'})
              .withFallbackPosition(
                {originX: 'center', originY: 'top'},
                {overlayX: 'start', overlayY: 'bottom'})
              .withFallbackPosition(
                {originX: 'center', originY: 'bottom'},
                {overlayX: 'end', overlayY: 'top'})
              .withFallbackPosition(
                {originX: 'center', originY: 'bottom'},
                {overlayX: 'end', overlayY: 'bottom'});

            this.overlayRef = this.overlay.create({
                minWidth: 300,
                maxWidth: 500,
                hasBackdrop: false,
                positionStrategy,
                scrollStrategy: this.overlay.scrollStrategies.reposition()
            });

            const sub$ = this.overlayRef.backdropClick()
                .finally(() => sub$.unsubscribe())
                .subscribe(
                    () => this.hideTooltip(),
                    (err) => console.log(err));

            this.portal = new TemplatePortal(this.tooltipTemplate, this.vcr);
        }

        this.overlayRef.attach(this.portal);
    }

    private hideTooltip() {
        this.attackPattern = null;
        if (this.overlayRef) {
            this.overlayRef.detach();
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }

    /**
     * @description when clicked, highlight the analytics targeting the attack pattern
     */
    public highlightAttackPatternAnalytics(clicked?: any) {
        console.log('clicked', clicked, this.indicatorsGrid.nativeElement);
        if (clicked && clicked.row) {
            const index = this.selectedPatterns.findIndex(pattern => pattern.id === clicked.row.id);
            console.log('pattern index', index);
            if (index < 0) {
                // pattern was not previously selected; select it
                this.selectedPatterns.push(clicked.row);
                if (clicked.event && clicked.event.path && clicked.event.path.length) {
                    console.log('event path', clicked.event.path);
                    const rect = clicked.event.path.find(node => node && (node.localName === 'rect'));
                    console.log('event rect', rect);
                    if (rect && rect.attributes) {
                        console.log('rect attrs', rect.attributes, rect.attributes.getNamedItem('class'));
                        const cls = document.createAttribute('class');
                        cls.value = 'selected';
                        rect.attributes.setNamedItem(cls);
                    }
                }
            } else {
                // remove the pattern from our selection list
                this.selectedPatterns.splice(index, 1);
                if (event && clicked.event.path && clicked.event.path.length) {
                    const rect = clicked.event.path.find(node => node && (node.localName === 'rect'));
                    console.log('event rect', rect);
                    if (rect && rect.attributes) {
                        console.log('rect attrs', rect.attributes, rect.attributes.getNamedItem('class'));
                        rect.attributes.removeNamedItem('class');
                    }
                }
            }

            // update the analytics list
            console.log('selected patterns', this.selectedPatterns);
            if (this.selectedPatterns.length === 0) {
                requestAnimationFrame(() => this.displayIndicators = this.indicators);
            } else {
                const selectedIndicators = this.selectedPatterns.reduce(
                    (indicators, pattern) => {
                        indicators.push(...pattern.indicators);
                        return indicators;
                    }, []);
                console.log('selected indicators', selectedIndicators);
                requestAnimationFrame(() => this.displayIndicators =
                        this.indicators.filter(indicator => selectedIndicators.includes(indicator.id)));
            }
        }
    }
  
}
