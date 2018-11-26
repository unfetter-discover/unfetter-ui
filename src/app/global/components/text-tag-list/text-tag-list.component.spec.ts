import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { TextTagListComponent } from './text-tag-list.component';
import { reducers } from '../../../root-store/app.reducers';
import { ReportForm } from '../../form-models/report';

describe('TextTagListComponent', () => {
  let component: TextTagListComponent;
  let fixture: ComponentFixture<TextTagListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextTagListComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [StoreModule.forRoot(reducers)]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextTagListComponent);
    component = fixture.componentInstance;
    component.form = ReportForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
