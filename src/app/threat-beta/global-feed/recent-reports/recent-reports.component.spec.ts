import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { GlobalModule } from '../../../global/global.module';
import { threatReducer } from '../../store/threat.reducers';
import { RecentReportsComponent } from './recent-reports.component';
import { FeedCarouselComponent } from '../../feed-carousel/feed-carousel.component';

xdescribe('RecentReportsComponent', () => {

  let component: RecentReportsComponent;
  let fixture: ComponentFixture<RecentReportsComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          RecentReportsComponent,
          FeedCarouselComponent,
        ],
        imports: [
          MatIconModule,
          GlobalModule,
          StoreModule.forRoot(threatReducer),
        ],
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
