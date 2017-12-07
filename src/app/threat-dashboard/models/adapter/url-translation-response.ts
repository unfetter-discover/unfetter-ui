import { UrlTranslationRequest } from './url-translation-request';

/**
 * @description response for a url translation
 */
export class UrlTranslationResponse {
    public request: UrlTranslationRequest = new UrlTranslationRequest();
    public translated: { success: boolean, url: string } = {
        success: false,
        url: '',
    };
}
