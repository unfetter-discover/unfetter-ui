import { Component, OnInit, ChangeDetectorRef, Input, DoCheck } from '@angular/core';

@Component({
    selector: 'critical-security-controls',
    templateUrl: './critical-security-controls.component.html',
    styleUrls: ['./critical-security-controls.component.scss']
})
export class CriticalSecurityControlsComponent implements OnInit, DoCheck {

    @Input() public treeData: any;
    private previousTreeData: any;

    constructor(
        private ref: ChangeDetectorRef,
    ) { }

    ngOnInit() {
    }

    ngDoCheck () {
        this.ref.markForCheck();
        if (this.treeData !== this.previousTreeData) {
            this.previousTreeData = this.treeData;
            console.log(new Date().toISOString(), 'modified data tree for CSC', this.treeData);
        }
    }

    public getCriticalSecurityControls(data: any): any {
        const cscObject = {};
        const children = data.children ? data.children : data._children;
        if (children) {
            children.forEach((child) => {
                const c = child._children ? child._children : child.children;
                c.forEach((attack_pattern) => {
                    const courseOfActionChildren =
                            attack_pattern._children ? attack_pattern._children : attack_pattern.children;
                    if (courseOfActionChildren) {
                        courseOfActionChildren.forEach((courseOfAction) => {
                            if (!cscObject[courseOfAction.name]) {
                                cscObject[courseOfAction.name] = {
                                    attackPatterns: [],
                                    name: courseOfAction.name,
                                    description: courseOfAction.description
                                };
                            }
                            cscObject[courseOfAction.name].attackPatterns.push(attack_pattern.name);
                        });
                    }
                });
            });
        }

        const cscList = Object.keys(cscObject).reduce((list, key) => (list.push(cscObject[key]), list), []);
        return cscList;
    }

}
