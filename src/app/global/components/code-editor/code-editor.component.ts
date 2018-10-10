import { Component, AfterViewInit, ViewChild, ElementRef, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as CodeMirror from 'codemirror';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/xml-fold.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/closetag.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/yaml/yaml.js';
import 'codemirror/mode/xml/xml.js';

export interface ExtendedEditorConfiguration extends CodeMirror.EditorConfiguration {
  autoCloseBrackets?: boolean;
  autoCloseTags?: boolean;
}

export type ufCodeMirrorModes = 'JSON' | 'YAML' | 'YML' | 'XML' | 'Text';
export type ufCodeMirrorThemes = 'material';

@Component({
  selector: 'code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeEditorComponent),
      multi: true
    }
  ]
})
export class CodeEditorComponent implements AfterViewInit, ControlValueAccessor {

  @ViewChild('cm')
  public cm: ElementRef;
  public codemirror: CodeMirror.Editor;
  public langs: ufCodeMirrorModes[] = [
    'Text',
    'JSON',
    'YAML',
    'XML',
  ];

  @Input()
  public readOnly = false;

  @Input()
  public theme: ufCodeMirrorThemes = 'material';

  @Input()
  public set selectedLang(v: ufCodeMirrorModes) {
    this._selectedLang = v;
    if (this.codemirror) {
      this.refreshCodeMirror();
    }
  }

  public get selectedLang() { return this._selectedLang; }

  private onTouchedCallback: () => {};
  private onChangeCallback: (_: any) => {};
  private _innerValue: string;
  private formDirty = false;  
  private _selectedLang: ufCodeMirrorModes = 'Text';

  constructor() { }

  ngAfterViewInit() {
    this.initCodemirror();
  }

  public refreshCodeMirror() {
    if (this.codemirror) {
      const el = this.codemirror.getWrapperElement();
      el.parentNode.removeChild(el);
      this.codemirror = null;
    }
    requestAnimationFrame(() => {
      this.initCodemirror();
    });
  }

  public initCodemirror() {
    const config: ExtendedEditorConfiguration = {
      lineNumbers: true,
      theme: this.theme,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      readOnly: this.readOnly
    };

    switch (this.selectedLang) {
      case 'JSON':
        config.mode = { name: 'javascript', json: true };
        config.autoCloseBrackets = true;
        this.codemirror = CodeMirror(this.cm.nativeElement, config);
        break;
      case 'YAML':
      case 'YML':
        config.mode = 'yaml';
        config.tabSize = 2;
        this.codemirror = CodeMirror(this.cm.nativeElement, config);
        break;
      case 'XML':
        config.mode = 'xml';
        config.autoCloseTags = true;
        this.codemirror = CodeMirror(this.cm.nativeElement, config);
        break;
      default:
        // Default to text
        this.codemirror = CodeMirror(this.cm.nativeElement, config);
    }

    console.log('Setting value as: ', this.value || '');

    this.codemirror.setValue(this.value || '');
    this.codemirror.on('change', () => {
      this.value = this.codemirror.getValue();
    });
  }

  set value(v: string) {
    if (v !== this._innerValue && this.onChangeCallback) {
      this._innerValue = v;
      this.formDirty = true;
      this.onChangeCallback(v);
    }
  }

  get value(): string {
    return this._innerValue;
  }

  /**
   * @override ControlValueAccessor
   * @param fn
   */
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  /**
   * @override ControlValueAccessor
   * @param fn 
   */
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  /**
   * @override ControlValueAccessor
   * @param v 
   */
  writeValue(v: string) {
    if (v !== this._innerValue) {
      this._innerValue = v;
    }
  }

}
