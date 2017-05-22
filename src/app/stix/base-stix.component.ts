import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ConfirmationDialogComponent } from '../components/dialogs/confirmation/confirmation-dialog.component';
import { BaseStixService } from './base-stix.service';

export class BaseStixComponent {
    private duration = 3000;
    constructor(
        protected service: BaseStixService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected dialog: MdDialog,
        protected location: Location,
        protected snackBar?: MdSnackBar) {
    }

     protected load(filter?: any): Observable<any[]> {
         let _self  = this;
         return Observable.create((observer) => {
               _self.loadItems(observer, filter);
         });
    }

    protected get(): Observable<any> {
        let _self  = this;
        return Observable.create((observer) => {
               _self.getItem(observer);
        });
    }

     protected getByUrl(url: string): Observable<any> {
        let _self  = this;
        return Observable.create((observer) => {
              let subscription =  _self.service.getByUrl(url).subscribe(
                   (data) => {
                        observer.next(data);
                        observer.complete();
                   }, (error: string) => {
                        // handle errors here
                        this.snackBar.open('Error ' + error , '', {
                            duration: this.duration,
                            extraClasses: ['snack-bar-background-error']
                        });
                    }, () => {
                        // prevent memory links
                        if (subscription) {
                            subscription.unsubscribe();
                        }
                    }
               );
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
        item.url = this.service.url;
        return Observable.create((observer) => {
               _self.saveItem(item, observer);
        });
    }

    protected delete(item: any): Observable<any>  {
        let _self  = this;
        return Observable.create((observer) => {
               _self.deleteItem(item, observer);
        });
    }

    protected gotoView(command: any[]): void {
        this.router.navigate(command, { relativeTo: this.route });
    }

    protected openDialog(item: any): Observable<any> {
        let _self  = this;
        return Observable.create((observer) => {
            let dialogRef = _self.dialog.open(ConfirmationDialogComponent, { data: item });
            dialogRef.afterClosed().subscribe(
                (result) => {
                if (result) {
                    _self.deleteItem(item, observer);
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

    private loadItems(observer: any, filter?: any): void {
         let subscription = this.service.load(filter).subscribe(
            (stixObjects) => {
                observer.next(stixObjects);
                observer.complete();
            }, (error) => {
                // handle errors here
                this.snackBar.open('Error ' + error , '', {
                     duration: this.duration,
                     extraClasses: ['snack-bar-background-error']
                });
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
                        this.snackBar.open('Error ' + error , '', {
                            duration: this.duration,
                            extraClasses: ['snack-bar-background-error']
                        });
                    }, () => {
                    // handle errors here
                    }
                );
    }

    private deleteItem(item: any, observer: any): void {
        this.route.params
            .switchMap((params: Params) => this.service.delete(item))
            .subscribe(
                (stixObject) => {
                    observer.next(stixObject);
                    observer.complete();
                    this.snackBar.open(item.attributes.name + ' has been successfully deleted', '', {
                        duration: this.duration,
                        extraClasses: ['snack-bar-background-success']
                    });
                }, (error) => {
                    // handle errors here
                    this.snackBar.open('Error ' + error , '', {
                        duration: this.duration,
                        extraClasses: ['snack-bar-background-error']
                    });
                    observer.throw = '';
                }, () => {
                   // handle errors here
                }
            );
    }

    private createItem(item: any, observer: any): void {
        let subscription = this.service.create(item).subscribe(
            (data) => {
                observer.next(data);
                observer.complete();
                this.snackBar.open(item.attributes.name + ' has been successfully save', '', {
                    duration: this.duration,
                    extraClasses: ['snack-bar-background-success']
                });
                // data.url = item.url;
                // let sub = this.service.update(data).subscribe(
                //     (resullts) => {
                //         observer.next(data);
                //         observer.complete();
                //         this.snackBar.open(item.attributes.name + ' has been successfully save', '', {
                //             duration: this.duration,
                //             extraClasses: ['snack-bar-background-success']
                //         });
                //     } , (error) => {
                //         // handle errors here
                //         // roollback create
                //         this.deleteItem(data, observer);
                //         this.snackBar.open('Error ' + error , '', {
                //             duration: this.duration,
                //             extraClasses: ['snack-bar-background-error']
                //         });
                //     }, () => {
                //         // prevent memory links
                //         if (sub) {
                //             sub.unsubscribe();
                //         }
                //     }
                // );
            }, (error) => {
                // handle errors here
                this.snackBar.open('Error ' + error , '', {
                    duration: this.duration,
                    extraClasses: ['snack-bar-background-error']
                });
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
                this.snackBar.open(item.attributes.name + ' has been successfully save', '', {
                    duration: this.duration,
                    extraClasses: ['snack-bar-background-success']
                });
            }, (error) => {
                // handle errors here
                this.snackBar.open('Error ' + error , '', {
                    duration: this.duration,
                    extraClasses: ['snack-bar-background-error']
                });
            }, () => {
                // prevent memory links
                if (subscription) {
                    subscription.unsubscribe();
                }
            }
        );
    }

}
