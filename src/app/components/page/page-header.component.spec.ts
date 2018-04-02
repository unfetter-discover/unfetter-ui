import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PageHeaderComponent } from './page-header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PageHeaderComponent', () => {

    let component: PageHeaderComponent;
    let fixture: ComponentFixture<PageHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
            ],
            declarations: [
                PageHeaderComponent,
            ],
            providers: [
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display title et al', () => {
        component.pageTitle = 'Test Page';
        component.description = 'This is just a test. This is only a test.'
        component.showDescription = true;
        fixture.detectChanges();
        let title = fixture.debugElement.query(By.css('h4'));
        expect(title).not.toBeNull();
        expect(title.nativeElement.textContent).toMatch(component.pageTitle);
        let description = fixture.debugElement.query(By.css('.help-description'));
        expect(description).not.toBeNull();
        expect(description.nativeElement.textContent).toMatch(component.description);
    });

    it('should toggle the description', async(() => {
        component.pageTitle = 'Test Page';
        component.description = 'This is just a test. This is only a test.'
        component.showDescription = true;
        fixture.detectChanges();

        let description = fixture.debugElement.query(By.css('.help-description'));
        expect(description).not.toBeNull();
        expect(description.nativeElement.textContent).toMatch(component.description);

        // click on the toggle
        let toggle = fixture.debugElement.query(By.css('a#description-toggle'));
        expect(toggle).not.toBeNull();
        toggle.nativeElement.click();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(component.showDescription).toBeFalsy();
            description = fixture.debugElement.query(By.css('.help-description'));
            expect(description).toBeNull();

            // click it again
            toggle = fixture.debugElement.query(By.css('a#description-toggle'));
            expect(toggle).not.toBeNull();
            toggle.nativeElement.click();
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(component.showDescription).toBeTruthy();
                description = fixture.debugElement.query(By.css('.help-description'));
                expect(description).not.toBeNull();
            });
        });
    }));

});
