import { Component, OnInit, Input } from '@angular/core';

/**
 * 
 */
@Component({
    selector: 'markdown-editor',
    templateUrl: './markdown-editor.component.html',
    styleUrls: ['./markdown-editor.component.scss']
})
export class MarkdownEditorComponent implements OnInit {

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
    @Input() inputLabel: string = null;

    /**
     * 
     */
    @Input() previewLabel: string = 'Preview';

    /**
     * 
     */
    @Input() data: string = null;

    /**
     * 
     */
    constructor(
    ) {
    }

    /**
     * 
     */
    ngOnInit() {
    }

}
