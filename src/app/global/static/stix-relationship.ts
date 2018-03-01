import { generateUUID } from './generate-uuid';
import { StixRelationshipTypes } from '../enums/stix-relationship-types.enum';

export function generateStixRelationship(source_ref: string, target_ref: string, relationship_type: StixRelationshipTypes | string) {
    return {
        type: 'relationship',
        id: `relationship--${generateUUID()}`,
        relationship_type,
        source_ref,
        target_ref,
        created: new Date().toISOString(),
        modified: new Date().toISOString()
    }
}
