import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AttackPattern } from '../../../models';
import { AttackPatternsService } from '../../../services';

@Component({
  selector: 'attack-patterns',
  styleUrls: ['./attack-patterns.component.css'],
  templateUrl: './attack-patterns.component.html'
})

export class AttackPatternsComponent implements OnInit {

    public attackPatterns: AttackPattern[];
    private selectedAttackPattern: AttackPattern;

    constructor(private attackPatternsService: AttackPatternsService) {
        console.log('Initial AttackPatternsComponent');
    }

    public ngOnInit() {
       this.loadAttachPatterns();
    }

    public onSelect(attackPattern: AttackPattern): void {
        this.selectedAttackPattern = attackPattern;
    }

    public delete(attackPattern: AttackPattern): void {
        let subscription = this.attackPatternsService.delete(attackPattern.id).subscribe(
            () => {
                this.attackPatterns = this.attackPatterns.filter((h) => h !== attackPattern);
                if (this.selectedAttackPattern === attackPattern) { this.selectedAttackPattern = null; }
            }, (error) => {
                // handle errors here
            }, () => {
                // prevent memory links
                subscription.unsubscribe();
            }
        );
    }

    public download(): void {
        alert('download clicked');
    }

    private loadAttachPatterns(): void {
         let subscription = this.attackPatternsService.getAttackPatterns().subscribe(
            (attackPatterns) => {
                this.attackPatterns = attackPatterns;
                console.log('this.attackPatterns ' + attackPatterns);
            }, (error) => {
                // handle errors here
                 console.log('error ' + error);
            }, () => {
                // prevent memory links
                // subscription.unsubscribe();
            }
        );
    }
}
