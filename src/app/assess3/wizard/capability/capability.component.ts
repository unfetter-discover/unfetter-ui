import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'unf-assess3-wizard-capability',
  templateUrl: './capability.component.html',
  styleUrls: ['./capability.component.scss']
})
export class CapabilityComponent implements OnInit {

  public dummyCapabilityName: string = 'Capability Name (VPN)';
  public attackMatrix: string = 'Att&ck Matrix';
  public noAttackPatterns: string = 'You have no Attack Patterns yet';
  public addAttackPatterns: string = 'Add a Kill Chain Phase and Attack Patterns and they will show up here';
  public openAttackMatrix: string = 'Open Att&ck Matrix';

  constructor() { }

  ngOnInit() {
  }

}
