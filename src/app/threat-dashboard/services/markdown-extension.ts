/**
 * @description enum of all know extension types
 */
export enum MarkdownExtensionEnum {
    'Intrusions',
    'Malware'
}

/**
 * @description a single registrated markdown extension type
 */
export class MarkdownExtensionType {
    constructor(
        public extensionType: MarkdownExtensionEnum,
        public extensionTrigger: string
    ) {

    }
}

/**
 * @description registry to keep track of markdown extensions
 */
export class MarkdownExtensionRegistry {
    constructor() { }

    /**
     * @description list all know registration types
     * @returns MarkdownExtensionType
     */
    public static listRegisteredExtensionTypes(): MarkdownExtensionType[] {
        const registeredTypes: MarkdownExtensionType[] = [];
        const intrusions = new MarkdownExtensionType(MarkdownExtensionEnum.Intrusions, '@intrusion');
        const malwares = new MarkdownExtensionType(MarkdownExtensionEnum.Malware, '@malware');
        return registeredTypes.concat(intrusions, malwares);
    }
} 

/**
 * @description a parsed found instance of a markdown extension
 */
export class MarkdownExtension {
    constructor(
        public extensionType: MarkdownExtensionType,
        public extensionValue: string
    ) {

    }
}
