import { Location } from '@angular/common';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatChipsModule, MatDialog, MatIconModule } from '@angular/material';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DataListModule } from 'primeng/components/datalist/datalist';
import { Observable } from 'rxjs/Observable';
import { ListStixObjectComponent } from './list-stix-objects.component';

describe('ListStixObjectComponent', () => {

    let component: ListStixObjectComponent;
    let fixture: ComponentFixture<ListStixObjectComponent>;

    const routes: Routes = [{ path: 'test', component: ListStixObjectComponent }];
    const mockRouter = {
        navigate: (paths: string[]) => { },
    }
    const mockDialog = {
        open: () => {
            return {
                afterClosed: () => Observable.of({})
            };
        },
        closeAll: () => { },
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(routes),
                DataListModule,
                MatChipsModule,
                MatIconModule,
            ],
            declarations: [
                ListStixObjectComponent,
            ],
            providers: [
                { provide: ActivatedRoute, useValue: {} },
                { provide: Router, useValue: mockRouter },
                { provide: MatDialog, useValue: mockDialog },
                { provide: Location, useValue: { back: () => { } } },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListStixObjectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('should perform BaseComponent actions:', () => {

        it('route to new view', () => {
            const router = TestBed.get(Router);
            const location = TestBed.get(Location);
            const spy = spyOn(router, 'navigate');
            component['gotoView']([routes[0].path]);
            expect(spy).toHaveBeenCalled();
        });

        it('open confirmation dialogs', () => {
            component['openDialog']('test');
            component['dialog'].closeAll();
        });

        it('handle cancel button clicks', () => {
            const router = TestBed.get(Router);
            const location = TestBed.get(Location);
            const spy = spyOn(location, 'back');
            component['cancelButtonClicked']();
            expect(spy).toHaveBeenCalled();
        });

    });

    /**
     * @todo lots more LinkStixObjects tests to add
     */

});
