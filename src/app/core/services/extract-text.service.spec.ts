import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { empty } from 'rxjs';

import { ExtractTextService } from './extract-text.service';
import { ExtractTextSupportedFileTypes } from '../../global/enums/extract-text-file-types.enum';
import { GenericApi } from './genericapi.service';

describe('ExtractTextService', () => {
 
    let service: ExtractTextService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                ExtractTextService,
                GenericApi,
            ],
        });
    });

    // synchronous beforeEach
    beforeEach(() => {
        service = TestBed.get(ExtractTextService);
    });

    it('should upload from URL', inject([GenericApi], (api: GenericApi) => {
        const spy = spyOn(api, 'post').and.returnValue(empty());
        service.extractTextFromUrl('npmjs.org');
        expect(spy).toHaveBeenCalled();
    }));

    it('should upload from file', inject([GenericApi], (api: GenericApi) => {
        const spy = spyOn(api, 'uploadFile').and.returnValue(empty());
        service.extractTextFromFile(new File(['.'], 'extract-text.service.ts'));
        expect(spy).toHaveBeenCalled();
    }));

});
