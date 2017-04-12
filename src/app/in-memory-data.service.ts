import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  public createDb() {
    let attackPatterns = [
      {id: 11, name: 'collection'},
      {id: 12, name: 'unspecified'},
      {id: 13, name: 'exfiltration'},
      {id: 14, name: 'defense-evasion'},
      {id: 15, name: 'redential-access'},
      {id: 16, name: 'discovery'},
      {id: 17, name: 'command-and-control'},
      {id: 18, name: 'persistence'},
      {id: 19, name: 'lateral-movement'},
      {id: 20, name: 'privilege-escalation'}
    ];
    return {attackPatterns};
  }
}
