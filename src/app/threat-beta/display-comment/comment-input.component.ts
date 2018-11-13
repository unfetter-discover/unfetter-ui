import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'comment-input',
    templateUrl: './comment-input.component.html',
    styleUrls: ['./comment-input.component.scss']
})
export class CommentInputComponent implements OnInit {

    public text: string = '';

    @Output() cancel: EventEmitter<void> = new EventEmitter();

    @Output() submit: EventEmitter<string> = new EventEmitter();

    constructor(
    ) {
    }

    ngOnInit() {
    }

    onCancel() {
        this.cancel.emit();
    }

    onSubmit() {
        this.submit.emit(this.text);
    }

}
