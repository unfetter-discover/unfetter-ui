import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { pluck, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../root-store/app.reducers';
import { MarkingDefinition } from 'stix';

@Component({
    selector: 'markings-chips',
    templateUrl: './markings-chips.component.html',
    styleUrls: ['./markings-chips.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkingsChipsComponent implements OnInit, OnChanges {

    @Input() public model: any;
    @Input() public disableTooltips = false;

    private _markings = [];

    private markingDefinitions = { loaded: false };
    private definitionTypeOrder = ['capco', 'tlp', 'rating', 'statement'];
    private capcoOrder = ['Classification', 'Compartment', 'Access', 'Dissemination'];
    private tlpOrder = ['white', 'green', 'amber', 'red'];

    constructor(
        private store: Store<fromRoot.AppState>,
        private chgDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        const markings$ = this.store.select('stix')
            .pipe(
                pluck('markingDefinitions'),
                distinctUntilChanged()
            )
            .subscribe(
                (markings: MarkingDefinition[]) => {
                    this.markingDefinitions = markings
                        .sort((a, b) => this.sortMarkings(a, b))
                        .reduce((defs, marking) => {
                            if (marking && marking.id) {
                                defs[marking.id] = marking;
                            }
                            return defs;
                        }, { loaded: false });
                    this.markingDefinitions.loaded = true;
                    this.setMarkings(this.model);
                },
                err => console.log('error loading marking definitions', err),
                () => markings$ && markings$.unsubscribe()
            );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.markingDefinitions.loaded && changes && changes.model) {
            this.setMarkings(changes.model.currentValue);
        }
    }

    /*
     * Convert the given model's markings into a detailed set 
     */
    private setMarkings(model: any) {
        const markings = [];
        if (model && model.object_marking_refs) {
            const capco = {
                Classification: [],
                Compartment: [],
                Access: [],
                Dissemination: []
            };
            model.object_marking_refs.forEach(marking => {
                const def = this.markingDefinitions[marking];
                if (def && def.definition && def.definition_type) {
                    switch (def.definition_type) {
                        case 'tlp':
                            markings.push({color: def.definition.tlp, text: `TLP: ${def.definition.tlp}`});
                            break;
                        case 'rating':
                            markings.push({
                                color: null,
                                text: `Rating: (${def.definition.rating}) ${def.definition.label}`
                            });
                            break;
                        case 'statement':
                            markings.push({color: 'white', text: def.definition.statement});
                            break;
                        case 'capco':
                            if (def.definition.category) {
                                capco[def.definition.category].push(def.definition);
                            }
                            break;
                    }
                }
            });

            if (capco.Classification.length) {
                if (!capco.Compartment.length) {
                    delete capco.Compartment;
                }
                if (!capco.Access.length) {
                    delete capco.Access;
                }
                if (!capco.Dissemination.length) {
                    delete capco.Dissemination;
                }
                const marking = Object.values(capco).reduce((m, arr) => {
                    m.texts.push(arr.map(a => a.text).join(' / '));
                    m.portions.push(arr.map(a => a.portion).join('/'));
                    return m;
                }, {color: null, text: '', texts: [], portion: '', portions: []});
                marking.text = marking.texts.join(' // ');
                marking.portion = marking.portions.join('//');
                markings.unshift(marking);
            }
        }
        this._markings = markings;

        this.chgDetectorRef.markForCheck();
    }

    // TODO update MarkingDefinition in stix package
    private sortMarkings(a: MarkingDefinition | any, b: MarkingDefinition | any) {
        const aType = this.definitionTypeOrder.indexOf(a.definition_type);
        const bType = this.definitionTypeOrder.indexOf(b.definition_type);
        const typeOrder = aType - bType;
        if (typeOrder !== 0) {
            return typeOrder;
        }
        if (a.definition_type === 'capco') {
            const aCat = this.capcoOrder.indexOf(a.definition.category);
            const bCat = this.capcoOrder.indexOf(b.definition.category);
            const catOrder = aCat - bCat;
            if (catOrder !== 0) {
                return catOrder;
            }
            const precedence = a.definition.precedence - b.definition.precedence;
            if (precedence !== 0) {
                return precedence;
            }
            return a.definition.text.localeCompare(b.definition.text);
        }
        if (a.definition_type === 'tlp') {
            return this.tlpOrder.indexOf(a.definition.tlp) -
                    this.tlpOrder.indexOf(b.definition.tlp);
        }
        if (a.definition_type === 'rating') {
            return a.definition.rating - b.definition.rating;
        }
        if (a.definition_type === 'statement') {
            return a.definition.statement.localeCompare(b.definition.statement);
        }
        return 0;
    }

    public get markings(): any[] {
        return this._markings;
    }

}
