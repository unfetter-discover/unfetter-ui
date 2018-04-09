import { Component, Inject, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ElementRef, ViewChildren, QueryList, AfterViewInit, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';

import { Constance } from '../../../utils/constance';

/*
 * Defines headers for the table within the master list dialog, and how to render them.
 * 
 * Since the properties of MasterListDialogTableHeaders are public, they can be changed, if necessary, without
 * needing to export the MasterListColumn interface. The id and actions properties, however, are consistent
 * throughout the UI, however, so it really shouldn't be necessary.
 */
type ClassSelector = (row: any) => string;
type Selectable = (row: any) => boolean;

interface MasterListColumn {
    readonly ref: string;

    readonly header: string;

    classes?: string | ClassSelector;

    selectable?: boolean | Selectable;

    format?(value: string): string;
}

export class MasterListDialogTableHeaders {

    id: MasterListColumn = {ref: 'name', header: 'Name', selectable: true};
    edition: MasterListColumn;
    actions: MasterListColumn = {ref: 'actions', header: ''};

    private dateFormat = new DatePipe('en-US');

    constructor(editionColumn: string = 'date', editionHeader: string = 'Date', selectable: boolean = false,
            editionFormat?: (value: string) => string) {
        this.id.format = (value) => {return value};
        if (!editionFormat) {
            editionFormat = (value: string) => {
                console.log(`Date: ${value}`);
                return this.dateFormat.transform(value, 'medium')
            };
        }
        this.edition = {ref: editionColumn, header: editionHeader, selectable: selectable, format: editionFormat};
    }

    public getColumns(): string[] {
        return [this.id.ref, this.edition.ref, this.actions.ref];
    }

    public rowClass(row: any, column: MasterListColumn, ): string {
        if (!column.classes) {
            return '';
        }
        if (typeof column.classes === 'string') {
            return column.classes;
        }
        return column.classes(row);
    }

    public canSelect(row: any, column: MasterListColumn): boolean {
        if (!column.classes) {
            return false;
        }
        if (typeof column.selectable === 'boolean') {
            return column.selectable;
        }
        return column.selectable(row);
    }

}

@Component({
    selector: 'master-list-dialog',
    templateUrl: 'master-list-dialog.component.html',
    styleUrls: ['./master-list-dialog.component.scss']
})
export class MasterListDialogComponent implements AfterViewInit, OnDestroy {

    /*
     * Note that the loading element does not appear to be displaying...
     */
    public loading = true;
    public hasError = false;
    public errorMsg = '';

    /*
     * Filter list properties. Used to note when the user enters data in the search box, or switches which tab
     * (yours/shared, currently not implemented) to display.
     */
    private readonly subscriptions = [];
    private readonly duration = 250;
    @ViewChildren('filter') public filters: QueryList<ElementRef>;
    public filter: ElementRef;

    constructor(
        public dialogRef: MatDialogRef<MasterListDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    /**
     * @description setup keyhandlers after viewchild components exists
     * @return {void}
     */
    public ngAfterViewInit(): void {
        const sub$ = this.filters.changes.subscribe(
            (comps) => this.initFilter(comps.first),
            (err) => {
                console.log(err);
                this.hasError = true;
                this.errorMsg = err;
            },
            () => {
                console.log('filter subscriptions done');
            }
        );
        this.subscriptions.push(sub$);

        // need to trigger a change detection, so do it on next repaint
        requestAnimationFrame(() => this.loading = false);
    }

    /**
     * @description clean up this component
     * @return {void}
     */
    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    /**
     * @description setup filterbox events
     * @return {void}
     */
    public initFilter(filter: ElementRef): void {
        if (!filter || !filter.nativeElement) {
            console.log('filter element is undefined, cannot setup events observable, moving on...');
            return;
        }

        this.filter = filter;
        const sub$ = Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(this.duration)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.data.dataSource) {
                    console.log('no datasource!!!');
                    return;
                }
                this.data.dataSource.nextFilter(this.filter.nativeElement.value);
            });
        this.subscriptions.push(sub$);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onFilterChange(tab: number): void {
        // This is currently not implemented. It should affect the filter in the initFilter method.
        this.data.tabChange.emit(tab);
    }

    onCreate(event?: UIEvent): void {
        // invoker of the master list dialog needs to display a create page / dialog.
        this.data.create.emit(event);
    }

    onSelect(row: any, cell: any, event?: UIEvent): void {
        // invoker of the master list dialog needs to redisplay the page for the selected row
        this.data.select.emit(row);
    }

    onEdit(row: any, event?: UIEvent): void {
        // invoker of the master list dialog needs to display an edit page / dialog for the selected row
        this.data.edit.emit(row);
    }

    onDelete(row: any, event?: UIEvent): void {
        // invoker of the master list dialog needs to display a confirmation dialog for deleting the selected row
        this.data.delete.emit(row);
    }

}

/*
 * Displays the UI component that pops up the master list dialog.
 */
@Component({
    selector: 'master-list-dialog-trigger',
    templateUrl: './master-list-dialog-trigger.component.html',
    styleUrls: ['./master-list-dialog-trigger.component.scss']
})
export class MasterListDialogTriggerComponent implements OnDestroy {

    @Input() private title: string = 'Product Choices';

    @Input() private width = Constance.DIALOG_WIDTH_MEDIUM;

    @Input() private height = Constance.DIALOG_HEIGHT_TALL;

    /*
     * The datasource retrieves and displays the table content for the master-list.
     * The default behavior is to return nothing.
     */
    @Input() private dataSource: DataSource<any>;

    @Input() private columns: MasterListDialogTableHeaders = new MasterListDialogTableHeaders();

    /*
     * The master-list dialog has yours/shared tabs that will trigger this handler.
     * This behavior is currently disabled.
     */
    @Output() private tabChange = new EventEmitter<number>();

    /*
     * The master-list dialog has a create-new button that will trigger this handler.
     * The default behavior is to do nothing.
     */
    @Output() private create = new EventEmitter<UIEvent>();

    /*
     * Each table row will have selectable cells that will trigger this handler.
     * The default behavior is to do nothing.
     */
    @Output() private select = new EventEmitter<any>();

    /*
     * Each table row will have an edit button that will trigger this handler.
     * The default behavior is to do nothing.
     */
    @Output() private edit = new EventEmitter<any>();

    /*
     * The master-list dialog has a delete button that will trigger this handler.
     * The default behavior is to do nothing.
     */
    @Output() private delete = new EventEmitter<any>();

    /*
     * After closing the master-list dialog, this handler will be called.
     * The default behavior is to do nothing.
     */
    @Output() private close = new EventEmitter<UIEvent>();

    constructor(public dialog: MatDialog) {}

    /**
     * @description clean up this component
     * @return {void}
     */
    public ngOnDestroy(): void {
        this.dialog.closeAll();
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(MasterListDialogComponent, {
            width: this.width,
            height: this.height,
            panelClass: 'uf-master-list-dialog',
            data: {
                title: this.title,
                dataSource: this.dataSource,
                columns: this.columns,
                create: this.create,
                select: this.select,
                edit: this.edit,
                delete: this.delete,
                tabChange: this.tabChange,
            }
        });
        dialogRef.afterClosed().subscribe((res) => {
            this.close.emit();
        });
    }

}
