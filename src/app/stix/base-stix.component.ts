import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ConfirmationDialogComponent } from '../components/dialogs/confirmation/confirmation-dialog.component';
import { BaseStixService } from './base-stix.service';

export class BaseStixComponent {

    constructor(
        protected service: BaseStixService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected dialog: MdDialog,
        protected location: Location,
        protected snackBar?: MdSnackBar) {
    }

     protected load(): Observable<any[]> {
         let _self  = this;
         return Observable.create((observer) => {
               _self.loadItems(observer);
         });
    }

    protected get(): Observable<any> {
        let _self  = this;
        return Observable.create((observer) => {
               _self.getItem(observer);
        });
    }

    protected create(item: any): Observable<any>  {
        let _self  = this;
        return Observable.create((observer) => {
               _self.createItem(item, observer);
        });
    }

    protected save(item: any): Observable<any>  {
        let _self  = this;
        return Observable.create((observer) => {
               _self.saveItem(item, observer);
        });
    }

    protected gotoView(command: any[]): void {
        this.router.navigate(command, { relativeTo: this.route });
    }

    protected openDialog(item: any): Observable<any> {
        let _self  = this;
        console.log(item.id);
        return Observable.create((observer) => {
            let dialogRef = _self.dialog.open(ConfirmationDialogComponent, { data: item });
            dialogRef.afterClosed().subscribe(
                (result) => {
                if (result) {
                    _self.deleteItem(item.id, observer);
                }
            });
        });
    }

    protected download(): void {
        console.log('download');
    }

    protected cancelButtonClicked(): void {
        this.location.back();
    }

    private loadItems(observer: any): void {
         let subscription = this.service.load().subscribe(
            (stixObjects) => {
                observer.next(stixObjects);
                observer.complete();
            }, (error) => {
                // handle errors here
                 console.log('error ' + error);
            }, () => {
                // prevent memory links
                if (subscription) {
                    subscription.unsubscribe();
                }
            }
        );
    }

    private getItem(observer: any): void {
       this.route.params
                .switchMap((params: Params) => this.service.get(params['id']))
                .subscribe(
                    (stixObject) => {
                        observer.next(stixObject);
                        observer.complete();
                    }, (error) => {
                        // handle errors here
                        console.log('error ' + error);
                    }, () => {
                    // handle errors here
                    }
                );
    }

    private deleteItem(id: string, observer: any): void {
        this.route.params
            .switchMap((params: Params) => this.service.delete(id))
            .subscribe(
                (stixObject) => {
                    observer.next(stixObject);
                    observer.complete();
                    this.snackBar.open('Deleted', '', {
                        duration: 2000,
                    });
                }, (error) => {
                    // handle errors here
                    console.log('error ' + error);
                }, () => {
                   // handle errors here
                }
            );
    }

    private createItem(item: any, observer: any): void {
        let subscription = this.service.create(item).subscribe(
            (data) => {
                data.url = item.url;
                let sub = this.service.update(data).subscribe(
                    (resullts) => {
                        observer.next(data);
                        observer.complete();
                    } , (error) => {
                        // handle errors here
                        console.log('error ' + error);
                    }, () => {
                        // prevent memory links
                        if (sub) {
                            sub.unsubscribe();
                        }
                    }
                );
            }, (error) => {
                // handle errors here
                 console.log('error ' + error);
            }, () => {
                // prevent memory links
                if (subscription) {
                    subscription.unsubscribe();
                }
            }
        );
    }

    private saveItem(item: any, observer: any): void {
        let subscription = this.service.update(item).subscribe(
            (data) => {
                observer.next(data);
                observer.complete();
            }, (error) => {
                // handle errors here
                 console.log('error ' + error);
            }, () => {
                // prevent memory links
                if (subscription) {
                    subscription.unsubscribe();
                }
            }
        );
    }

}
