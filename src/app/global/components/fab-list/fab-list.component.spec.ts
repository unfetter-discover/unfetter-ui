import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabListComponent } from './fab-list.component';

describe('FabListComponent', () => {
  let component: FabListComponent;
  let fixture: ComponentFixture<FabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
