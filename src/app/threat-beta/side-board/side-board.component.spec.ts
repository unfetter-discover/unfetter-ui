import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { GlobalModule } from '../../global/global.module';
import { SideBoardComponent } from './side-board.component';
import mockThreatReducer from '../testing/mock-reducer';


describe('SideBoardComponent', () => {
  let component: SideBoardComponent;
  let fixture: ComponentFixture<SideBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SideBoardComponent],
      imports: [
        GlobalModule,
        RouterTestingModule,
        NoopAnimationsModule,
        StoreModule.forRoot(mockThreatReducer)
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
