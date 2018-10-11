import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';
import { GlobalModule } from '../../../global/global.module';
import { RecentReportsComponent } from './recent-reports.component';
import { threatReducer } from '../../store/threat.reducers';
import { StoreModule } from '@ngrx/store';


describe('RecentReportsComponent', () => {
  let component: RecentReportsComponent;
  let fixture: ComponentFixture<RecentReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentReportsComponent ],
      imports: [MatIconModule, 
        GlobalModule, 
        StoreModule.forRoot(threatReducer)],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
