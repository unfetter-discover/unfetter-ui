import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin as observableForkJoin, of as observableOf } from 'rxjs';
import { pluck, distinctUntilChanged, map, startWith, finalize, take, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Article } from 'stix/unfetter/index';
import { Report } from 'stix';


import { MasterConfig } from '../../../core/services/run-config.service';
import { ThreatFeatureState } from '../../store/threat.reducers';
import { ThreatDashboardBetaService } from '../../threat-beta.service';
import { cleanObjectProperties } from '../../../global/static/clean-object-properties';
import { getSelectedBoard } from '../../store/threat.selectors';
import * as threatActions from '../../store/threat.actions';
import * as utilityActions from '../../../root-store/utility/utility.actions';
import { GenericApi } from '../../../core/services/genericapi.service';
import { GridFSFile } from '../../../global/models/grid-fs-file';

@Component({
  selector: 'article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {
  
  @Input()
  public form: FormGroup;
  public blockAttachments$: Observable<boolean>;
  public sourceNames$: Observable<string[]>;
  public editMode: boolean;
  public uploadProgress: number;
  public files: File[];
  public blockAttachments: boolean;

  private boardId: string;
  private editArticleId: string;
  private articleToEdit: Article;

  constructor(
    public location: Location,
    private store: Store<ThreatFeatureState>,
    private threatService: ThreatDashboardBetaService,
    private genericApi: GenericApi,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.boardId = this.route.snapshot.parent.params.boardId;
    this.editMode = this.route.snapshot.url[1] && this.route.snapshot.url[1].path === 'edit' || false;
    
    if (this.editMode) {
      this.editArticleId = this.route.snapshot.params.articleId;
      this.store.select('threat')
        .pipe(
          take(1)
        )
        .subscribe((threatState) => {
          const found = threatState.articles.length && threatState.articles.find((art) => art.id === this.editArticleId);
          if (found) {
            this.articleToEdit = found;
            this.setEditValues();
          } else {
            this.store.dispatch(new utilityActions.NavigateToErrorPage(404));
          }                    
        });
    }

    this.blockAttachments$ = this.store
      .select('config')
      .pipe(
        pluck('runConfig'),
        distinctUntilChanged<MasterConfig>(),
        map((cfg) => cfg.blockAttachments)
      );
    
    this.sourceNames$ = this.form.get('sources').valueChanges
      .pipe(
        startWith(this.form.get('sources').value),
        withLatestFrom(this.store.select('threat').pipe(pluck('attachedReports'))),
        map(([sourceIds, reports]: [string[], Report[]]) => {
          return sourceIds.map((sourceId) => {
            const foundReport = reports.find((report) => report.id === sourceId);
            if (foundReport) {
              return foundReport.name;
            } else {
              return 'Unknown';
            }
          });
        })
      );

    this.store
      .select('config')
      .pipe(
        pluck('runCofig'),
        distinctUntilChanged(),
      )
      .subscribe(
        (cfg: MasterConfig) => {
          this.blockAttachments = cfg.blockAttachments;
        }
      );
  }

  public removeSource(index: number): void {
    const sourcesVal: any[] = this.form.get('sources').value;
    sourcesVal.splice(index, 1);
    this.form.get('sources').patchValue(sourcesVal);
  }

  private setEditValues(): void {
    if (this.articleToEdit.name) {
      this.form.get('name').patchValue(this.articleToEdit.name);
    }
    if (this.articleToEdit.content) {      
      this.form.get('content').patchValue(this.articleToEdit.content);
    }
    if (this.articleToEdit.sources && this.articleToEdit.sources.length) {      
      this.form.get('sources').patchValue(this.articleToEdit.sources);
    }
    // TODO handle attachments
  }

  public async submitArticle(): Promise<void> {
    const submitErrorMsg = '';
    const tempArticle = new Article(cleanObjectProperties({}, this.form.value));

    const [uploadError, filesToUpload] = await this.uploadFiles();
    if (uploadError) {
      this.store.dispatch(new utilityActions.OpenSnackbar('Unable to upload attachments'));
    } else if (filesToUpload && filesToUpload.length) {
      if (!tempArticle.metaProperties) {
        (tempArticle.metaProperties as any) = {};
      }
      if (this.editMode && this.articleToEdit.metaProperties && this.articleToEdit.metaProperties.attachments && this.articleToEdit.metaProperties.attachments.length) {
        const attachmentsToKeep = this.articleToEdit.metaProperties.attachments
          .filter((att) => {
            return this.files
              .filter((file) => (file as any)._id)
              .find((file) => (file as any)._id === att._id)
          });
        tempArticle.metaProperties.attachments = attachmentsToKeep.concat(filesToUpload);
      } else {
        tempArticle.metaProperties.attachments = filesToUpload;
      }
    } else if (this.editMode && this.articleToEdit.metaProperties && this.articleToEdit.metaProperties.attachments) {
      if (!tempArticle.metaProperties) {
        (tempArticle.metaProperties as any) = {};
      }
      const attachmentsToKeep = this.articleToEdit.metaProperties.attachments
        .filter((att) => {
          return this.files
            .filter((file) => (file as any)._id)
            .find((file) => (file as any)._id === att._id)
        });
      tempArticle.metaProperties.attachments = attachmentsToKeep;
    }

    let success;
    if (this.editMode) {
      if (!this.form.get('sources').value.length) {
        tempArticle.sources = [];
      }
      success = await this.editArticle(tempArticle);
    } else {
      success = await this.createNewArticle(tempArticle);
      if (success) {
        this.router.navigate(['/threat-beta', this.boardId, 'feed']);
        return;
      }
    }

    if (!success) {
      this.store.dispatch(new utilityActions.OpenSnackbar('An Error Occured While Saving'));
    }
  }

  private uploadFiles(): Promise<[any, GridFSFile[]]> {
    this.uploadProgress = 0;
    return new Promise((resolve) => {
      if (this.blockAttachments) {
        console.log('Attachments are blocked');
        resolve([null, null]);
        return;
      }
      const newFiles = this.files && this.files.length ? this.files.filter((file) => !(file as any).existingFile) : [];
      if (newFiles.length) {
        const uploadFile$ = this.genericApi.uploadAttachments(newFiles, (prog) => this.uploadProgress = prog)
          .pipe(
            finalize(() => this.uploadProgress = 0 || uploadFile$ && uploadFile$.unsubscribe())
          )
          .subscribe(
            (response) => {
              resolve([null, response]);
            },
            (err) => {
              resolve([err, null]);
            }
          );
      } else {
        resolve([null, null]);
      }
    });
  }

  private async createNewArticle(tempArticle: Article): Promise<boolean> {
    return new Promise((resolve: (boolean) => void, reject: (boolean) => void) => {
      const addArticle$ = this.store.select(getSelectedBoard)
        .pipe(
          take(1),
          switchMap((board) => {
            // Add article
            // TODO handle edge case - article doesnt have created_by_ref
            tempArticle.created_by_ref = board.created_by_ref;
            return observableForkJoin(
              this.threatService.addArticle(tempArticle),
              observableOf(board)
            );
          }),
          switchMap(([newArticle, board]) => {
            // Add article reference to board
            if (!board.articles) {
              board.articles = [];
            }
            board.articles.push(newArticle.id);
            return observableForkJoin(
              observableOf(newArticle),
              this.threatService.updateBoard(board),
            );
          }),      
          finalize(() => addArticle$ && addArticle$.unsubscribe())
        )
        .subscribe(
          ([newArticle, updatedBoard]) => {
            this.store.dispatch(new threatActions.UpdateBoard(updatedBoard));
            this.store.dispatch(new threatActions.AddArticle(newArticle));
            this.store.dispatch(new utilityActions.OpenSnackbar('Article Successfully Added'));
            resolve(true);
          },
          (err) => {
            console.log(err);
            reject(false);
          }
        );
    });    
  }

  private async editArticle(tempArticle: Article): Promise<boolean> {
    return new Promise((resolve: (boolean) => void, reject: (boolean) => void) => {
      tempArticle.id = this.articleToEdit.id;
      const editArticle$ = this.threatService.editArticle(tempArticle)
        .pipe(finalize(() => editArticle$ && editArticle$.unsubscribe()))
        .subscribe(
          (updatedArticle) => {
            this.store.dispatch(new threatActions.UpdateArticle(updatedArticle));
            this.store.dispatch(new utilityActions.OpenSnackbar('Article Successfully Updated'));
            resolve(true);
          },
          (err) => {
            console.log(err);
            reject(false);
          }
        );
    });
  }
}
