import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplemdeMentionsComponent } from './simplemde-mentions.component';

describe('SimplemdeMentionsComponent', () => {
  let component: SimplemdeMentionsComponent;
  let fixture: ComponentFixture<SimplemdeMentionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplemdeMentionsComponent ]
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
