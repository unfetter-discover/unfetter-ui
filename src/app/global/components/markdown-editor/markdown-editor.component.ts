import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { finalize, distinctUntilChanged } from 'rxjs/operators';

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
     * @description Pass in a FormControl for reactive support, otherwise wrap the value in a FormControl
     */
    @Input() formCtrl: FormControl = new FormControl();

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
     * If a value is passed in, use the valueChanges observables to drive the event emitter
     */
    public ngOnInit() {
        if (this.value !== null) {
            const formChange$ = this.formCtrl.valueChanges
                .pipe(
                    distinctUntilChanged<string>(),
                    finalize(() => formChange$ && formChange$.unsubscribe())
                )
                .subscribe(
                    (text) => {
                        this.changed.emit(text);
                    },
                    (err) => {
                        console.log(err);
                    }
                );
        }
    }

    /**
     * @description Return the form control value
     */
    @Input() get value() {
        return this.formCtrl.value;
    }

    /**
     * @description Set the form control value to the input value
     */
    set value(value) {
        this.formCtrl.patchValue(value);
    }
}
