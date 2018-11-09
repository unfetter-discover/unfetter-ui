import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatChipsModule } from '@angular/material';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { of as observableOf } from 'rxjs';

import { ArticleEditorComponent } from './article-editor.component';
import { ArticleForm } from '../../../global/form-models/article';
import { SimplemdeMentionsComponent } from '../../../global/components/simplemde-mentions/simplemde-mentions.component';
import { ThreatDashboardBetaService } from '../../threat-beta.service';
import MockThreatDashboardBetaService from '../../testing/mock-threat.service';
import { GenericApi } from '../../../core/services/genericapi.service';
import mockThreatReducer from '../../testing/mock-reducer';

describe('ArticleEditorComponent', () => {
  let component: ArticleEditorComponent;
  let fixture: ComponentFixture<ArticleEditorComponent>;

  const mockRoute: any = {
    snapshot: {
      url: [ '_', 'new' ],
      parent: {
        params: {
          boardId: 'x-unfetter-threat-board-1'
        }
      }
    }    
  };

  const mockGenericApi: any = {
    uploadAttachments: () => observableOf([{
      _id: '5bb663378bc599007684cde0',
      length: 172002,
      chunkSize: 261120,
      uploadDate: '2018-10-04T15:00:07.165-04:00',
      md5: '12f4f9bc01837d3426dade0181e59b67',
      filename: 'bootstrap.zip',
      contentType: 'application/zip'
    }])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(mockThreatReducer),
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatChipsModule
      ],
      providers: [
        { provide: Location, useValue: { back: () => { } } },
        { provide: ThreatDashboardBetaService, useValue: MockThreatDashboardBetaService },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: Router, useValue: { navigate: () => { } } },
        { provide: GenericApi, useValue: mockGenericApi }
      ],
      declarations: [
        ArticleEditorComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleEditorComponent);
    component = fixture.componentInstance;
    component.form = ArticleForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
