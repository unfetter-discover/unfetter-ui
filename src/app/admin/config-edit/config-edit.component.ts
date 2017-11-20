import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
    selector: 'config-edit',
    templateUrl: 'config-edit.component.html',
    styleUrls: ['config-edit.component.scss']
})
export class ConfigEditComponent implements OnInit {

    public configData: any[] = [];
    public message: string[] = [];

    constructor(private adminService: AdminService) { }

    public ngOnInit() {
        this.fetchConfig();
    }

    public changeData(configData, i): void {
        var currDataConfig = Object.assign({}, configData);
        try {
            currDataConfig.attributes.configValue = JSON.parse(currDataConfig.attributes.configValue);
            let processChangedData$ = this.adminService
                .processChangedData({ data: currDataConfig }, currDataConfig.attributes.id)
                .subscribe(
                (res) => {
                    console.log(res);
                    for (let j in this.message) {
                        this.message[j] = '';
                    }
                    this.message[i] = `${res.attributes.configKey} has been saved.`;
                    this.fetchSingleConfig(this.configData[i].attributes.id, i);
                },
                (err) => {
                    this.message = err;
                    console.log(err);
                },
                () => {
                    processChangedData$.unsubscribe();
                }
                );
        }
        catch(e) {
            for (let j in this.message) {
                this.message[j] = '';
            }
            this.message[i] = e;
        }


    }

    private fetchSingleConfig(id, i) {
        console.log(id);
        let configData$ = this.adminService.getSingleConfig(id)
          .subscribe(
          (res) => {
              console.log(res);
              if (res) {
                  this.configData[i].attributes.configValue = JSON.stringify(res.attributes.configValue, null, 2);
                  this.message[i] = `${res.attributes.configKey} edits have been removed.`
              }
          },
          (err) => {
              console.log(err);
              this.message[i] = `Unable to undo edits to ${this.configData[i].attributes.configKey}.`
          },
          () => {
              configData$.unsubscribe();
          }
          );
    }

    private fetchConfig() {
        let configData$ = this.adminService.getConfig()
            .subscribe(
            (res) => {
                console.log(res);
                if (res && res.length) {
                    this.configData = res;
                    for (let i = 0; i < this.configData.length; ++i) {
                        this.configData[i].attributes.configValue = JSON.stringify(this.configData[i].attributes.configValue, null, 2);
                        if(this.message.length < i) {
                            this.message.push('');
                        }
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
