import { GenerateDownloads } from './generate-downloads';
import { generateUUID } from './generate-uuid';

export function generateBundle(objects: any[]) {
    return {
        type: 'bundle',
        id: `bundle--${generateUUID()}`,
        spec_version: '2.0',
        objects
    }
}

export function downloadBundle(objects: any[], name: string) {
    GenerateDownloads.json(generateBundle(objects), name);
}
