import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatTabsModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalModule } from '../../global/global.module';
import { ThreatHeaderComponent } from '../threat-header/threat-header.component';
import { ArticleComponent } from './article.component';


describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleComponent,
                      ThreatHeaderComponent,
                    ],
      imports: [ RouterTestingModule,
                 MatTabsModule,
                 MatIconModule,
                  GlobalModule],
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
