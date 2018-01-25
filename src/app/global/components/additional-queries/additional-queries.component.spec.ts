import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdditionalQueriesComponent } from './additional-queries.component';

describe('AdditionalQueriesComponent', () => {
  let component: AdditionalQueriesComponent;
  let fixture: ComponentFixture<AdditionalQueriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalQueriesComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
