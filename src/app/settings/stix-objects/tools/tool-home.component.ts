
import { Component, OnInit } from '@angular/core';
import { Constance } from '../../../utils/constance';

@Component({
  selector: 'tool-home',
  template: `<page-header [pageTitle]='pageTitle'  [pageIcon]='pageIcon' [description]="description"></page-header>`,
})
export class ToolHomeComponent {

    public pageTitle = 'Tools';
    public pageIcon = Constance.TOOL_ICON;
    public description = 'Tools are legitimate software that can be used by threat actors to ' +
    'perform attacks. Knowing how and when threat actors use such tools can be important for ' +
    'understanding how campaigns are executed. Unlike malware, these tools or software packages ' +
    'are often found on a system and have legitimate purposes for power users, system administrators, ' +
    'network administrators, or even normal users. Remote access tools (e.g., RDP) and network scanning ' +
    'tools (e.g., Nmap) are examples of Tools that may be used by a Threat Actor during an attack.';
}
