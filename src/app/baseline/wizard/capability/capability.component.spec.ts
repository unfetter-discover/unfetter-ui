import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatIconModule, MatTooltipModule, MatInputModule, MatTableModule, MatSelectModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CapabilityComponent } from './capability.component';

import { MatTableDataSource } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as assessReducers from '../../store/baseline.reducers';
import { GenericApi } from '../../../core/services/genericapi.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CapabilityComponent', () => {
  let component: CapabilityComponent;
  let fixture: ComponentFixture<CapabilityComponent>;

  beforeEach(async(() => {
    const matModules = [
      MatButtonModule,
      MatCardModule,
      MatIconModule,
      MatTooltipModule,
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,
      MatSelectModule,
    ];

    TestBed.configureTestingModule({
      declarations: [CapabilityComponent],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        ...matModules,
        StoreModule.forRoot(assessReducers),
        ReactiveFormsModule,
      ],
      providers: [GenericApi]
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
