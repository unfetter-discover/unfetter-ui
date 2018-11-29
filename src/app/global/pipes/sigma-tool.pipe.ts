import { Pipe, PipeTransform } from '@angular/core';

import { SigmaSupportedBackends } from '../models/sigma-translation';

/**
 * @description 
 */
@Pipe({ name: 'sigmaTool' })
export class SigmaToolPipe implements PipeTransform {

    public transform(tool: SigmaSupportedBackends): string {
        switch (tool) {
            case SigmaSupportedBackends.ELASTIC_QUERY_STRING:
                return 'Elasticsearch Query String';
            case SigmaSupportedBackends.SPLUNK:
                return 'Splunk';
            case SigmaSupportedBackends.QRADAR:
                return 'QRadar';            
            default: 
                return tool;
        }
    }
}
