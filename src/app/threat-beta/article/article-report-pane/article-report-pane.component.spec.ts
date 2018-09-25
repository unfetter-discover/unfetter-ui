import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleReportPaneComponent } from './article-report-pane.component';

describe('ArticleReportPaneComponent', () => {
  let component: ArticleReportPaneComponent;
  let fixture: ComponentFixture<ArticleReportPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleReportPaneComponent ]
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
