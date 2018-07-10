import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatButtonModule, MatInputModule } from '@angular/material';
import { MarkdownComponent } from 'ngx-markdown';
import { HelpWindowComponent } from './help-window.component';
import { MarkdownEditorComponent } from '../markdown-editor/markdown-editor.component';

describe('HelpWindowComponent', () => {
  let component: HelpWindowComponent;
  let fixture: ComponentFixture<HelpWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HelpWindowComponent,
        MarkdownEditorComponent,
        MarkdownComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
