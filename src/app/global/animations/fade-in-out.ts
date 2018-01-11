import { trigger, state, stagger, style, transition, animate } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate('0.1s ease-in-out', style({
            opacity: 1
        }))
    ]),
    transition(':leave', [
        style({
            opacity: 1
        }),
        animate('0.1s ease-in-out', style({
            opacity: 0
        }))
    ])
]);
