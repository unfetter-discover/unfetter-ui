import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { GenericApi } from '../../global/services/genericapi.service';
import { Constance } from '../../utils/constance';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

    @ViewChild('fileUpload')
    public fileUploadEl: ElementRef;

    private readonly subscriptions = [];

  constructor(protected router: Router,
              protected genericApi: GenericApi) { }

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
    this.fileUploadEl.nativeElement.click((arg) => {
      console.log('file selected', arg);
      console.log(this.fileUploadEl.nativeElement);
    });

    console.log(this.fileUploadEl.nativeElement.value);
  }

  /**
   * @description returns the currently selected file for upload
   * @return {string} a file name
   */
  public value(): string {
    return this.fileUploadEl.nativeElement.value;
  }

}
