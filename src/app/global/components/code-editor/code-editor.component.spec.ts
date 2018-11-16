import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { MatIconModule, MatOptionModule, MatSelectModule, MatTooltipModule } from '@angular/material';
import { ClipboardModule } from 'ngx-clipboard';

import { CodeEditorComponent } from './code-editor.component';

describe('CodeEditorComponent', () => {

  let fixture: ComponentFixture<CodeEditorComponent>;
  let component: CodeEditorComponent;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          NoopAnimationsModule,
          FormsModule,
          MatIconModule,
          MatOptionModule,
          MatSelectModule,
          MatTooltipModule,
          ClipboardModule,
        ],
        declarations: [ CodeEditorComponent ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeEditorComponent);
    component = fixture.componentInstance;
    component.selectedLang = 'JSON';
    component.value = `{
      "description": "This is a JSON object"
    }`;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
