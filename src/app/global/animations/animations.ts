import { trigger, state, stagger, style, transition, keyframes, animate, query, animateChild } from '@angular/animations';

export const simpleFadeIn = trigger('simpleFadeIn', [
    transition('* => *', [
        style({ opacity: 0 }),
        animate(400, style({ opacity: 1 }))
    ])
]);

export const parentFadeIn = trigger('parentFadeIn', [
    transition('* => *', [
        query('.staggerIn',
            [
                style({ opacity: 0 }),
                animate(500, style({ opacity: 1 }))
            ],
            { optional: true }),
        query('@slideInOutAnimation', [
            stagger('300ms', [
                animateChild()
            ])
        ], { optional: true })
    ])
]);

export const slideInOutAnimation =
    trigger('slideInOutAnimation', [
        transition(':enter', [
            style({
                transform: 'translateX(-400%)'
            }),
            animate('.5s ease-in-out',
                style({
                    transform: 'translateX(0)',
                    position: 'relative'
                })),
        ]),
        transition(':leave', [
            animate('.5s ease-in-out',
                style({
                    transform: 'translateX(-400%)',
                })
            )
        ])
    ]);

export const inOutAnimation =
    trigger('inOutAnimation', [
        transition(':enter', [
            style({
                transform: 'translateX(-400%)',
                opacity: 0,
            }),
            animate('.3s ease-in-out',
                style({
                    transform: 'translateX(0)',
                    opacity: 1,
                })),
        ]),
        transition(':leave', [
            animate('.1s ease-in-out',
                style({
                    transform: 'translateX(-400%)',
                    opacity: 0,
                })
            )
        ])
    ]);
