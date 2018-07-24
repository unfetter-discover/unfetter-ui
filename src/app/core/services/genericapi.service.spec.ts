import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GenericApi } from './genericapi.service';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { StixLabelEnum } from '../../models/stix/stix-label.enum';
import { AttackPattern } from 'stix';
import { StixUrls } from '../../global/enums/stix-urls.enum';
import { StixApiOptions } from '../../global/models/stix-api-options';
import { Constance } from '../../utils/constance';
import { HttpEventType } from '../../../../node_modules/@angular/common/http';
import { GridFSFile } from '../../global/models/grid-fs-file';

describe('GenericApi service', () => {
    let httpMock: HttpTestingController;
    let api: GenericApi;

    interface WhatsIt {
        animal?: any,
        vegetable?: any,
        mineral?: any,
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GenericApi],
        });
        api = TestBed.get(GenericApi);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should GET', () => {
        api.get('/testdata', 'nao').subscribe((response) => {
            expect(response).toBeDefined();
            expect(response.success).toBeUndefined();
            expect(response.length).toBe(2);
            expect(response[0]['key1']).toEqual('value1');
            expect(response[1]['key2']).toEqual('value2');
        });
        const req = httpMock.expectOne(`/testdata/nao`);
        expect(req.request.method).toBe('GET');
        req.flush({
            success: true,
            data: [
                {'key1': 'value1'},
                {'key2': 'value2'},
            ]
        });
    });

    it('should GET as a type', () => {
        api.getAs<JsonApiData<WhatsIt>>('/isit', 'animal').subscribe((response) => {
            expect(response).toBeDefined();
            expect(response.type).toEqual('animal');
            expect(response.attributes['animal']).toEqual('pangolin');
        });
        const req = httpMock.expectOne(`/isit/animal`);
        expect(req.request.method).toBe('GET');
        req.flush({
            data: {
                type: 'animal',
                attributes: {'animal': 'pangolin'}
            },
        });
    });    

    it('should POST', () => {
        api.post('/testdork', {'when': 'nao'}).subscribe((response) => {
            expect(response).toEqual('never');
        });
        const req = httpMock.expectOne(`/testdork`);
        expect(req.request.method).toBe('POST');
        req.flush({
            success: false,
            data: 'never'
        });
    });

    it('should POST as a type', () => {
        const kumquat = {
            'common-name': 'kumquat',
            'scientific-name' : 'fortunella',
        }
        api.postAs<JsonApiData<WhatsIt>>('/guess', kumquat).subscribe((response) => {
            expect(response).toBeDefined();
            expect(response['vegetable']).toBe(kumquat);
        });
        const req = httpMock.expectOne(`/guess`);
        expect(req.request.method).toBe('POST');
        req.flush({ data: {vegetable: kumquat} });
    });

    it('should PATCH', () => {
        api.patch('/testderp', {'question': 'why'}).subscribe((response) => {
            expect(response).toBeDefined();
            expect(response.answer).toEqual('because');
        });
        const req = httpMock.expectOne(`/testderp`);
        expect(req.request.method).toBe('PATCH');
        req.flush({
            success: false,
            data: { answer: 'because' }
        });
    });

    it('should PATCH as a type', () => {
        const fluorite = {
            hardness: 4,
            luster: 'vitreous'
        };
        api.patchAs<JsonApiData<WhatsIt>>('/minerals/fluorite', {'hardness': 4}).subscribe((response) => {
            expect(response).toBeDefined();
            expect(response['mineral']['luster']).toEqual('vitreous');
        });
        const req = httpMock.expectOne(`/minerals/fluorite`);
        expect(req.request.method).toBe('PATCH');
        req.flush({ data: {mineral: fluorite} });
    });

    it('should DELETE', () => {
        api.delete('/marbles', 'all').subscribe((response) => {
            expect(response).toBeDefined();
            expect(response.marbles).toBeDefined();
            expect(response.marbles.length).toBe(0);
        });
        const req = httpMock.expectOne(`/marbles/all`);
        expect(req.request.method).toBe('DELETE');
        req.flush({
            data: { marbles: [] }
        });
    });

    it('should get latest by type', () => {
        api.getLatestByType(StixLabelEnum.IDENTITY).subscribe(ids => {
            expect(ids).toBeDefined();
            expect(ids.length).toEqual(3);
            expect(ids[0].id).toEqual('THX-1138');
        });
        const req = httpMock.expectOne(`/latest/type/${StixLabelEnum.IDENTITY}`);
        expect(req.request.method).toBe('GET');
        req.flush({
            data: [
                {id: 'THX-1138', name: 'Robert Duvall', type: 'drama', modified: '1971'},
                {id: 'R2D2', name: 'Kenny Baker', type: 'sci-fi', modified: '1977'},
                {id: 'V', name: 'Hugo Weaving', type: 'thriller', modified: '2005'},
            ]
        });
    });

    it('should get latest by type for a creator', () => {
        api.getLatestByTypeAndCreatorId(StixLabelEnum.SENSOR, 'RFC').subscribe(ids => {
            expect(ids).toBeDefined();
            expect(ids.length).toEqual(2);
            expect(ids[1].modified).toEqual('1988');
        });
        const req = httpMock.expectOne(`/latest/type/${StixLabelEnum.SENSOR}/creator/RFC`);
        expect(req.request.method).toBe('GET');
        req.flush({
            data: [
                {
                    id: 'SMTP',
                    type: 'mail',
                    name: 'Simple Mail Transfer Protocol',
                    modified: '1982',
                    created_by_ref: 'RFC 821'
                },
                {
                    id: 'POP3',
                    type: 'mail',
                    name: 'Post Office Protocol',
                    modified: '1988',
                    created_by_ref: 'RFC 1081'
                },
            ]
        });
    });

    describe('getStix', () => {

        it('should GET attack patterns, and unwrap JSON api', () => {
            const mockAttackPatterns = [
                {
                    type: 'attack-pattern',
                    id: 'attack-pattern--1234',
                    attributes: {
                        type: 'attack-pattern',
                        id: 'attack-pattern--1234',
                        name: 'bob'
                    }
                },
                {
                    type: 'attack-pattern',
                    id: 'attack-pattern--5678',
                    attributes: {
                        type: 'attack-pattern',
                        id: 'attack-pattern--5678',
                        name: 'jim'
                    }
                },
            ];
            api.getStix<AttackPattern[]>(StixUrls.ATTACK_PATTERN).subscribe((response) => {
                expect(response).toBeDefined();
                expect(response[0].name).toBe('bob');
                expect(response[1].name).toBe('jim');
                expect((response[0] as any).attributes).toBeUndefined();
                expect((response[1] as any).attributes).toBeUndefined();
            });
            const req = httpMock.expectOne(StixUrls.ATTACK_PATTERN);
            expect(req.request.method).toBe('GET');
            req.flush({
                data: mockAttackPatterns
            });
        });

        it('should GET an attack pattern by ID, and unwrap JSON api', () => {
            const mockAttackPattern = {
                type: 'attack-pattern',
                id: 'attack-pattern--1234',
                attributes: {
                    type: 'attack-pattern',
                    id: 'attack-pattern--1234',
                    name: 'bob'
                }
            };
            api.getStix<AttackPattern>(StixUrls.ATTACK_PATTERN, 'attack-pattern--1234').subscribe((response) => {
                expect(response).toBeDefined();
                expect(response.name).toBe('bob');
                expect((response as any).attributes).toBeUndefined();
            });
            const req = httpMock.expectOne(`${StixUrls.ATTACK_PATTERN}/attack-pattern--1234`);
            expect(req.request.method).toBe('GET');            
            req.flush({
                data: mockAttackPattern
            });
        });

        it('should place options on parameters', () => {
            const options: StixApiOptions = {
                filter: { 'stix.name': 'bob' },
                skip: 1,
                limit: 3
            };
            api.getStix<AttackPattern>(StixUrls.ATTACK_PATTERN, null, options).subscribe();
            const req = httpMock.expectOne(`${StixUrls.ATTACK_PATTERN}?filter=${encodeURI(JSON.stringify(options.filter))}&skip=1&limit=3&`);
            expect(req.request.method).toBe('GET');
        });

    });

    describe('uploadAttachments', () => {
        const mockFilelist: any = {
            0: {
                name: 'foo'
            },
            1: {
                name: 'bar'
            }
        };

        it('should update progress', (done) => {
            let count = 0;
            const mockGridFS: GridFSFile = {
                _id: '123',
                filename: 'foo.txt',
                contentType: 'application/foo',
                length: 4567,
                chunkSize: 123,
                uploadDate: '2018-07-17T17:48:18.057Z'
            };
            api.uploadAttachments(mockFilelist, () => count++)
                .subscribe(
                    (res) => {
                        expect(count).toBe(3);
                        expect(res).toEqual([mockGridFS]);
                        done();
                    }
                );
            const req = httpMock.expectOne(`${Constance.UPLOAD_URL}/files`);
            expect(req.request.method).toBe('POST');
            req.event({ loaded: 2, total: 10, type: HttpEventType.UploadProgress } as any);
            req.event({ loaded: 5, total: 10, type: HttpEventType.UploadProgress } as any);
            req.event({ loaded: 10, total: 10, type: HttpEventType.UploadProgress } as any);
            req.flush({ data: [{ attributes: mockGridFS }] });
        });

    });

});
