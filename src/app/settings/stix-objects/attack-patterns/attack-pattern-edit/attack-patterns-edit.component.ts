import { Component, OnInit, ViewEncapsulation, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AttackPatternComponent } from '../attack-pattern/attack-pattern.component';
import { StixService } from '../../../stix.service';
import { AttackPattern, ExternalReference, KillChainPhase } from '../../../../models';
import { MarkdownEditorComponent } from '../../../../global/components/markdown-editor/markdown-editor.component';

@Component({
    selector: 'attack-pattern-edit',
    templateUrl: './attack-pattern-edit.component.html'
})

export class AttackPatternEditComponent extends AttackPatternComponent implements OnInit {

    @ViewChild('markdownEditor') markdownEditor: MarkdownEditorComponent;

    constructor(
        public stixService: StixService,
        public route: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
        public location: Location,
        public snackBar: MatSnackBar) {

        super(stixService, route, router, dialog, location, snackBar);
    }

    public ngOnInit() {
       super.loadAttackPattern();
    }

    public addkillChainPhase(): void {
        // let id = this.attackPattern.kill_chain_phases.length + 1;
        let killChainPhase = new KillChainPhase();
        killChainPhase.kill_chain_name = '';
        killChainPhase.phase_name = '';
        this.attackPattern.attributes.kill_chain_phases.unshift(killChainPhase);
    }

    public removekillChainPhase(killChainPhase: KillChainPhase): void {
         this.attackPattern.attributes.kill_chain_phases = this.attackPattern.attributes.kill_chain_phases.filter((h) => h !== killChainPhase);
    }

    public saveAttackPattern(): void {
        let sub = super.saveButtonClicked().subscribe(
            (data) => {
                this.saveCourseOfAction(data.id);
                this.location.back();
            }, (error) => {
                // handle errors here
                 console.log('error ' + error);
            }, () => {
                // prevent memory links
                if (sub) {
                    sub.unsubscribe();
                }
            }
        );
    }
}
