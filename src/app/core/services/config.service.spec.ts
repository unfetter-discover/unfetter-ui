import { TestBed, async, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from './config.service';
import { reducers } from '../../root-store/app.reducers';
import * as fromConfig from '../../root-store/config/config.reducers';
import * as configActions from '../../root-store/config/config.actions';
import { GenericApi } from './genericapi.service';

describe('ConfigService', () => {

    let service: ConfigService;

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(reducers),
                HttpClientTestingModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [ConfigService, GenericApi]
        });
    }));

    // synchronous beforeEach
    beforeEach(() => {
        service = TestBed.get(ConfigService);
    });

    it('initializes with new configuration', () => {
        service.configSet = false;
        service.configurations = {};
        service['store'].dispatch(new configActions.AddConfig({
            'key1': 'value1',
            'key2': 'value2',
            'key3': 'value3',
            'key4': 'value4',
        }));
        const spy = spyOn(console, 'log');
        service.initConfig();
        expect(service.configSet).toBeTruthy();
        expect(Object.keys(service.configurations).length).toBe(4);
        expect(service.configurations.key1).toEqual('value1');
    });

    it('initializes but with already has configuration', () => {
        service.configSet = true;
        service.configurations = {
            'keya': 'valuea',
        };
        service['store'].dispatch(new configActions.AddConfig({
            'keyb': 'valueb',
            'keyc': 'valuec',
            'keyd': 'valued',
        }));
        service.initConfig();
        expect(service.configSet).toBeTruthy();
        expect(Object.keys(service.configurations).length).toBe(1);
        expect(service.configurations.keya).toEqual('valuea');
        expect(service.configurations.keyb).toBeUndefined();
    });

    it('gets remote configuration', inject([GenericApi], (api: GenericApi) => {
        spyOn(api, 'get').and.returnValue(Observable.of({
            'keyx': 'valuex',
        }));
        service.getConfig().subscribe(cfg => {
            expect(cfg).toBeDefined();
            expect(cfg['keyx']).toEqual('valuex');
        });
    }));

    it('gets remote public configuration', inject([GenericApi], (api: GenericApi) => {
        spyOn(api, 'get').and.returnValue(Observable.of({
            'keyz': 'valuez',
        }));
        service.getPublicConfig().subscribe(cfg => {
            expect(cfg).toBeDefined();
            expect(cfg['keyz']).toEqual('valuez');
        });
    }));

});
