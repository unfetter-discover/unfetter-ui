import { Component, AfterViewInit, ViewChild, ElementRef, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { MatTooltip } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, finalize, map } from 'rxjs/operators';
import * as CodeMirror from 'codemirror';

import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/xml-fold.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/closetag.js';
import 'codemirror/addon/edit/matchbrackets.js';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/yaml/yaml.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/shell/shell.js';
import 'codemirror/mode/powershell/powershell.js';
import 'codemirror/mode/sql/sql.js';

import 'codemirror/keymap/sublime.js';

import { FormatHelpers } from '../../static/format-helpers';

export interface ExtendedEditorConfiguration extends CodeMirror.EditorConfiguration {
  autoCloseBrackets?: boolean;
  autoCloseTags?: boolean;
  matchBrackets?: boolean;
}

export type ufCodeMirrorModes = 'JSON' | 'YAML' | 'YML' | 'XML' | 'Shell' | 'PowerShell' | 'SQL' | 'Other';
// Currently, only sublime is being used
export type ufCodeMirrorKeymaps = 'sublime';
export type ufCodeMirrorThemes = 'material' | 'idea';

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
export class CodeEditorComponent implements AfterViewInit, ControlValueAccessor, OnInit {

  @ViewChild('cm')
  public cm: ElementRef;
  public codemirror: CodeMirror.Editor;  
  public langs: ufCodeMirrorModes[] = [
    'Other',
    'JSON',
    'PowerShell',
    'Shell',
    'SQL',
    'XML',
    'YAML'
  ];
  public keymaps: ufCodeMirrorKeymaps[] = [
    'sublime'
  ];
  public copyText: string = 'Copied';

  @Input()
  public readOnly = false;

  @Input()
  public syntaxCtrl: FormControl = new FormControl('');

  @Input()
  public set selectedLang(v: ufCodeMirrorModes) {
    this._selectedLang = v;
    this.syntaxCtrl.patchValue(v);
    if (this.codemirror) {
      this.refreshCodeMirror();
    }
  }

  public get selectedLang() { return this._selectedLang; }

  @Input()
  public set selectedKeymap(v: ufCodeMirrorKeymaps) {
    this._selectedKeymap = v;
    if (this.codemirror) {
      this.refreshCodeMirror();
    }
  }

  public get selectedKeymap() { return this._selectedKeymap; }

  @Input()
  public set lineWrapping(v: boolean) {
    this._lineWrapping = v;
    if (this.codemirror) {
      this.refreshCodeMirror();
    }
  }

  public get lineWrapping() { return this._lineWrapping; }

  @Input()
  public set theme(v: ufCodeMirrorThemes) {
    this._theme = v;
    if (this.codemirror) {
      this.refreshCodeMirror();
    }
  }

  public get theme() { return this._theme; }

  @Input()
  set value(v: string) {
    if (v !== this._innerValue) {
      this._innerValue = v;
      this.formDirty = true;
      if (this.onChangeCallback) {
        this.onChangeCallback(v);
      }
    }
  }

  get value(): string {
    return this._innerValue;
  }

  private onTouchedCallback: () => {};
  private onChangeCallback: (_: any) => {};
  private readonly FLASH_TOOLTIP_TIMER: number = 500;
  private formDirty = false;
  private onChangeSubject = new Subject<null>();
  private _innerValue: string;
  private _selectedLang: ufCodeMirrorModes = 'Other';
  private _selectedKeymap: ufCodeMirrorKeymaps = 'sublime';
  private _lineWrapping: boolean = false;
  private _theme: ufCodeMirrorThemes = 'idea';

  constructor() { }

  ngOnInit() {
    if (this.syntaxCtrl) {
      if (this.langs.includes(this.syntaxCtrl.value)) {
        this.selectedLang = this.syntaxCtrl.value;
      } else {
        console.log('syntaxCtrl was passed in containing an invalid value');
      }
    } else {
      this.syntaxCtrl = new FormControl(this.selectedLang);
    }

    const change$ = this.onChangeSubject
      .pipe(
        debounceTime(20),
        finalize(() => change$ && change$.unsubscribe())
      )
      .subscribe(
        () => {
          if (this.codemirror) {
            this.value = FormatHelpers.normalizeQuotes(this.codemirror.getValue());
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

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
      keyMap: this._selectedKeymap,
      lineWrapping: this.lineWrapping,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      readOnly: this.readOnly
    };

    switch (this.selectedLang) {
      case 'JSON':
        config.mode = { name: 'javascript', json: true };
        config.autoCloseBrackets = true;
        if (!this.readOnly) {
          config.matchBrackets = true;
        }
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
      case 'Shell':
        config.mode = 'shell';
        this.codemirror = CodeMirror(this.cm.nativeElement, config);
        break;
      case 'SQL':
        config.mode = 'text/x-sql';
        this.codemirror = CodeMirror(this.cm.nativeElement, config);
        break;
      case 'PowerShell':
        config.mode = 'powershell';
        this.codemirror = CodeMirror(this.cm.nativeElement, config);
        break;
      default:
        // Default to text
        this.codemirror = CodeMirror(this.cm.nativeElement, config);
    }

    this.codemirror.setValue(this.value || '');
    this.codemirror.on('change', () => this.onChangeSubject.next());
    this.codemirror.on('blur', () => {
      if (this.onTouchedCallback) {
        this.onTouchedCallback();
      }
      if (!this.formDirty && this.onChangeCallback) {
        this.onChangeCallback(this.value);
      }
      this.formDirty = true;
    });
  }

  public handleCopy(event: { isSuccess: true }, toolTip: MatTooltip) {
    if (!event.isSuccess) {
      this.copyText = 'Copy Failed';
    } else {
      this.copyText = 'Copied';
    }
    this.flashTooltip(toolTip);
  }

  public flashTooltip(toolTip: MatTooltip) {
    toolTip.show();
    setTimeout(() => toolTip.hide(), this.FLASH_TOOLTIP_TIMER);
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
      if (this.codemirror) {
        this.codemirror.setValue(this._innerValue);
      }
    }
  }

}
