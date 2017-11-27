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
    public addConfig: boolean = false;
    public newConfig: any = {};
    public addNewMessage: string = '';

    constructor(private adminService: AdminService) { }

    public ngOnInit() {
        this.fetchConfig();
    }

    private createConfigObject(): void {
        this.addConfig = true;
        this.addNewMessage = '';
        this.newConfig['configKey'] = '';
        this.newConfig['configValue'] = '';
        this.resetMessages();
    }

    private resetMessages(): void {
        for (let j in this.message) {
            this.message[j] = '';
        }
    }

    private addNewObject(): void {
        this.resetMessages();
        try {
            this.newConfig.configValue = JSON.parse(this.newConfig.configValue);
            let configData$ = this.adminService
                .addConfig({ data: { attributes: this.newConfig }})
                .subscribe(
                (res) => {
                    this.addConfig = false;
                    this.addNewMessage = `${res.attributes.configKey} has been added.`;
                    this.fetchConfig();
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    configData$.unsubscribe();
                }
                );
        } catch (e) {
            this.addNewMessage = e;
        }
    }

    private cancelObjectAdd(): void {
        this.addConfig = false;
        this.newConfig['configKey'] = '';
        this.newConfig['configValue'] = '';
    }

    private deleteSingleConfig(id, i): void {
        this.resetMessages();
        let configData$ = this.adminService.deleteSingleConfig(id)
            .subscribe(
            (res) => {
                this.addNewMessage = '';
                if (i !== 0) {
                    this.message[i - 1] = `Successfully deleted ${this.configData[i].attributes.configKey}.`;
                } else {
                    this.message[0] = `Successfully deleted ${this.configData[i].attributes.configKey}.`;
                }
                this.fetchConfig();
            },
            (err) => {
                console.log(err);
                this.addNewMessage = '';
                this.message[i] = `Unable to delete ${this.configData[i].attributes.configKey}.`;
            },
            () => {
                configData$.unsubscribe();
            }
            );
    }

    private changeData(configData, i): void {
        this.resetMessages();
        let currDataConfig = Object.assign({}, configData);
        try {
            currDataConfig.attributes.configValue = JSON.parse(currDataConfig.attributes.configValue);
            let processChangedData$ = this.adminService
                .processChangedData({ data: currDataConfig }, currDataConfig.attributes.id)
                .subscribe(
                (res) => {
                    console.log(res);
                    this.addNewMessage = '';
                    this.message[i] = `${res.attributes.configKey} has been saved.`;
                    this.fetchSingleConfig(this.configData[i].attributes.id, i, true);
                },
                (err) => {
                    this.addNewMessage = '';
                    this.message[i] = err;
                    console.log(err);
                },
                () => {
                    processChangedData$.unsubscribe();
                }
                );
        } catch (e) {
            this.addNewMessage = '';
            this.message[i] = e;
        }
    }

    private fetchSingleConfig(id, i, refresh) {
        let configData$ = this.adminService.getSingleConfig(id)
          .subscribe(
          (res) => {
              if (res) {
                  this.configData[i].attributes.configValue = JSON.stringify(res.attributes.configValue, null, 2);
                  if (!refresh) {
                      this.resetMessages();
                      this.addNewMessage = '';
                      this.message[i] = `${res.attributes.configKey} edits have been undone.`
                  }
              }
          },
          (err) => {
              this.resetMessages();
              this.addNewMessage = '';
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
                if (res && res.length) {
                    this.configData = res.reverse();
                    for (let i = 0; i < this.configData.length; ++i) {
                        this.configData[i].attributes.configValue = JSON.stringify(this.configData[i].attributes.configValue, null, 2);
                        if (this.message.length < i) {
                            this.message.push('');
                        }
                    }
                } else {
                    this.configData = [];
                }
            },
            (err) => {
            },
            () => {
                configData$.unsubscribe();
            }
            );
    }
}
