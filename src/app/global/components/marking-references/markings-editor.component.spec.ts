import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkingsEditorComponent } from './markings-editor.component';

describe('MarkingsEditorComponent', () => {
  let component: MarkingsEditorComponent;
  let fixture: ComponentFixture<MarkingsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkingsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkingsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
