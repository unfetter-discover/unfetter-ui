import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { GenericApi } from '../../global/services/genericapi.service';
import { Constance } from '../../utils/constance';
import { UploadService } from './upload.service';

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
    console.log(event);
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
  public fileChanged(event: UIEvent): void {
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
    const s$ = this.uploadService.post(file)
      .subscribe((resp) => {
        console.log('upload service response ', resp);
        this.fileParsedEvent.emit(resp);
      });
    this.subscriptions.push(s$);
  }
}
