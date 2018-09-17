import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownMentionsComponent } from './markdown-mentions.component';

describe('MarkdownMentionsComponent', () => {
  let component: MarkdownMentionsComponent;
  let fixture: ComponentFixture<MarkdownMentionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkdownMentionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownMentionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
