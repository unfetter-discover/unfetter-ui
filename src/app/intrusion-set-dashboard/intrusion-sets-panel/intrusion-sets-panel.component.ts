
import {distinctUntilChanged, finalize, debounceTime} from 'rxjs/operators';
import {
        Component,
        OnInit,
        AfterContentInit,
        Output,
        ViewChild,
        ElementRef,
        EventEmitter,
        ChangeDetectorRef,
    } from '@angular/core';
import { Subject } from 'rxjs';

import { Constance } from '../../utils/constance';
import { GenericApi } from '../../core/services/genericapi.service';
import { IntrusionSetHighlighterService } from '../intrusion-set-highlighter.service';

@Component({
    selector: 'intrusion-sets-panel',
    templateUrl: './intrusion-sets-panel.component.html',
    styleUrls: ['./intrusion-sets-panel.component.scss']
})
export class IntrusionSetsPanelComponent implements OnInit {

    public intrusionSets = [];
    public selectedIntrusionSets = [];
    public intrusionSetSuggestions = [];

    @ViewChild('intrusion_sets_list') listElement: ElementRef;

    private updateDebouncer: Subject<any> = new Subject();
    @Output() private onChange = new EventEmitter<any[]>();

    constructor(
        protected genericApi: GenericApi,
        protected ref: ChangeDetectorRef,
        private highlighter: IntrusionSetHighlighterService,
    ) { }

    /**
     * @description load the intrusion set data, and prep the updater.
     */
    ngOnInit() {
        const ISsortObj = { 'stix.name': '1' };
        const ISprojectObj = {
            'stix.name': 1,
            'stix.id': 1
        };
        const ISfilter = encodeURI(`sort=${JSON.stringify(ISsortObj)}&project=${JSON.stringify(ISprojectObj)}`);
        const initData$ = this.genericApi.get(`${Constance.INTRUSION_SET_URL}?${ISfilter}`).pipe(
            finalize(() => {initData$.unsubscribe()}))
            .subscribe(
                (results) => this.intrusionSets = results || [],
                (err) => console.log(new Date().toISOString(), err),
                () => this.intrusionSets.forEach(intrusionSet => intrusionSet.checked = false)
            );

        this.updateDebouncer.pipe(
            debounceTime(1000))
            .subscribe(
                () => this.onChange.emit(this.selectedIntrusionSets),
                (err) => console.log(new Date().toISOString(), err),
            );

        this.highlighter.intrusionSet.pipe(
            distinctUntilChanged())
            .subscribe(
                (event) => {
                    const highlighted: NodeList = this.listElement.nativeElement.querySelectorAll('[highlight]');
                    Array.from(highlighted).forEach((node: Element) => node.removeAttribute('highlight'));
                    if (event && event.analytics) {
                        event.analytics.forEach(intrusion => {
                            const target = this.listElement.nativeElement.querySelector(`#${intrusion.id}`);
                            if (target) {
                                target.attributes.setNamedItem(document.createAttribute('highlight'));
                            }
                        });
                    }
                }
            );
    }

    /**
     * @description called when the search autocomplete input needs suggestions
     */
    public onAutoCompleteSearch(input: any) {
        this.intrusionSetSuggestions = [];
        this.intrusionSets
            .filter((intrusionSet) => {
                return intrusionSet.attributes.name.toLowerCase()
                    .indexOf(input.query.toLowerCase()) >= 0;
            })
            .forEach((intrusionSet) => {
                this.intrusionSetSuggestions.push({
                    id: intrusionSet.id,
                    name: intrusionSet.attributes.name
                });
            });
    }

    /**
     * @description called when the user selects an auto-complete suggestion; triggers an update
     */
    public onAutoCompleteSelect(selection: any): void {
        const intrusionSet = this.intrusionSets.find((i) => i.id === selection.id);
        intrusionSet.checked = true;
        this.select(intrusionSet, true);
        this.updateDebouncer.next();
    }

    /**
     * @description called when the user hits the search button; triggers an update
     */
    public triggerSearch() {
        this.updateDebouncer.next();
    }

    /**
     * @description called when the user clicks a checkbox for an intrusion set name; triggers an update
     */
    public onSelect(intrusionSet: any, event?: UIEvent) {
        if (intrusionSet) {
            if (intrusionSet.checked) {
                requestAnimationFrame(() => intrusionSet.checked = false);
                this.remove(intrusionSet);
            } else {
                requestAnimationFrame(() => intrusionSet.checked = true);
                this.select(intrusionSet);
            }
            this.updateDebouncer.next();
        }
    }

    /**
     * @description select the requested intrusion set (force select); does not trigger an update
     */
    public select(intrusionSet: any, isAutoComplete?: boolean): void {
        const found = this.selectedIntrusionSets.find((i) => intrusionSet.id === i.id);
        if (found) {
            if (!isAutoComplete) {
                this.selectedIntrusionSets = this.selectedIntrusionSets.filter((i) => intrusionSet.id !== i.id);
            }
        } else {
            this.selectedIntrusionSets.push(intrusionSet);
        }
    }

    /**
     * @description deselect the requested intrusion set (force deselect); does not trigger an update
     */
    public remove(intrusionSet: any): void {
        if (intrusionSet) {
            this.selectedIntrusionSets = this.selectedIntrusionSets.filter((i) => i.id !== intrusionSet.id);
        }
    }

    /**
     * @description deselect all intrusion sets; triggers an update
     */
    public onClear(event: UIEvent): void {
        event.preventDefault();
        this.selectedIntrusionSets.forEach((intrusionSet) => {
            intrusionSet.checked = false;
            this.remove(intrusionSet);
        });
        this.updateDebouncer.next();
    }

}
