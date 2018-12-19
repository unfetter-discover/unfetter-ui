import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { of as observableOf } from 'rxjs';

import { FabListComponent } from './fab-list.component';

describe('FabListComponent', () => {
  let component: FabListComponent;
  let fixture: ComponentFixture<FabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabListComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        OverlayModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabListComponent);
    component = fixture.componentInstance;
    component.items$ = observableOf([{id: '123', name: 'foo'}]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
