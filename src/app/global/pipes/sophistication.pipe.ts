import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sophistication' })
export class SophisticationPipe implements PipeTransform {

    public transform(value: any) {
        let name;
        switch (value) {
        case 0:
            name = 'Novice';
            break;
        case 1:
            name = 'Practitioner';
            break;
        case 2:
            name = 'Expert';
            break;
        case 3:
            name = 'Innovator';
            break;
        default:
            name = value;
        }
        return name;
    }
}
