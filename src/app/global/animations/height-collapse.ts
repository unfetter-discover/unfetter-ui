import { trigger, transition, style, animate } from '@angular/animations';

export const heightCollapse = trigger('heightCollapse', [
    transition(':enter', [
        style({
            opacity: 0,
            height: 0,
            overflow: 'hidden'
        }),
        animate('0.2s ease-in-out', style({
            opacity: 1,
            height: '*'
        }))
    ]),
    transition(':leave', [
        style({
            opacity: 1,
            height: '*',
            overflow: 'hidden'
        }),
        animate('0.2s ease-in-out', style({
            opacity: 0,
            height: 0
        }))
    ])
]);
