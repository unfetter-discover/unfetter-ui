import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { pluck, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../root-store/app.reducers';
import { MarkingDefinition } from '../../../models';

@Component({
    selector: 'markings-list',
    templateUrl: './markings-list.component.html',
    styleUrls: ['./markings-list.component.scss']
})
export class MarkingsListComponent implements OnInit, OnChanges {

    @Input() public model: any;

    private _markings = [];

    private markingDefinitions = { loaded: false };
    private definitionTypeOrder = ['capco', 'tlp', 'rating', 'statement'];
    private capcoOrder = ['Classification', 'Compartment', 'Access', 'Dissemination'];
    private tlpOrder = ['white', 'green', 'amber', 'red'];

    constructor(
        public store: Store<fromRoot.AppState>,
    ) {
    }

    ngOnInit() {
        const markings$ = this.store.select('markings')
            .pipe(
                pluck('definitions'),
                distinctUntilChanged()
            )
            .subscribe(
                (markings: MarkingDefinition[]) => {
                    this.markingDefinitions = markings
                        .sort((a, b) => this.sortMarkings(a, b))
                        .reduce((defs, marking) => {
                            if (marking && marking.id) {
                                defs[marking.id] = marking.attributes;
                            }
                            return defs;
                        }, { loaded: false });
                    this.markingDefinitions.loaded = true;
                    console.log('got marking definitions', this.markingDefinitions);
                    this.setMarkings(this.model);
                },
                err => console.log('error loading marking definitions', err),
                () => markings$ && markings$.unsubscribe()
            );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.markingDefinitions.loaded && changes && changes.model) {
            this.setMarkings(changes.model);
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
                            markings.push({color: null, text: `(${def.definition.rating}) ${def.definition.label}`});
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
                marking.portion = marking.portions.join(' // ');
                markings.unshift(marking);
            }
        }
        this._markings = markings;
    }

    private sortMarkings(a: MarkingDefinition, b: MarkingDefinition) {
        const aType = this.definitionTypeOrder.indexOf(a.attributes.definition_type);
        const bType = this.definitionTypeOrder.indexOf(b.attributes.definition_type);
        const typeOrder = aType - bType;
        if (typeOrder !== 0) {
            return typeOrder;
        }
        if (a.attributes.definition_type === 'capco') {
            const aCat = this.capcoOrder.indexOf(a.attributes.definition.category);
            const bCat = this.capcoOrder.indexOf(b.attributes.definition.category);
            const catOrder = aCat - bCat;
            if (catOrder !== 0) {
                return catOrder;
            }
            const precedence = a.attributes.definition.precedence - b.attributes.definition.precedence;
            if (precedence !== 0) {
                return precedence;
            }
            return a.attributes.definition.text.localeCompare(b.attributes.definition.text);
        }
        if (a.attributes.definition_type === 'tlp') {
            return this.tlpOrder.indexOf(a.attributes.definition.tlp) -
                    this.tlpOrder.indexOf(b.attributes.definition.tlp);
        }
        if (a.attributes.definition_type === 'rating') {
            return a.attributes.definition.rating - b.attributes.definition.rating;
        }
        if (a.attributes.definition_type === 'statement') {
            return a.attributes.definition.statement.localeCompare(b.attributes.definition.statement);
        }
        return 0;
    }

    public get markings(): any[] {
        return this._markings;
    }

}
