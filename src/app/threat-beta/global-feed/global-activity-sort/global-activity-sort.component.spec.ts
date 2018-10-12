import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalActivitySortComponent } from './global-activity-sort.component';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material';

describe('GlobalActivitySortComponent', () => {
  let component: GlobalActivitySortComponent;
  let fixture: ComponentFixture<GlobalActivitySortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalActivitySortComponent ],
      imports: [ FormsModule, MatRadioModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalActivitySortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
