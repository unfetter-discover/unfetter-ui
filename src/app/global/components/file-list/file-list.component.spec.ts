import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListComponent } from './file-list.component';
import { GridFSFile } from '../../models/grid-fs-file';

describe('FileListComponent', () => {
  let component: FileListComponent;
  let fixture: ComponentFixture<FileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list existing files', () => {
    component.existingFiles = [
      {
        _id: 'file--1234',
        length: 2048,
        chunkSize: 512,
        uploadDate: '2018-01-01T19:20:21.022Z',
        filename: 'endofworld.pdf',
        contentType: 'application/pdf'
      }
    ];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
