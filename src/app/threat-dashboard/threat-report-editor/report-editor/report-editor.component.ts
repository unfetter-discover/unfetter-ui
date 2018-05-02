import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AttackPatternService } from '../../../core/services/attack-pattern.service';
import { GenericApi } from '../../../core/services/genericapi.service';
import { AttackPattern } from '../../../models/attack-pattern';
import { ExternalReference } from '../../../models/externalReference';
import { Report } from '../../../models/report';
import { UserProfile } from '../../../models/user/user-profile';
import { AppState } from '../../../root-store/app.reducers';

enum TITLES { CREATE = 'Create', MODIFY = 'Modify' };

@Component({
    selector: 'report-editor',
    templateUrl: './report-editor.component.html',
    styleUrls: ['./report-editor.component.scss']
})
export class ReportEditorComponent implements OnInit, OnDestroy {
    public loading = true;

    public title = TITLES.CREATE;

    public editing = false;

    public report = new Report();

    public references = new ExternalReference();

    public attackPatterns: AttackPattern[];

    public reportPatterns = [];

    public user: UserProfile;
    private readonly subscriptions = [];

    constructor(
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: Report,
        protected attackPatternService: AttackPatternService,
        protected genericApiService: GenericApi,
        protected userStore: Store<AppState>,
    ) { }

    ngOnInit() {
        const getUser$ = this.userStore
            .select('users')
            .pluck('userProfile')
            .take(1)
            .subscribe((user: UserProfile) => {
                this.user = user;
                // start loading the full list of attack patterns
                const sub$ = this.loadAttackPatterns()
                    .map((arr) => arr.sort(this.genAttackPatternSorter()))
                    .subscribe(
                        (val) => {
                            this.attackPatterns = val;
                            // convert our report patterns to a list containing the already-selected attack patterns
                            this.reportPatterns = val
                                .filter(pattern => this.report.attributes.object_refs.includes(pattern.id))
                                .map(pattern => {
                                    return {
                                        id: pattern.id,
                                        name: pattern.attributes.name
                                    };
                                });
                        },
                        (err) => console.log(err),
                        () => this.loading = false
                    );
                this.subscriptions.push(sub$);
                this.initializeReport(this.data);
            },
                (err) => console.log(err));
        this.subscriptions.push(getUser$);
    }

    /**
     * @description load attack patterns
     * @returns Observable<AttackPattern[]>
     */
    public loadAttackPatterns(): Observable<AttackPattern[]> {
        if (this.attackPatterns && this.attackPatterns.length > 0) {
            return Observable.of(this.attackPatterns);
        }

        const userFramework = (this.user && this.user.preferences && this.user.preferences.killchain)
            ? this.user.preferences.killchain : '';
        return this.attackPatternService.fetchAttackPatterns1(userFramework)
            .map((el) => this.attackPatterns = el);
    }

    /**
     * @description
     * @param {Report} - optional
     * @return {void}
     */
    public initializeReport(data?: Report): void {
        // if we are given a report already, the user wants to modify it
        if (data && data.attributes) {
            this.report.attributes = { ...this.report.attributes, ...data.attributes };
            this.report.attributes.labels = data.attributes.labels ? [...data.attributes.labels] : [];
            this.report.attributes.object_refs = data.attributes.object_refs ? [...data.attributes.object_refs] : [];
            this.report.attributes.external_references = data.attributes.external_references
                ? [...data.attributes.external_references] : [];
            this.references = this.report.attributes.external_references[0];
            this.title = TITLES.MODIFY;
            this.editing = true;
        }

        // ensure we have a valid report object
        this.report.attributes.external_references = [this.references];
        if (!this.report.attributes.object_refs) {
            this.report.attributes.object_refs = [];
        }
    }

    /**
     * @description create a function to sort attackpatterns by name
     * @return {Function} (a: AttackPattern, b: AttackPattern) => number
     */
    private genAttackPatternSorter(): (a: AttackPattern, b: AttackPattern) => number {
        const sorter = (a: AttackPattern, b: AttackPattern) => {
            const val1 = a.attributes.name;
            const val2 = b.attributes.name;
            if (val1 > val2) {
                return 1;
            } else if (val1 < val2) {
                return -1;
            }
            return 0;
        };
        return sorter;
    }

    /**
     * @description clean up this component
     */
    public ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((sub) => sub.unsubscribe());
        }
    }

    /**
     * @description add to selected attack patterns, add a chip
     * @param {AttackPattern} pattern
     */
    public addAttackPattern(pattern: AttackPattern): void {
        if (!this.reportPatterns.find(p => p.id === pattern.id)) {
            this.reportPatterns.push({
                id: pattern.id,
                name: pattern.attributes.name
            });
        }
    }

    /**
     * @description Remove an attack pattern from the report
     * @param {string} patternId
     */
    public removeAttackPattern(patternId: string) {
        if (!patternId) {
            return;
        }
        this.reportPatterns = this.reportPatterns.filter(pattern => pattern.id !== patternId);
    }

    /**
     * @description determines if the form is safe for submitting
     */
    public isValid(): boolean {
        return !!this.report.attributes.name && !!this.references.source_name && !!this.references.url;
    }

    /**
     * @description a form was submitted, close the dialog
     * @param event
     */
    public onCancel(event?: UIEvent): void {
        this.dialogRef.close(false);
    }

    /**
     * @description Save the threat report and then route to the dashboard view.
     * @param {UIEvent} event optional
     */
    public onSaveAs(event?: UIEvent): void {
        this.editing = false;
        this.onSave(event);
    }

    /**
     * @description Save the threat report and then route to the dashboard view.
     * @param {UIEvent} event optional
     */
    public onSave(event?: UIEvent): void {
        if (this.isValid()) {
            const attribs = this.report.attributes;
            attribs.modified = new Date();
            attribs.object_refs = this.reportPatterns.map(pattern => pattern.id);
            if (!this.editing) {
                this.report.id = attribs.id = undefined;
                this.report.type = 'report';
            }

            // return it
            this.dialogRef.close(this.report);
        }
    }

}
