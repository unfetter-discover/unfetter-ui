import { Component, Input } from '@angular/core';

@Component({
    selector: 'sidepanel-custom-content',
    template: `
        <div id="SidepanelCustomContentComponent">
            <ng-content></ng-content>
        </div>
    `
})
export class SidepanelCustomContentComponent { }
