import { async, ComponentFixture, TestBed, fakeAsync, tick
} from '@angular/core/testing';
import { Location, LocationStrategy, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MdSnackBar, MdDialog, MdInputModule } from '@angular/material';
import { StixService } from '../../../stix.service';
import { ActivatedRoute, Router } from '@angular/router';
import { newEvent, click } from '../../../../testing/index';

// Load the implementations that should be tested
import { CampaignsNewComponent } from './campaigns-new.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

let comp: CampaignsNewComponent;
let fixture: ComponentFixture<CampaignsNewComponent>;
let de: DebugElement;
let el: HTMLInputElement;

describe('CampaignsNewComponent', () => {
    describe('Test', componetInitialized);
    describe('Test', buttons);
    describe('Test', form);
});

function componetInitialized() {
    moduleSetup();
    describe('component creation', () => {
        createComponent();
        it('should instantiate it', () => {
            expect(comp).not.toBeNull();
          });
    });
}

//////////////////////////////////
function buttons() {
    moduleSetup();
    describe('CANCEL, and SAVE & CLOSE buttons', () => {
        createComponent();

        it('should disable save button if name field is empty', () => {
            comp.campaign.attributes.name = null;
            fixture.detectChanges(); // runs initial lifecycle hooks
            de = fixture.debugElement.query(By.css('#save-btn'))
            // should not create campaign
            expect(de.nativeElement.disabled).toBe(true, 'should disable save button if name field is empty');
        });

        it('should enable save button if name field is not empty', () => {
            comp.campaign.attributes.name = 'New campaign';
            fixture.detectChanges(); // runs initial lifecycle hooks
            de = fixture.debugElement.query(By.css('#save-btn'))
            // should not create campaign
            expect(de.nativeElement.disabled).toBe(false, 'should enable save button if name field is not empty');
        });

        it('should navigate back if cancel button click', () => {
            const location  = fixture.debugElement.injector.get(Location);
            const locationSpy = spyOn(location, 'back');

            fixture.detectChanges(); // runs initial lifecycle hooks
            de = fixture.debugElement.query(By.css('#cancel-btn'))
            click(de)
            // should not create campaign
            expect(locationSpy.calls.any()).toBe(true, 'should navigate back if cancel button click');
        });
    });
}

//////////////////////////////////
function form() {
    moduleSetup();
    describe('update model when form field is populated', () => {
        createComponent();

        it('should add name to model', () => {
            const testName = 'campaign Name';

            expect(comp.campaign.attributes.name).toBeUndefined('model should not have name value');

            // simulate user entering new name into the input box
            el = fixture.debugElement.query(By.css('#campaign-name')).nativeElement;
            el.value = testName;
            // dispatch a DOM event so that Angular learns of input value change.
            el.dispatchEvent(newEvent('input'));

            expect(comp.campaign.attributes.name).toBe(testName, 'should add name to model');
        });

        it('should add data to model', fakeAsync(() => {
            const first_seen = new Date().toString();
            fixture.detectChanges();
            tick(200);
            el = fixture.debugElement.query(By.css('#campaign-first-seen')).nativeElement;
            // expect(comp.campaign.attributes.first_seen).toBe(el.value, 'model should not have name value');

            // simulate user entering new objective into the input box
            el.value = first_seen

            // dispatch a DOM event so that Angular learns of input value change.
            el.dispatchEvent(newEvent('input'));

            expect(comp.campaign.attributes.first_seen).toBe(first_seen, 'should add name to model');
        }));

        it('should add objective to model', () => {
            const objective = 'campaign objective name';

            expect(comp.campaign.attributes.objective).toBeUndefined('model should not have name value');

            // simulate user entering new objective into the input box
            el = fixture.debugElement.query(By.css('#objective-name')).nativeElement;
            el.value = objective;
            // dispatch a DOM event so that Angular learns of input value change.
            el.dispatchEvent(newEvent('input'));

            expect(comp.campaign.attributes.objective).toBe(objective, 'should add name to model');
        });
    })
}
function createComponent() {
    beforeEach(() => {
        fixture = TestBed.createComponent(CampaignsNewComponent);
        comp    = fixture.componentInstance;

        // trigger initial data binding
        fixture.detectChanges();
    });
}

function moduleSetup() {
    // async beforeEach
    beforeEach( async(() => {
       TestBed.configureTestingModule({
         imports: [
            FormsModule, NoopAnimationsModule, MdInputModule
         ],
         declarations: [CampaignsNewComponent],
         schemas: [NO_ERRORS_SCHEMA],
         providers: [
           { provide: StixService, useValue: {}},
           { provide: ActivatedRoute, useValue: {} },
           { provide: Router, useValue: {} },
           { provide: MdDialog, useValue: {} },
           { provide: Location, useValue: {back: (): void => {} } },
           { provide: MdSnackBar, useValue: {} },
        //    { provide: OverlayContainer, useFactory: () => {
        //      overlayContainerElement = document.createElement('div') as HTMLElement;
        //      overlayContainerElement.classList.add('cdk-overlay-container');

        //      document.body.appendChild(overlayContainerElement);

        //      // remove body padding to keep consistent cross-browser
        //      document.body.style.padding = '0';
        //      document.body.style.margin = '0';

        //      return {getContainerElement: () => overlayContainerElement};
        //    }},
         ]
       });
     })
   );
 }
