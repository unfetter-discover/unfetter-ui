import { Component, ViewChild, ElementRef, Output, EventEmitter, Input, OnInit } from '@angular/core';

import { GridFSFile } from '../../models/grid-fs-file';

@Component({
  selector: 'file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  @Input() public existingFiles: GridFSFile[];

  @Output() public filesChange: EventEmitter<File[]> = new EventEmitter();

  @ViewChild('fileInput') public fileInput: ElementRef;

  public readonly TABLE_HEADERS = [ 'File' ];
  public files: File[] = [];

  ngOnInit() {
    if (this.existingFiles) {
      this.files = this.files.concat(
        this.existingFiles.map((file: GridFSFile) => { 
          const newObj = new File([''], file.filename);
          (newObj as any ).existingFile = true;
          (newObj as any )._id = file._id;
          return newObj;
        })
      );
      this.filesChange.emit(this.files);
    }
  }


  fileInputChange(event) {
    if (event.target.files) {
      const fileList: FileList = event.target.files;
      this.files = this.files.concat(Object.values(fileList));
    }
    this.filesChange.emit(this.files);
  }

  selectFiles() {
    this.fileInput.nativeElement.click();
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
    this.filesChange.emit(this.files);
  }
}
