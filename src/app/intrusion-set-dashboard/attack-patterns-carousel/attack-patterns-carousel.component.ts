import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'attack-patterns-carousel',
    templateUrl: './attack-patterns-carousel.component.html',
    styleUrls: ['./attack-patterns-carousel.component.scss']
})
export class AttackPatternsCarouselComponent implements OnInit {

    @Input() public killChainPhases: any[];

    constructor() { }

    ngOnInit() {
    }

    public count(attack_patterns: any): number {
        let count = 0;
        attack_patterns.forEach((attack_pattern) => {
            if (attack_pattern.back && (attack_pattern.back !== '#FFFFFF')) {
                count++;
            }
        });
        return count;
    }

}
