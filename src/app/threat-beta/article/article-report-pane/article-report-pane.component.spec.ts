import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ArticleReportPaneComponent } from './article-report-pane.component';
import mockThreatReducer from '../../testing/mock-reducer';

describe('ArticleReportPaneComponent', () => {
  let component: ArticleReportPaneComponent;
  let fixture: ComponentFixture<ArticleReportPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleReportPaneComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(mockThreatReducer)
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleReportPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
