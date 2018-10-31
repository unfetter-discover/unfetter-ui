import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest } from '@angular/common/http';

import { GenericApi } from './genericapi.service';
import { ExtractTextSupportedFileTypes } from '../../global/enums/extract-text-file-types.enum';
import { Constance } from '../../utils/constance';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';

// TODO interfaces

@Injectable()
export class ExtractTextService {
    constructor(
        private genericApi: GenericApi
    ) { }

    public extractTextFromUrl(urlToExtractFrom: string, fileType: ExtractTextSupportedFileTypes = ExtractTextSupportedFileTypes.PDF): Observable<any> {
        const url = `${Constance.UPLOAD_URL}/extract-text-from-url/${fileType}`;
        const data = {
            data: {
                attributes: {
                    url: urlToExtractFrom
                }
            }
        };
        return this.genericApi.post(url, data)
            .pipe(
                RxjsHelpers.unwrapJsonApi()
            );
    }

    public extractTextFromFile(file: File, fileType?: ExtractTextSupportedFileTypes, progressCallback?: (number) => void): Observable<any> {
        if (!fileType) {
            fileType = ExtractTextSupportedFileTypes.PDF;
        } 
        const formData: FormData = new FormData();
        formData.append('document', file);
        const req = new HttpRequest('POST', `${Constance.UPLOAD_URL}/extract-text-from-file/${fileType}`, formData, {
            reportProgress: true
        });
        return this.genericApi.uploadFile(req, progressCallback);
    }
}
