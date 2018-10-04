import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin as observableForkJoin, of as observableOf } from 'rxjs';
import { pluck, distinctUntilChanged, map, startWith, finalize, take, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Article } from 'stix/unfetter/index';

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
      // TODO populate form
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
        map((sourceIds: string[]) => {
          // TODO get real source names
          return sourceIds
            .map((sourceId) => 'A placeholder name');
        })
      );

    this.store
      .select('config')
      .pipe(
        pluck('runConfig'),
        distinctUntilChanged(),
      )
      .subscribe(
        (cfg: MasterConfig) => {
          this.blockAttachments = cfg.blockAttachments;
        }
      );
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
      tempArticle.metaProperties.attachments = filesToUpload;
    }

    let success;
    if (this.editMode) {
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
    // TODO
    return new Promise((resolve: (boolean) => void, reject: (boolean) => void) => {

    });
  }
}
