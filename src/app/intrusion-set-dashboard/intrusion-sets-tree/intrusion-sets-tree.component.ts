import { Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';

@Component({
    selector: 'intrusion-sets-tree',
    templateUrl: './intrusion-sets-tree.component.html',
    styleUrls: ['./intrusion-sets-tree.component.scss']
})
export class IntrusionSetsTreeComponent implements OnInit {

    @Input() public treeData: any;

    @Output() private onRender = new EventEmitter<any>();

    constructor(
        private ref: ChangeDetectorRef,
    ) { }

    ngOnInit() {
    }

    public treeComplete() {
        this.ref.detectChanges();
        this.onRender.emit();
    }

}
