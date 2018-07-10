import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { of as observableOf, Observable } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RunConfigService } from '../../../core/services/run-config.service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  const config = {
    'showBanner': true,
    'bannerText': 'This is a test',
    'contentOwner': 'bob',
    'pagePublisher': 'bob',
    'lastReviewed': 20170404,
    'lastModified': 20170404,
    'footerTextHtml': '<p>hi</p><br><p>More stuff!</p>',
  };
  const mockRunConfig = {
    loadPrivateConfig: () => {
      console.log('i solemnly swear i am not trying to perform an http get...');
    },
    config: observableOf(config)
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: RunConfigService,
          useValue: mockRunConfig
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
