import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkingsListComponent } from './markings-list.component';

describe('MarkingsListComponent', () => {
  let component: MarkingsListComponent;
  let fixture: ComponentFixture<MarkingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkingsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
