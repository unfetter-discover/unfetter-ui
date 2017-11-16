import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
    selector: 'config-edit',
    templateUrl: 'config-edit.component.html',
    styleUrls: ['config-edit.component.scss']
})
export class ConfigEditComponent implements OnInit {

    public configData: any[] = [];
    public message: string;

    constructor(private adminService: AdminService) { }

    public ngOnInit() {
        this.fetchConfig();
    }

    private fetchConfig() {
        let configData$ = this.adminService.getConfig()
            .subscribe(
            (res) => {
                console.log(res);
                if (res && res.length) {
                    for (let currRes of res) {
                        let currData = {};
                        currData['configKey'] = currRes.attributes.configKey;
                        currData['configValue'] = currRes.attributes.configValue;
                        this.configData.push(currData);
                    }
                } else {
                    this.configData = [];
                }
                console.log(this.configData);
            },
            (err) => {
                console.log(err);
            },
            () => {
                configData$.unsubscribe();
            }
            );
    }
}
