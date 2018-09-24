import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedComponent } from './feed.component';
import { ThreatHeaderComponent } from '../threat-header/threat-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTabsModule, MatIconModule } from '@angular/material';
import { GlobalModule } from '../../global/global.module';


describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedComponent,
        ThreatHeaderComponent,
      ],
      imports: [RouterTestingModule,
        MatTabsModule,
        MatIconModule,
        GlobalModule],
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
