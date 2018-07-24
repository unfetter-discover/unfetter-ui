
import { Injectable } from '@angular/core';
import { MarkdownExtension, MarkdownExtensionRegistry } from './markdown-extension';

@Injectable({
  providedIn: 'root',
})
export class ReportMarkdownParserService {
  constructor(
  ) { }

  /**
   * @description expand markdown and parse for extensions
   * @returns MarkdownExtension[]
   */
  public parseForExtensions(markdown: string): MarkdownExtension[] {
    const registratedExtensions = MarkdownExtensionRegistry.listRegisteredExtensionTypes();
    const extensionsFound = [];
    if (!registratedExtensions || registratedExtensions.length < 1) {
      return extensionsFound;
    }

    const triggerLookup = registratedExtensions
      .reduce((memo, cur) => {
        memo[cur.extensionTrigger] = cur;
        return memo;
      }, {});
    const triggers = Object.keys(triggerLookup);
    // attempts
    //  const pattern = `(${triggers.join('|')}):\"?(\\b+[^\"])\"?\\s?`;
    //  var r = new RegExp('\s?(@intrusion|@malware):\"?(.*[^\"])\"?\s?', 'igm');
    // works kinda
    //  const pattern = `(${triggers.join('|')}):"?(\\w+\\s+[^\"\\n@])"?\s?`;
    const pattern = `(${triggers.join('|')}):(("+.*"+)|(\\w*))\s?`;
    const regex = new RegExp(pattern, 'igm');
    // console.log(regex);
    // look across all line in the markdown for all triggers
    let match;
    while (match = regex.exec(markdown)) {
      const str = match[0];
      const trigger = match[1];
      let val = match[2];
      if (val.startsWith('"')) {
        val = val.substring(1, val.length - 1);
      }
      if (val.endsWith('"')) {
        val = val.substring(0, val.length - 2);
      }
      const extensionType = triggerLookup[trigger];
      const extension = new MarkdownExtension(extensionType, val);
      extensionsFound.push(extension);
    }
    return extensionsFound;
  }

  /**
   * @description parse for all the extensions and return the last on in the list
   * @param  {string} markdown
   * @returns MarkdownExtension - last one parsed or undefined if none are found
   */
  public parseForLastExtension(markdown: string): MarkdownExtension {
    const extensions = this.parseForExtensions(markdown);
    return (extensions && extensions.length > 0) ? extensions[extensions.length - 1] : undefined;
  }
}
