import { ThreatBetaModule } from './threat-beta.module';

describe('ThreatBetaModule', () => {
  let threatBetaModule: ThreatBetaModule;

  beforeEach(() => {
    threatBetaModule = new ThreatBetaModule();
  });

  it('should create an instance', () => {
    expect(threatBetaModule).toBeTruthy();
  });
});
