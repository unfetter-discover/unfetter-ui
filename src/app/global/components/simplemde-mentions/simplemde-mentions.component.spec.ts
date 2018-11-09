import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';

import { SimplemdeMentionsComponent } from './simplemde-mentions.component';
import { reducers } from '../../../root-store/app.reducers';

/**
 * TODO figure how to write a test for a ControlValueAccessor
 */
xdescribe('SimplemdeMentionsComponent', () => {
  let component: SimplemdeMentionsComponent;
  let fixture: ComponentFixture<SimplemdeMentionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplemdeMentionsComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers),
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
