import { ExternalDataTranslationRequest } from './external-data-translation-request';
import { WrappedStix } from './wrapped-stix';

/**
 * @description response to hold a translation of external system data to Stix
 */
export class ExternalDataTranslationResponse {
    public request = new ExternalDataTranslationRequest();
    public translated: { success: boolean, payload: WrappedStix } =
        {
            success: false,
            payload: new WrappedStix(),
        };
}
