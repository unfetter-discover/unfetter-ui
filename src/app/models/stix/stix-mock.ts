import { GranularMarking } from './granular-marking';
import { Mock } from '../mock';
import { Stix } from './stix';

/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 */
export class StixMock extends Mock<Stix> {

    public mockOne(): Stix {
        const stix = new Stix();
        const number = this.genNumber();
        stix.id = `stix-${number}`;
        stix.name = `name-${number}`;
        stix.description = `description-${number}`;
        stix.object_refs = ['1', '2'];
        stix.modified = new Date().toISOString();
        stix.name = 'name-${number}';
        stix.granular_markings = [ new GranularMarking() ];
        return stix;
    }

    public mockMany(num = 1): Stix[] {
        const arr = Array(num);
        for (let idx = 0; idx < num; idx++) {
            arr[idx] = this.mockOne();
        }
        return arr;
    }
}

// cannot make methods abstract and static, so use a factory
export const StixMockFactory = new StixMock();
