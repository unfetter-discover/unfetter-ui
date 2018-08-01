import { HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { ExternalDataTranslationResponse } from '../models/adapter/external-data-translation-response';
import { UrlTranslationRequest } from '../models/adapter/url-translation-request';
import { WrappedStix } from '../models/adapter/wrapped-stix';
import { ReportTranslationService } from './report-translation.service';

describe('Report Translation Spec', () => {

  let subscriptions: Subscription[];
  beforeEach(() => {
    subscriptions = [];
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ReportTranslationService]
    });
  });

  afterEach(() => {
    if (subscriptions) {
      subscriptions
        .forEach((sub) => sub.unsubscribe());
    }
  });

  it('should be created', inject([ReportTranslationService], (service) => {
    expect(service).toBeTruthy();
  }));

  it('should map data', fakeAsync(inject([ReportTranslationService], (service: ReportTranslationService) => {
    expect(service).toBeDefined();

    const response = { data: { a: 1 } };
    const stream$ = of(response);
    stream$.pipe(
      service.mapData(),
      tap((resp) => {
        expect(resp).toBeDefined();
        expect(resp.a).toBeDefined();
        expect(resp.a).toEqual(1);
      })
    );
  })));

  it('should map payload', fakeAsync(inject([ReportTranslationService], (service: ReportTranslationService) => {
    expect(service).toBeDefined();

    const response = { payload: { a: 1 } };
    const stream$ = of(response);
    stream$.pipe(
      service.mapPayload(),
      tap((resp) => {
        expect(resp).toBeDefined();
        expect(resp.payload).toBeUndefined();
        expect(resp.a).toBeDefined();
        expect(resp.a).toEqual(1);
      })
    );
  })));

  it('should ensure headers', fakeAsync(inject([ReportTranslationService], (service: ReportTranslationService) => {
    expect(service).toBeDefined();
    const headers = service.ensureAuthHeaders(new HttpHeaders());
    expect(headers).toBeDefined();
    expect(headers.get('Authorization')).toBeDefined();
  })));

  it('should verify and parse dtgs', fakeAsync(inject([ReportTranslationService], (service: ReportTranslationService) => {
    expect(service).toBeDefined();
    const response = new ExternalDataTranslationResponse();
    const wrappedStix = new WrappedStix();
    const dtg = '2017-12-01';
    wrappedStix.stix.created = dtg;
    wrappedStix.stix.modified = dtg;
    wrappedStix.stix.published = new Date();
    response.translated.payload = wrappedStix;
    response.translated.success = true;
    const stream$ = of(response);
    let testCount = 0;
    const sub$ = stream$
      .pipe(
        service.verifyAndParseDtgs(),
        tap((resp) => {
          testCount = testCount + 1;
          expect(resp).toBeDefined();
          expect(resp.translated).toBeDefined();
          const translated = resp.translated;
          expect(translated.payload).toBeDefined();
          expect(translated.success).toBeTruthy();
          const stix = translated.payload.stix;
          expect(stix).toBeDefined();
          const expectedISO = '2017-12-01T00:00:00.000Z';
          expect(stix.created).toEqual(expectedISO);
          expect(stix.modified).toEqual(expectedISO);
          expect(stix.published).toBeDefined();
        })
      )
      .subscribe(
        () => { },
        (err) => console.log(err)
      );
    subscriptions.push(sub$);
    expect(testCount).toBeGreaterThanOrEqual(1);
  })));

  it('should verify granular marking selectors', fakeAsync(inject([ReportTranslationService], (service: ReportTranslationService) => {
    expect(service).toBeDefined();
    const response = new ExternalDataTranslationResponse();
    const wrappedStix = new WrappedStix();
    wrappedStix.stix.granular_markings = [
      {
        'marking_ref': '123',
      }
    ];
    response.translated.payload = wrappedStix;
    response.translated.success = true;
    const stream$ = of(response);
    let testCount = 0;
    const sub$ = stream$
      .pipe(
        service.verifyGranularMarking(),
        tap((resp) => {
          testCount = testCount + 1;
          expect(resp).toBeDefined();
          expect(resp.translated).toBeDefined();
          const translated = resp.translated;
          expect(translated.payload).toBeDefined();
          expect(translated.success).toBeTruthy();
          const stix = translated.payload.stix;
          expect(stix).toBeDefined();
          expect(stix.granular_markings).toBeDefined();
          expect(stix.granular_markings.length).toEqual(1);
          stix.granular_markings.forEach((marking) => {
            expect(marking).toBeDefined();
            expect(marking.marking_ref).toBeDefined();
            expect(marking.selectors).toBeDefined();
            expect(marking.selectors.length).toBeGreaterThanOrEqual(1);
            expect(marking.selectors).toContain('name');
            expect(marking.selectors).toContain('description');
          })
        })
      )
      .subscribe(
        () => { },
        (err) => console.log(err)
      );
    subscriptions.push(sub$);
    expect(testCount).toBeGreaterThanOrEqual(1);
  })));

  it('should verify source name', fakeAsync(inject([ReportTranslationService], (service: ReportTranslationService) => {
    expect(service).toBeDefined();
    const response = new ExternalDataTranslationResponse();
    const wrappedStix = new WrappedStix();
    wrappedStix.stix.external_references = [
      {
        'description': 'Poison Ivy remote access tool',
        'url': 'https://www.fireeye.com/content/dam/fireeye-www/global/en/current-threats/pdfs/rpt-poison-ivy.pdf',
        'external_id': 'https://www.fireeye.com/content/dam/fireeye-www/global/en/current-threats/pdfs/rpt-poison-ivy.pdf'
      }
    ];
    response.translated.payload = wrappedStix;
    response.translated.success = true;
    const stream$ = of(response);
    let testCount = 0;
    const sub$ = stream$
      .pipe(
        service.verifySourceName(),
        tap((resp) => {
          testCount = testCount + 1;
          expect(resp).toBeDefined();
          expect(resp.translated).toBeDefined();
          const translated = resp.translated;
          expect(translated.payload).toBeDefined();
          expect(translated.success).toBeTruthy();
          const stix = translated.payload.stix;
          expect(stix).toBeDefined();
          expect(stix.external_references).toBeDefined();
          expect(stix.external_references.length).toEqual(1);
          stix.external_references.forEach((ref) => {
            expect(ref).toBeDefined();
            expect(ref.source_name).toBeDefined();
          })
        })
      )
      .subscribe(
        () => { },
        (err) => console.log(err)
      );
    subscriptions.push(sub$);
    expect(testCount).toBeGreaterThanOrEqual(1);
  })));

  it('should handle empty url on translate url requests', fakeAsync(inject([ReportTranslationService], (service: ReportTranslationService) => {
    expect(service).toBeDefined();
    const req = new UrlTranslationRequest();
    req.url = undefined;
    const o$ = service.translateUrl(req);
    expect(o$).toBeDefined();
    const sub$ = o$
      .pipe(take(1))
      .subscribe(
        () => {
          // should have been empty, so fail
          fail();
        },
        (err) => console.error(err),
        () => {
        });
    subscriptions.push(sub$);
  })));

});
