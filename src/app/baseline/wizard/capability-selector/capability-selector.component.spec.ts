import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatIconModule, MatSelectModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from 'app/root-store/app.reducers';
import { baselineReducer } from '../../../baseline/store/baseline.reducers';
import { CapabilitySelectorComponent } from './capability-selector.component';
import { CapabilityComponent } from './capability.component';

describe('CapabilitySelectorComponent', () => {
  let component: CapabilitySelectorComponent;
  let fixture: ComponentFixture<CapabilitySelectorComponent>;

  const matModules = [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapabilityComponent ],
      imports: [
        NoopAnimationsModule,
        ...matModules,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'baseline': combineReducers(baselineReducer)
        }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
