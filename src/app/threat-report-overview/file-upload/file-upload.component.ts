import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { GenericApi } from '../../global/services/genericapi.service';
import { Constance } from '../../utils/constance';
import { UploadService } from './upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

    @ViewChild('fileUpload')
    public fileUploadEl: ElementRef;

    @Output('fileParsedEvent')
    public fileParsedEvent = new EventEmitter<any[]>();

    public fName = '';
    public numEventsParsed = -1;
    public loading = false;
    private readonly subscriptions = [];

  constructor(protected router: Router,
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
    // event.srcElement.files
    const files: FileList = this.fileUploadEl.nativeElement.files;
    console.log(`files: `, files);
    if (!event || !files || files.length < 1) {
      console.log('no files to upload, moving on...');
      return;
    }

    const file = files[0];
    this.fName = file.name;
    this.loading = true;
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
        console.log('File is completely uploaded!');
        this.numEventsParsed = (resp as any).length || -1;
        this.fileParsedEvent.emit(resp as any);
        // }
      },
      (err) => console.log(err),
      () => this.loading = false);
    this.subscriptions.push(s$);
  }

  /**
   * @description event handler to remove an uploaded file
   */
  public onRemoveFile(event: UIEvent): void {
    this.fName = '';
    this.numEventsParsed = -1;
    this.fileParsedEvent.emit([]);
  }
}