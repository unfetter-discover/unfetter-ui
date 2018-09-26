import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalModule } from '../../global/global.module';
import { SideBoardComponent } from '../side-board/side-board.component';
import { ThreatHeaderComponent } from '../threat-header/threat-header.component';
import { ArticleComponent } from './article.component';


describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleComponent,
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
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
