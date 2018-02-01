import { generateGuid } from './generate-guid';
import { GenerateDownloads } from './generate-downloads';

export function generateBundle(objects: any[]) {
    return {
        type: 'bundle',
        id: `bundle--${generateGuid()}`,
        spec_version: '2.0',
        objects
    }
}

export function downloadBundle(objects: any[], name: string) {
    GenerateDownloads.json(generateBundle(objects), name);
}
