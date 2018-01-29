import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterListDialogComponent } from './master-list-dialog.component';

describe('MasterListDialogComponent', () => {
  let component: MasterListDialogComponent;
  let fixture: ComponentFixture<MasterListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
