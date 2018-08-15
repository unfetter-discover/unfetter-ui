import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { PiiCheckMessageComponent } from './pii-check-message.component';

describe('PiiCheckMessageComponent', () => {
  let component: PiiCheckMessageComponent;
  let fixture: ComponentFixture<PiiCheckMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiiCheckMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiiCheckMessageComponent);
    component = fixture.componentInstance;
    component.formCtrl = new FormControl('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
