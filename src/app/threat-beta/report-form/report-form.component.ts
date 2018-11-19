import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, of as observableOf, Subscription, fromEvent as observableFromEvent, combineLatest} from 'rxjs';
import { pluck, map, filter, withLatestFrom, tap, switchMap, take, finalize, delay, debounceTime, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ThreatBoard } from 'stix/unfetter/index';
import { AttackPattern } from 'stix';

import { ReportForm } from '../../global/form-models/report';
import { AppState } from '../../root-store/app.reducers';
import MarkingDefinitionHelpers from '../../global/static/marking-definition-helper';
import { ExtractTextSupportedFileTypes } from '../../global/enums/extract-text-file-types.enum';
import { ExtractTextService } from '../../core/services/extract-text.service';
import { OpenSnackbar, HideFooter, ShowFooter } from '../../root-store/utility/utility.actions';
import { getSelectedBoardId, getSelectedBoard, getBoundaryObjects } from '../store/threat.selectors';
import * as fromThreat from '../store/threat.actions';
import { CodeMirrorHelpers } from '../../global/static/codemirror-helpers';
import { TextTagForm } from '../../global/form-models/text-tag';

@Component({
  selector: 'report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit, OnDestroy {

  public form: FormGroup = ReportForm();
  public editMode = false;
  public marking$: Observable<any>;
  public supportedFileTypes: string[] = Object.values(ExtractTextSupportedFileTypes).concat('Other');
  public file: File;
  public loadingComplete$: Observable<boolean>;
  public boardId$: Observable<string>;
  public attackPatterns$: Observable<AttackPattern[]>;
  public selectedBoard$: Observable<ThreatBoard>;
  public boundaryObjects$: Observable<any>;
  public indicatedPatterns$: Observable<any>;
  public showFab: boolean;

  @ViewChild('fileInput') 
  public fileInput: ElementRef;
  @ViewChild('mde') 
  public mde;
  @ViewChild('fab')
  public fab: ElementRef;

  private codeMirror: CodeMirror.Editor;
  private codeMirrorHelpers: CodeMirrorHelpers;

  constructor(
    public location: Location,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private extractTextService: ExtractTextService
  ) { }

  ngOnInit() {
    this.store.dispatch(new HideFooter());

    this.selectedBoard$ = this.store.select(getSelectedBoard);
    this.boundaryObjects$ = this.store.select(getBoundaryObjects);
    this.attackPatterns$ = this.store.select('stix').pipe(pluck('attackPatterns'));
    this.loadingComplete$ = this.store.select('threat').pipe(pluck('threatboardLoadingComplete'));

    this.boardId$ = this.route.params
      .pipe(
        filter((params) => params && params.boardId),
        pluck('boardId')
      );
    
    const selectedBoardChange$: Subscription = this.store.select('threat')
      .pipe(
        filter((threat) => threat.dashboardLoadingComplete),
        take(1),
        switchMap(() => this.boardId$),
        withLatestFrom(this.store.select(getSelectedBoardId)),
        finalize(() => selectedBoardChange$ && selectedBoardChange$.unsubscribe())
      )
      .subscribe(
        ([routeId, currentId]) => {
          if (routeId !== currentId) {
            this.store.dispatch(new fromThreat.SetSelectedBoardId(routeId));
            this.store.dispatch(new fromThreat.FetchBoardDetailedData(routeId));
          }

          if (!this.codeMirror) {
            this.initCodemirror();
          }
        },
        (err) => {
          console.log(err);
        }
      );    

    this.marking$ = this.store
      .select('stix')
      .pipe(
        pluck('markingDefinitions'),
        map((markings: any[]) => {
          return markings.map((marking) => {
            return {
              ...marking,
              label: MarkingDefinitionHelpers.getMarkingLabel(marking)
            };
          });
        })
      );
    
    this.indicatedPatterns$ = combineLatest(
        this.form.get('object_refs').valueChanges.pipe(startWith(this.form.get('object_refs').value)),
        this.attackPatterns$
      )
      .pipe(
        map(([indicatedPatterns, attackPatterns]) => {
          return indicatedPatterns
            .map((indicatedPattern) => {
              return {
                id: indicatedPattern,
                name: attackPatterns.find((ap) => ap.id === indicatedPattern).name || 'Unknown'
              };
            });
        })
      );
  }
  
  ngOnDestroy() {
    this.store.dispatch(new ShowFooter());
  }

  public extractTextByUrl() {
    if (this.form.get('external_references').get('0').status === 'INVALID') {
      console.warn('Attempt to extract text by url without a valid form');
      return;
    }
    const url = this.form.get('external_references').get('0').get('url').value;
    const fileType = this.form.get('metaProperties').get('extractedText').get('fileType').value;
    this.extractTextService.extractTextFromUrl(url, fileType)
      .subscribe(
        ({ extractedText }) => {
          this.form.get('description').setValue(extractedText)
        },
        (err) => {
          this.store.dispatch(new OpenSnackbar('Unable to extract text'));
        }
      );
  }

  public extractTextByFile() {
    const fileType = this.form.get('metaProperties').get('extractedText').get('fileType').value;
    this.extractTextService.extractTextFromFile(this.file, fileType)
      .subscribe(
        ({ extractedText }) => {
          this.form.get('description').setValue(extractedText)
        },
        (err) => {
          this.store.dispatch(new OpenSnackbar('Unable to extract text'));
        }
      );
  }

  public onTagClick(apId) {
    const selection = this.codeMirror.state.markedSelection[0];
    const tag = {
      stixId: apId,
      text: selection.lines.map(l => l.text).reduce((acc, cur) => acc + cur, ''),
      range: {
        anchor: {
          line: selection.doc.sel.ranges[0].head.line,
          ch: selection.doc.sel.ranges[0].head.ch
        },
        head: {
          line: selection.doc.sel.ranges[0].anchor.line,
          ch:  selection.doc.sel.ranges[0].anchor.ch
        }
      }
    };
    const tagForm = TextTagForm();
    tagForm.patchValue(tag);
    (this.form.get('metaProperties').get('textTags') as FormArray).push(tagForm);
    const objectRefs = this.form.get('object_refs').value;
    if (!objectRefs.includes(apId)) {
      objectRefs.push(apId);
      this.form.get('object_refs').patchValue(objectRefs);
    }
  }

  public removeIndicatedPattern(index: number) {
    const objectRefsCopy = this.form.get('object_refs').value;
    objectRefsCopy.splice(index, 1);
    this.form.get('object_refs').patchValue(objectRefsCopy);
  }

  fileInputChange(event) {
    this.file = event.target.files[0];    
  }

  selectFiles() {
    this.fileInput.nativeElement.click();
  }

  private resetForm() {
    this.form = ReportForm();
  }

  private initCodemirror() {
    this.loadingComplete$
      .pipe(
        filter(loading => !!loading),
        take(1),
        delay(300) // Give time for CodeMirror to initialize
      )
      .subscribe(() => {
        if (this.mde && this.mde.simplemde && this.mde.simplemde.codemirror) {          
          this.codeMirror = this.mde.simplemde.codemirror;
          this.codeMirrorHelpers = new CodeMirrorHelpers(this.codeMirror);
          observableFromEvent(this.mde.simplemde.codemirror, 'cursorActivity')
            .pipe(
              tap(() => this.showFab = false),
              // Only allow 1 selection, to avoid multi-range selections
              filter((cm: CodeMirror.Editor) => cm.state.markedSelection && cm.state.markedSelection.length === 1),
              debounceTime(200),
            )
            .subscribe(
              (cm) => {
                this.codeMirrorHelpers.positionAtCursor(this.fab.nativeElement, 0, -25);
                this.showFab = true;
              },
              (err) => console.log(err)
            );
        } else {
          console.log('unable to initialize code mirror tagging');
        }
      });
  }

}
