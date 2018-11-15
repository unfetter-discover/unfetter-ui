import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde';

import { SimplemdeMentionsComponent } from './simplemde-mentions.component';
import { SimpleMDEConfig } from '../../static/simplemde-config';
import { reducers } from '../../../root-store/app.reducers';

/**
 * TODO figure how to write a test for a ControlValueAccessor
 */
describe('SimplemdeMentionsComponent', () => {

    let fixture: ComponentFixture<SimplemdeMentionsComponent>;
    let component: SimplemdeMentionsComponent;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    FormsModule,
                    ReactiveFormsModule,
                    SimplemdeModule.forRoot({
                        provide: SIMPLEMDE_CONFIG,
                        useValue: SimpleMDEConfig.basicConfig
                    }),
                    StoreModule.forRoot(reducers),
                ],
                declarations: [
                    SimplemdeMentionsComponent,
                ],
                schemas: [NO_ERRORS_SCHEMA]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimplemdeMentionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
