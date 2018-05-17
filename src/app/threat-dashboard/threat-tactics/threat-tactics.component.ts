import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Tactic } from '../../global/components/tactics-pane/tactics.model';
import { ThreatReport } from '../models/threat-report.model';
import { AttackPattern } from '../../models';

@Component({
    selector: 'threat-tactics',
    templateUrl: './threat-tactics.component.html',
    styleUrls: ['./threat-tactics.component.scss']
})
export class ThreatTacticsComponent implements OnInit, OnChanges {

    /**
     * @description 
     */
    @Input() public attackPatterns: AttackPattern[] = [];

    /**
     * @description 
     */
    public tactics: Tactic[] = [];

    constructor(
    ) {
    }

    /**
     * @description 
     */
    ngOnInit() {
    }

    /**
     * @description 
     */
    ngOnChanges() {
        if (this.attackPatterns) {
            this.tactics = this.attackPatterns
                .filter((attackPattern: any) => attackPattern.isSelected)
                .map((attackPattern: any) => ({
                    ...attackPattern.attributes,
                    id: attackPattern.id,
                    name: attackPattern.name,
                    adds: {
                        highlights: [
                            {
                                value: 2,
                                color: {
                                    style: 'true',
                                    bg: attackPattern.backgroundColor,
                                    fg: attackPattern.foregroundColor,
                                },
                            },
                        ],
                    },
                }));
        }
    }

}
