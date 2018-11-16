import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTagListComponent } from './text-tag-list.component';

describe('TextTagListComponent', () => {
  let component: TextTagListComponent;
  let fixture: ComponentFixture<TextTagListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextTagListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextTagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
