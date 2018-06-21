import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

/**
 * 
 */
@Component({
    selector: 'markdown-editor',
    templateUrl: './markdown-editor.component.html',
    styleUrls: ['./markdown-editor.component.scss']
})
export class MarkdownEditorComponent {

    /**
     * 
     */
    @Input() editing: boolean = true;

    /**
     * 
     */
    @Input() viewing: boolean = true;

    /**
     * 
     */
    @Input() truncate: boolean = false;

    /**
     * 
     */
    @Input() flushed: boolean = false;

    /**
     * 
     */
    @Input() inputLabel: string = null;

    /**
     * 
     */
    @Input() previewLabel: string = 'Preview';

    /**
     * 
     */
    private text: string = '';

    /**
     * 
     */
    @Output() changed: EventEmitter<string> = new EventEmitter();

    /**
     * 
     */
    constructor(
    ) {
    }

    /**
     * 
     */
    @Input() get value() {
        return this.text;
    }

    /**
     * 
     */
    set value(value) {
        this.text = value;
        this.changed.emit(this.text);
    }

}
