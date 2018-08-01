import { MarkingDefinition } from 'stix';

export default class MarkingDefinitionHelpers {

    // TODO remove `| any` once Marking Definition is updated
    public static getMarkingLabel(marking: MarkingDefinition | any): string {
        if (marking && marking.definition_type) {
            switch (marking.definition_type) {
                case 'statement': {
                    return marking.definition.statement;
                }
                case 'tlp': {
                    return `TLP: ${marking.definition.tlp}`;
                }
                case 'rating': {
                    return `Rating: (${marking.definition.rating}) ${marking.definition.label}`;
                }
                case 'capco': {
                    return `${marking.definition.category}: ${marking.definition.text}`
                }
            }
        }
        return 'unknown marking';
    }
}
