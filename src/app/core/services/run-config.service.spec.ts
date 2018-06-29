import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RunConfigService } from './run-config.service';

describe('RunConfigService should', () => {

    let service: RunConfigService;
    let httpMock: HttpTestingController;
    const time = new Date().getTime();

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                RunConfigService,
            ]
        });
    }));

    // synchronous beforeEach
    beforeEach(() => {
        service = TestBed.get(RunConfigService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('return the configuration', () => {
        service.config
            .subscribe(
                cfg => {
                    expect(cfg).not.toBeNull();
                    expect(cfg.lastModified).toBe(time);
                }
            );
        const req = httpMock.expectOne('./assets/config/local-settings.json');
        expect(req.request.method).toBe('GET');
        req.flush({ lastModified: time });
    });

});
