import { trigger, transition, style, animate } from '@angular/animations';

export const topRightSlide = trigger('topRightSlide', [
    transition(':enter', [
        style({
            transform: 'translateY(-200px) scale(0.5)',
            transformOrigin: 'right'
        }),
        animate('0.2s ease-in-out', style({
            transform: 'translateY(0) scale(1)',
            transformOrigin: 'right'
        }))
    ]),
    transition(':leave', [
        style({
            transform: 'translateY(0) scale(1)',
            transformOrigin: 'right'
        }),
        animate('0.2s ease-in-out', style({
            transform: 'translateY(-200px) scale(0.5)',
            transformOrigin: 'right'
        }))
    ])
]);
