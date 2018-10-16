import { Component, Input } from '@angular/core';

@Component({
    selector: 'sidepanel-nav-control',
    template: `
        <div id="SidepanelNavControlComponent">
            <button mat-icon-button>
                <mat-icon class="mat-24">{{ icon }}</mat-icon>
            </button>
        </div>
    `
})
export class SidepanelNavControlComponent {
    @Input()
    public icon = 'keyboard_arrow_left';
}
