import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description Converts a number of bytes into a human readable string.
 *  It will round to the neared KB, MB, GB, or TB if > 1024 bytes
 */
@Pipe({ name: 'readableBytes' })
export class ReadableBytesPipe implements PipeTransform {

    public transform(bytes: number): string {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        if (i === 0) {
            return `${bytes} ${sizes[i]}`
        };
        return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
    }
}
