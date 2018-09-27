import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatChipsModule } from '@angular/material';
import { Location } from '@angular/common';

import { ArticleEditorComponent } from './article-editor.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../../root-store/app.reducers';
import { ArticleForm } from '../../../global/form-models/article';
import { SimplemdeMentionsComponent } from '../../../global/components/simplemde-mentions/simplemde-mentions.component';

describe('ArticleEditorComponent', () => {
  let component: ArticleEditorComponent;
  let fixture: ComponentFixture<ArticleEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers),
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatChipsModule
      ],
      providers: [
        { provide: Location, useValue: { back: () => { } } },
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
