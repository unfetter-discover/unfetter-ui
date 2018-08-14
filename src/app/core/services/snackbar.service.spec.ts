import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material';

import { SnackBarService } from './snackbar.service';

describe('SnackBarService should', () => {

    let service: SnackBarService;

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatSnackBarModule,
                NoopAnimationsModule,
            ],
            providers: [
                SnackBarService,
            ]
        });
    }));

    // synchronous beforeEach
    beforeEach(() => {
        service = TestBed.get(SnackBarService);
    });

    it('raise the bar', () => {
        service.openSnackbar('This is a test message.', ['test'], 2);
    });

});
