import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, of as observableOf, Subscription, fromEvent as observableFromEvent} from 'rxjs';
import { pluck, map, filter, withLatestFrom, tap, switchMap, take, finalize, delay, debounceTime } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ThreatBoard } from 'stix/unfetter/index';
import { AttackPattern } from 'stix';

import { ReportForm } from '../../global/form-models/report';
import { AppState } from '../../root-store/app.reducers';
import MarkingDefinitionHelpers from '../../global/static/marking-definition-helper';
import { ExtractTextSupportedFileTypes } from '../../global/enums/extract-text-file-types.enum';
import { ExtractTextService } from '../../core/services/extract-text.service';
import { OpenSnackbar } from '../../root-store/utility/utility.actions';
import { getSelectedBoardId, getSelectedBoard, getBoundaryObjects } from '../store/threat.selectors';
import * as fromThreat from '../store/threat.actions';
import { CodeMirrorHelpers } from '../../global/static/codemirror-helpers';

@Component({
  selector: 'report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFormComponent implements OnInit {

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
  public showFab = false;

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

    this.loadingComplete$ = this.store.select('threat').pipe(pluck('threatboardLoadingComplete'));
    this.selectedBoard$ = this.store.select(getSelectedBoard);
    this.boundaryObjects$ = this.store.select(getBoundaryObjects);
    this.attackPatterns$ = this.store.select('stix').pipe(pluck('attackPatterns'));

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
    console.log(apId);
    console.log(this.codeMirror.state.markedSelection);
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
              filter((cm: CodeMirror.Editor) => cm.state.markedSelection && cm.state.markedSelection.length),
              debounceTime(200),
            )
            .subscribe(
              (cm) => {
                console.log(cm);
                this.showFab = true;
                this.codeMirrorHelpers.positionAtCursor(this.fab.nativeElement, 0, -22);
              },
              (err) => console.log(err)
            );
        } else {
          console.log('unable to initialize code mirror tagging');
        }
      });
  }

}
