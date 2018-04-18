import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { ConfirmationDialogComponent } from '../components/dialogs/confirmation/confirmation-dialog.component';
import { BaseStixService } from './base-stix.service';

export class BaseStixComponent<T = any> {
    public filteredItems: T[];
    public validationErrorMessages: string[] = [];
    public selectedExternal: any;
    public readonly duration = 3000;

    constructor(
        public service: BaseStixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
        public location: Location,
        public snackBar?: MatSnackBar) {
    }

    public load(filter?: any): Observable<any[]> {
        const _self = this;
        return Observable.create((observer) => {
            _self.loadItems(observer, filter);
        });
    }

    /**
     * @description get this components data
     * @returns Observable<T>
     */
    public get(): Observable<T> {
        const _self = this;
        return Observable.create((observer) => {
            _self.getItem(observer);
        });
    }

    public getByUrl(url: string): Observable<any> {
        const _self = this;
        return Observable.create((observer) => {
            const subscription = _self.service.getByUrl(url).subscribe(
                (data) => {
                    observer.next(data);
                    observer.complete();
                },
                (error) => this.showErrorSnackbar(error),
                () => this.closeSubscription(subscription));
        });
    }
    public create(item: any): Observable<any> {
        const _self = this;
        return Observable.create((observer) => {
            _self.createItem(item, observer);
        });
    }

    public save(item: any): Observable<T> {
        const _self = this;
        item.url = this.service.url;
        return Observable.create((observer) => {
            _self.saveItem(item, observer);
        });
    }

    public delete(item: any): Observable<any> {
        const _self = this;
        return Observable.create((observer) => {
            _self.deleteItem(item, observer);
        });
    }

    public gotoView(command: any[]): void {
        this.router.navigate(command, { relativeTo: this.route });
    }

    public openDialog(item: any): Observable<any> {
        const _self = this;
        item.url = this.service.url;
        return Observable.create((observer) => {
            const dialogRef = _self.dialog.open(ConfirmationDialogComponent, { data: item });
            dialogRef.afterClosed().subscribe(
                (result) => {
                    if (result === 'true' || result === true) {
                        _self.deleteItem(item, observer);
                    }
                });
        });
    }

    public download(): void {
        console.log('download');
    }

    public cancelButtonClicked(): void {
        this.location.back();
    }

    public onFilterItemsChange(filterItems: any[]): void {
        this.filteredItems = filterItems;
    }

    public loadItems(observer: any, filter?: any): void {
        const subscription = this.service.load(filter).subscribe(
            (stixObjects) => {
                observer.next(stixObjects);
                observer.complete();
            },
            (error) => this.showErrorSnackbar(error),
            () => this.closeSubscription(subscription));
    }
    /**
     * @description look up a generic object by the current url id, emit/next that object into the given {Observer}
     * @param  {Observer<T>} observer
     * @returns void
     */
    public getItem(observer: Observer<T>): void {
        const subscription = this.route.params
            .switchMap((params: Params) => this.service.get(params['id']))
            .subscribe(
                (stixObject) => {
                    observer.next(stixObject);
                    observer.complete();
                },
                (error) => this.showErrorSnackbar(error),
                () => this.closeSubscription(subscription));
    }

    public deleteItem(item: any, observer: any): void {
        const subscription = this.route.params
            .switchMap((params: Params) => this.service.delete(item))
            .subscribe(
                (stixObject) => {
                    observer.next(stixObject);
                    observer.complete();
                    if (item.attributes.name) {
                        this.snackBar.open(item.attributes.name + ' has been successfully deleted', '', {
                            duration: this.duration,
                            extraClasses: ['snack-bar-background-success']
                        });
                    }
                },
                (error) => this.showErrorSnackbar(error),
                () => this.closeSubscription(subscription));
    }

    public createItem(item: any, observer: any): void {
        const subscription = this.service.create(item).subscribe(
            (data) => {
                observer.next(data);
                observer.complete();
                if (item.attributes.name) {
                    this.snackBar.open(item.attributes.name + ' has been successfully saved', '', {
                        duration: this.duration,
                        extraClasses: ['snack-bar-background-success']
                    });
                }
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
            },
            (error) => this.showErrorSnackbar(error),
            () => this.closeSubscription(subscription));
    }

    public saveItem(item: any, observer: Observer<any>): void {
        const subscription = this.service.update(item).subscribe(
            (data) => {
                observer.next(data);
                observer.complete();
                if (item.attributes.name) {
                    this.snackBar.open(item.attributes.name + ' has been successfully saved', '', {
                        duration: this.duration,
                        extraClasses: ['snack-bar-background-success']
                    });
                }
            },
            (error) => this.showErrorSnackbar(error),
            () => this.closeSubscription(subscription));
    }


    /**
     * @param  {any} model (Any legacy STIX model)
     * @returns boolean
     * @description This is used to disable the save button in the CRUD pages
     */
    public invalidate(model: any): boolean {
        this.validationErrorMessages = [];
        let invalid = false;

        // created_by_ref not on identity
        if (model.type !== 'identity' && (!model.attributes.created_by_ref || !model.attributes.created_by_ref.length)) {
            this.validationErrorMessages.push('Submitter Organization is required');
            invalid = true;
        }

        // Name not on sighting or relationship
        if (model.type !== 'sighting' && model.type !== 'relationship' && (!model.attributes.name || !model.attributes.name.length)) {
            this.validationErrorMessages.push('Name is required');
            invalid = true;
        }

        switch (model.type) {
            case 'identity':
                if (!model.attributes.identity_class || !model.attributes.identity_class.length) {
                    this.validationErrorMessages.push('Identity class is required');
                    invalid = true;
                }
                break;
            case 'indicator':
                if (!model.attributes.pattern || !model.attributes.pattern.length) {
                    this.validationErrorMessages.push('Pattern is required');
                    invalid = true;
                }
                break;
            case 'report':
                if (!model.attributes.published) {
                    this.validationErrorMessages.push('Published is required');
                    invalid = true;
                }
                break;
            case 'sighting':
                if (!model.attributes.sighting_of_ref || !model.attributes.sighting_of_ref.length) {
                    this.validationErrorMessages.push('Sighting reference is required');
                    invalid = true;
                }
                break;
        }

        // external references
        if (model.attributes.external_references && model.attributes.external_references.length) {
            for (let externalReference of model.attributes.external_references) {
                if (!externalReference.source_name || !externalReference.source_name.length) {
                    this.validationErrorMessages.push('All external references must have a source name: Add one, or remove the external reference');
                    invalid = true;
                }
            }
        }

        // Kill chains
        if (model.attributes.kill_chain_phases && model.attributes.kill_chain_phases.length) {
            for (let killChainPhase of model.attributes.kill_chain_phases) {
                if (!killChainPhase.kill_chain_name || !killChainPhase.kill_chain_name.length || !killChainPhase.phase_name || !killChainPhase.phase_name.length) {
                    this.validationErrorMessages.push('All kill chain phases must have a kill chain name and phase name: Add them, or remove the kill chain phase');
                    invalid = true;
                }
            }
        }

        return invalid;
    }

    /**
     * @description show given error in the snack bar error box
     * @param  {string|any} error
     * @returns void
     */
    public showErrorSnackbar(error: string | HttpErrorResponse | any): void {
        let msg = error;
        if (!error) {
            msg = 'Unknown error';
        }

        if (error && error.error && error.error.errors) {
            const details = error.error.errors[0].detail || [error.error.errors[0]];
            msg = error.error.errors[0].detail.map((el) => el).join(',');
        }
        // display errors here
        this.snackBar.open('Error ' + msg, '', {
            duration: this.duration,
            extraClasses: ['snack-bar-background-error']
        });
    }

    /**
     * @description close given subscription if it is defined
     * @param  {Subscription} subscription
     * @returns void
     */
    public closeSubscription(subscription?: Subscription): void {
        if (subscription) {
            subscription.unsubscribe();
        }
    }

}
