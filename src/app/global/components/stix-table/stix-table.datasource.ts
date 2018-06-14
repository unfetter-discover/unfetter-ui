
import {of as observableOf,  Observable ,  BehaviorSubject } from 'rxjs';

import {map, concat} from 'rxjs/operators';
import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material';






export class StixTableDataSource extends DataSource<any> {

    private data: any;
    private paginator: MatPaginator;
    constructor(data: any, paginator: MatPaginator) {
        super();
        this.paginator = paginator;
        this.data = data.map((ap) => ap.attributes);
    }

    public updateData() {
        const pageSize = this.paginator.pageSize;
        const startIndex = this.paginator.pageIndex * pageSize;
        let itemsOnPage;
        if ((startIndex + pageSize) < this.paginator.length) {
            itemsOnPage = pageSize;
        } else {
            itemsOnPage = this.paginator.length - startIndex;
        }
        return this.data.slice(startIndex, startIndex + itemsOnPage);
    }

    public connect(): Observable<any[]> {
        let junk = observableOf(1);
        return junk.pipe(concat(this.paginator.page),map(() => {
            return this.updateData();
        }));
    }

    public disconnect() { }
}
