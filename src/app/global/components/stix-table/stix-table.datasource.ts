import { Component, } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MdPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';

export class StixTableDataSource extends DataSource<any> {

    private data: any;
    private paginator: MdPaginator;
    constructor(data: any, paginator: MdPaginator) {
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
        let junk = Observable.of(1);
        return junk.concat(this.paginator.page).map(() => {
            return this.updateData();
        });
    }

    public disconnect() { }
}
