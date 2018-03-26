import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter, Output, ChangeDetectionStrategy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Constance } from '../../../utils/constance';
import { UploadService } from './upload.service';

@Component({
  selector: 'unf-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FileUploadComponent implements OnInit {

  @ViewChild('fileUpload')
  public fileUploadEl: ElementRef;

  @Output('fileParsedEvent')
  public fileParsedEvent = new EventEmitter<any[]>();

  @Output('fileUploadFailed')
  public fileUploadFailed = new EventEmitter<string>();

  public success = false;
  public fName = '';
  public numEventsParsed = -1;
  public loading = false;
  private readonly subscriptions = [];

  constructor(
    private renderer: Renderer2,
    protected router: Router,
    protected uploadService: UploadService) { }

  /**
   * @description
   * @returns {void}
   */
  public ngOnInit(): void { }

  /**
   * @description opens the file upload dialog
   */
  public openFileUpload(event: UIEvent): void {
    this.fileUploadEl.nativeElement.click();
  }

  /**
   * @description returns the currently selected file for upload
   * @return {string} a file name
   */
  public value(): string {
    return this.fileUploadEl.nativeElement.value;
  }

  /**
   * @description upload a file
   * @param event {UIEvent}
   */
  public fileChanged(event?: UIEvent): void {
    console.log(event);
    const files: FileList = this.fileUploadEl.nativeElement.files;
    console.log(`files: `, files);
    if (!event || !files || files.length < 1) {
      console.log('no files to upload, moving on...');
      return;
    }

    const file = files[0];
    this.numEventsParsed = 0;
    // this.fName = file.name;
    this.loading = true;
    this.success = false;
    const s$ = this.uploadService.post(file)
      .subscribe((resp: any) => {
        console.log('upload service response ', resp);
        // uploadProgress
        // if (resp.type === HttpEventType.UploadProgress) {
        //   const progress = resp as HttpEventType.UploadProgress;
        //   // This is an upload progress event. Compute and show the % done:
        //   const percentDone = Math.round(100 * progress.loaded / progress.total);
        //   this.uploadProgress = percentDone;
        //   console.log(`File is ${percentDone}% uploaded.`);
        // }
        // if (resp instanceof HttpResponse) {
        if (resp && resp.length > 0) {
          const el = resp[0];
          if (el && el.error) {
            console.log('file upload error', el.error);
            this.setErrorState(el.error);
            return;
          } else {
            requestAnimationFrame(() => {
              this.numEventsParsed = (resp as any).length || -1;
              this.loading = false;
              this.success = true;
              this.fileParsedEvent.emit(resp as any);
              setTimeout(() => {
                this.success = false;
                this.numEventsParsed = 0;
                this.loading = false;
              }, 3400);
            });
          }
        }

      },
      (err) => {
        this.setErrorState(err);
      },
      () => {
        this.loading = false;
      });
    this.subscriptions.push(s$);
  }

  public setErrorState(err: string): void {
    console.log(err);
    this.fName = undefined;
    this.success = false;
    this.loading = false;
    this.fileUploadFailed.emit(err);
  }

}
