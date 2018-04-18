import { FormControl } from '@angular/forms';
import { AttackPattern } from 'stix/dist/unfetter/attack-pattern';

export class Framework {
    public constructor(
        public framework = 'n/a',
        public attackPatterns: AttackPattern[] = [],
        public formControl: FormControl = new FormControl()) { }
}
