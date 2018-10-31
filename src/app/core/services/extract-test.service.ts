import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GenericApi } from './genericapi.service';
import { ExtractTextSupportedFileTypes } from '../../global/enums/extract-text-file-types.enum';
import { Constance } from '../../utils/constance';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';

@Injectable()
export class ExtractTextService {
    constructor(
        private genericApi: GenericApi,
        private http: HttpClient
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
}
