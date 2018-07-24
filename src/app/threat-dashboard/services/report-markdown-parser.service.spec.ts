import { inject, TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs/Subscription';
import { MarkdownExtensionEnum, MarkdownExtensionRegistry } from './markdown-extension';
import { ReportMarkdownParserService } from './report-markdown-parser.service';

describe('Report Markdown Parser Spec', () => {

  let subscriptions: Subscription[];
  let markdownWithHits;
  let markdownWithOutHits;
  beforeEach(() => {
    subscriptions = [];
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [ReportMarkdownParserService]
    });

    markdownWithHits = `
    ## Test markdown
    __stuff__
    @intrusion:APT1
    @intrusion:APT16 @intrusion:Suckfly
    @intrusion:"Deep Panda"
    @malware:Darkmoon
    @malware:"Hacking Team UEFI Rootkit"
    @malware:Duqu @malware:gh0st
    `
    markdownWithOutHits = `
    ## Test markdown
    __stuff__
    1. no extensions here please
    `
  });

  afterEach(() => {
    if (subscriptions) {
      subscriptions.forEach((sub) => sub.unsubscribe());
    }
  });

  it('should be created', inject([ReportMarkdownParserService], (service) => {
    expect(service).toBeTruthy();
  }));

  it('should parse for extensions, and find many', inject([ReportMarkdownParserService], (service: ReportMarkdownParserService) => {
    expect(service).toBeTruthy();
    const extensionsFound = service.parseForExtensions(markdownWithHits);
    console.log(extensionsFound);
    expect(extensionsFound).toBeDefined();
    expect(extensionsFound.length).toEqual(8);

    const intrusionsReferences = extensionsFound.filter((extension) => extension.extensionType.extensionType === MarkdownExtensionEnum.Intrusions);
    const malwareReferences = extensionsFound.filter((extension) => extension.extensionType.extensionType === MarkdownExtensionEnum.Malware);
    const expectedIntrusions = ['APT1', 'APT16', 'Suckfly', 'Deep Panda'];
    const expectedMalwares = ['Darkmoon', 'Hacking Team UEFI Rootkit', 'Duqu', 'gh0st'];
    expect(intrusionsReferences).toBeDefined();
    expect(intrusionsReferences.length).toEqual(expectedIntrusions.length);
    expect(malwareReferences).toBeDefined();
    expect(malwareReferences.length).toEqual(expectedMalwares.length);
    intrusionsReferences.forEach((ref) => {
      expect(expectedIntrusions).toContain(ref.extensionValue);
    });
    malwareReferences.forEach((ref) => {
      expect(expectedMalwares).toContain(ref.extensionValue);
    });
  }));

  it('should parse for the last extension amoung many', inject([ReportMarkdownParserService], (service: ReportMarkdownParserService) => {
    expect(service).toBeTruthy();
    const lastExtension = service.parseForLastExtension(markdownWithHits);
    expect(lastExtension).toBeDefined();
    expect(lastExtension.extensionType).toBeDefined();
    expect(lastExtension.extensionType.extensionType).toEqual(MarkdownExtensionEnum.Malware);
    expect(lastExtension.extensionValue).toBeDefined();
    expect(lastExtension.extensionValue).toEqual('gh0st');
  }));

  it('should parse for extensions, and find none', inject([ReportMarkdownParserService], (service: ReportMarkdownParserService) => {
    expect(service).toBeTruthy();
    const extensionsFound = service.parseForExtensions(markdownWithOutHits);
    expect(extensionsFound).toBeDefined();
    expect(extensionsFound.length).toEqual(0);
  }));

  it('should parse for extensions when none are registered', inject([ReportMarkdownParserService], (service: ReportMarkdownParserService) => {
    spyOn(MarkdownExtensionRegistry, 'listRegisteredExtensionTypes').and.returnValue([]);
    expect(service).toBeTruthy();
    const extensionsFound = service.parseForExtensions(markdownWithHits);
    expect(extensionsFound).toBeDefined();
    expect(extensionsFound.length).toEqual(0);
  }));
});
