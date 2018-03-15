import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatButtonModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, Store } from '@ngrx/store';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';

import * as fromRoot from '../../../root-store/app.reducers';
import { CreatedByRefComponent } from './created-by-ref.component';
import { mockOrganizations } from '../../../testing/mock-organizations';
import { BaseComponentService } from '../../../components/base-service.component';
import { makeRootMockStore } from '../../../testing/mock-store';

describe('CreatedByRefComponent', () => {
    let component: CreatedByRefComponent;
    let fixture: ComponentFixture<CreatedByRefComponent>;
    let store: Store<any>;
    let overlayContainerElement: HTMLElement;
    let selectEl: HTMLInputElement;

    const mockBaseService = {
        get() {
            return Observable.of(
                    mockOrganizations
                        .map((org) => {
                            return {
                                attributes: org
                            };
                        })
                );
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CreatedByRefComponent
            ],
            imports: [
                MatButtonModule,
                MatSelectModule,
                FormsModule,
                BrowserAnimationsModule,
                StoreModule.forRoot(fromRoot.reducers)
            ],
            providers: [
                {
                    provide: BaseComponentService,
                    useValue: mockBaseService
                },
                {
                    provide: OverlayContainer, useFactory: () => {
                        overlayContainerElement = document.createElement('div') as HTMLElement;
                        overlayContainerElement.classList.add('cdk-overlay-container');

                        document.body.appendChild(overlayContainerElement);

                        // remove body padding to keep consistent cross-browser
                        document.body.style.padding = '0';
                        document.body.style.margin = '0';

                        return { getContainerElement: () => overlayContainerElement };
                    }
                }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreatedByRefComponent);
        component = fixture.componentInstance;
        component.model = {
            attributes: {
                created_by_ref: ''
            }
        };
        store = component.store;
        makeRootMockStore(store);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should change created by ref with selection', fakeAsync(() => {
        fixture.detectChanges();
        selectEl = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
        selectEl.click();
        fixture.detectChanges();
        let option = overlayContainerElement.querySelector('mat-option') as HTMLElement;
        option.click();
        fixture.detectChanges();
        tick(500);
        expect(component.model.attributes.created_by_ref).not.toEqual('');
    }));
});
