import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatTabsModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalModule } from '../../global/global.module';
import { SideBoardComponent } from '../side-board/side-board.component';
import { ThreatHeaderComponent } from '../threat-header/threat-header.component';
import { FeedComponent } from './feed.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedComponent,
        ThreatHeaderComponent,
        SideBoardComponent,
      ],
      imports: [RouterTestingModule,
        MatTabsModule,
        MatIconModule,
        GlobalModule,
        NoopAnimationsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
